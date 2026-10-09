import type { BlogPost } from './blogService';

export interface AdminArticle extends BlogPost {
  status: 'draft' | 'published';
}

export class AdminRequestError extends Error {
  constructor(message: string, public status: number) {
    super(message);
  }
}

export async function adminRequest(method = 'GET', article?: AdminArticle): Promise<{ articles?: AdminArticle[] }> {
  let response: Response;
  try {
    response = await fetch('/.netlify/functions/articles?scope=admin', {
      method,
      credentials: 'same-origin',
      headers: article ? { 'Content-Type': 'application/json' } : undefined,
      body: article ? JSON.stringify(article) : undefined,
      signal: AbortSignal.timeout(20000),
    });
  } catch {
    throw new AdminRequestError('The administrator API could not be reached. Check your connection and confirm this deployment includes the Netlify Functions.', 503);
  }
  if (!response.headers.get('content-type')?.includes('application/json')) {
    throw new AdminRequestError('The admin API is missing from this deployment. Deploy the Netlify Functions together with the website.', 503);
  }
  const data = await response.json();
  if (!response.ok) throw new AdminRequestError(data.error || 'The administrator request failed. Please try again.', response.status);
  return data;
}
