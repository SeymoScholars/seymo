import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft } from 'lucide-react';
import { BlogPost, fetchBlogBySlug } from '../services/blogService';
import ArticleTemplate from '../editorial/ArticleTemplate';
import { newArticle, textDocument, type ArticleContent } from '../editorial/model';

function articleContent(blog: BlogPost): ArticleContent {
  if (blog.editorial) return blog.editorial;
  const date = new Date(blog.date);
  return {
    ...newArticle(), category: blog.category, title: blog.title, summary: blog.summary,
    author: blog.author, date: Number.isNaN(date.getTime()) ? newArticle().date : date.toISOString().slice(0, 10),
    heroImage: blog.coverImage, heroAlt: blog.title, introductionHeading: '', introduction: textDocument(blog.content),
  };
}

export default function BlogDetails() {
  const { slug } = useParams<{ slug: string }>();
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    async function loadBlog() {
      try {
        setLoading(true);
        setError(null);
        setBlog(null);
        if (slug) {
          const data = await fetchBlogBySlug(slug);
          if (!active) return;
          if (data) {
            setBlog(data);
          } else {
            setError("Article not found or no longer published.");
          }
        }
      } catch (err: any) {
        if (active) setError(err.message || "Failed to reach the article service. Please try again later.");
      } finally {
        if (active) setLoading(false);
      }
    }
    loadBlog();
    return () => { active = false; };
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen pt-40 pb-20 flex justify-center items-center">
        <div className="text-xl font-bold text-slate-600 animate-pulse">Loading article...</div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen pt-40 pb-20 flex flex-col justify-center items-center px-4">
        <h1 className="text-3xl font-black text-slate-900 mb-4">{error || "Article not found."}</h1>
        <Link to="/blog" className="text-indigo-600 font-bold flex items-center gap-2 hover:gap-3 transition-all">
          <ArrowLeft className="w-5 h-5" /> Back to Resources
        </Link>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{blog.title} | Seymo Scholars Resources</title>
        <meta name="description" content={blog.summary} />
        <link rel="canonical" href={`https://seymoscholars.org/resources/${blog.slug}`} />
        <meta property="og:title" content={blog.title} />
        <meta property="og:description" content={blog.summary} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={blog.coverImage} />
      </Helmet>
      
      <div className="pt-32 pb-24" style={{ background: '#fff' }}>
        <Link to="/blog" className="editorial-back flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-bold mx-auto mb-4 px-6" style={{ maxWidth: 1080 }}>
          <ArrowLeft className="w-4 h-4" /> Back to Resources
        </Link>
        <ArticleTemplate article={articleContent(blog)} />
      </div>
    </>
  );
}
