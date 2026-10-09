import type { Config, Context } from '@netlify/functions';
import { getStore } from '@netlify/blobs';
import { authorize } from './lib/authorization';

export default async (request: Request, context: Context) => {
  try {
    const store = getStore({ name: 'editorial-images', consistency: 'strong' });
    if (request.method === 'GET' && context.params.key) {
      if (!/^[a-f0-9-]{36}$/.test(context.params.key)) return new Response('Not found', { status: 404 });
      const result = await store.getWithMetadata(context.params.key, { type: 'arrayBuffer' });
      if (!result) return new Response('Not found', { status: 404 });
      return new Response(result.data, { headers: { 'Content-Type': String(result.metadata.contentType), 'Cache-Control': 'public, max-age=31536000, immutable', 'X-Content-Type-Options': 'nosniff' } });
    }
    if (request.method !== 'POST' || context.params.key) return new Response('Method not allowed', { status: 405 });
    const denied = await authorize(request);
    if (denied) return denied;
    const bytes = new Uint8Array(await request.arrayBuffer());
    if (!bytes.length || bytes.length > 4_000_000) return Response.json({ error: 'Upload an image smaller than 4 MB.' }, { status: 413 });
    let contentType = '';
    if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) contentType = 'image/jpeg';
    if (bytes.slice(0, 8).join(',') === '137,80,78,71,13,10,26,10') contentType = 'image/png';
    if (String.fromCharCode(...bytes.slice(0, 4)) === 'RIFF' && String.fromCharCode(...bytes.slice(8, 12)) === 'WEBP') contentType = 'image/webp';
    if (!contentType) return Response.json({ error: 'Only PNG, JPEG and WebP images are accepted.' }, { status: 415 });
    const key = crypto.randomUUID();
    await store.set(key, bytes.buffer, { metadata: { contentType } });
    return Response.json({ url: `/api/article-images/${key}` }, { status: 201, headers: { 'Cache-Control': 'no-store' } });
  } catch {
    return Response.json({ error: 'Image storage is unavailable. Please retry.' }, { status: 503 });
  }
};

export const config: Config = { path: ['/api/article-images', '/api/article-images/:key'] };
