import { getUser, verifyRequestOrigin } from '@netlify/identity';

export async function authorize(request: Request): Promise<Response | null> {
  if (!['GET', 'HEAD'].includes(request.method)) {
    try { verifyRequestOrigin(request); }
    catch { return Response.json({ error: 'Cross-origin request refused.' }, { status: 403 }); }
  }
  const user = await getUser();
  if (!user) return Response.json({ error: 'Please sign in to manage articles.' }, { status: 401 });
  const authorization = user.appMetadata?.authorization as { roles?: string[] } | undefined;
  if (!user.roles?.includes('admin') && !authorization?.roles?.includes('admin')) {
    return Response.json({ error: 'An administrator role is required.' }, { status: 403 });
  }
  return null;
}
