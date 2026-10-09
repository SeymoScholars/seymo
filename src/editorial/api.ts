import type { ArticleContent, ArticleRecord } from './model';

async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(path, { ...init, credentials: 'same-origin' });
  const data = await response.json().catch(() => null);
  if (!response.ok) throw new Error(data?.error || 'The article service is unavailable. Please retry.');
  if (!data) throw new Error('The article service returned an invalid response.');
  return data;
}
export const listArticles = (admin = false) => api<ArticleRecord[]>(admin ? '/api/admin/articles' : '/api/articles');
export async function getArticle(slug: string): Promise<ArticleRecord | null> {
  const response = await fetch(`/api/articles/${encodeURIComponent(slug)}`, { cache: 'no-store' });
  if (response.status === 404) return null;
  if (!response.ok) throw new Error('The article service is unavailable. Please retry.');
  return response.json();
}
export const saveArticle = (document: ArticleContent, status: ArticleRecord['status'], record?: ArticleRecord | null) => api<ArticleRecord>(record ? `/api/admin/articles/${record.id}` : '/api/admin/articles', {
  method: record ? 'PUT' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ document, status, revision: record?.revision }),
});
export async function uploadImage(file: File): Promise<string> {
  if (file.size > 4_000_000) throw new Error('Choose an image smaller than 4 MB.');
  const result = await api<{ url: string }>('/api/article-images', { method: 'POST', headers: { 'Content-Type': file.type }, body: file });
  return result.url;
}
