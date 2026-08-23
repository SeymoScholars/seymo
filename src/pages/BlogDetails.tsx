import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Calendar, User, ArrowLeft } from 'lucide-react';
import { BlogPost, fetchBlogBySlug } from '../services/blogService';

export default function BlogDetails() {
  const { slug } = useParams<{ slug: string }>();
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadBlog() {
      try {
        setLoading(true);
        if (slug) {
          const data = await fetchBlogBySlug(slug);
          if (data) {
            setBlog(data);
          } else {
            setError("Blog not found.");
          }
        }
      } catch (err: any) {
        setError(err.message || "Failed to reach the blog service. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
    loadBlog();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen pt-40 pb-20 flex justify-center items-center">
        <div className="text-xl font-bold text-slate-600 animate-pulse">Loading blog...</div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen pt-40 pb-20 flex flex-col justify-center items-center px-4">
        <h1 className="text-3xl font-black text-slate-900 mb-4">{error || "Blog not found."}</h1>
        <Link to="/blog" className="text-indigo-600 font-bold flex items-center gap-2 hover:gap-3 transition-all">
          <ArrowLeft className="w-5 h-5" /> Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{blog.title} | SeymoScholars Blog</title>
        <meta name="description" content={blog.summary} />
      </Helmet>
      
      <article className="pt-32 pb-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/blog" className="inline-flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-bold mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Blog
        </Link>
        
        <div className="mb-8">
          <span className="inline-block px-4 py-1.5 bg-indigo-50 text-indigo-600 font-bold rounded-full text-sm mb-6">
            {blog.category}
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 leading-tight">
            {blog.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 text-slate-500 font-medium">
            <span className="flex items-center gap-2">
              <User className="w-5 h-5" /> {blog.author}
            </span>
            <span className="flex items-center gap-2">
              <Calendar className="w-5 h-5" /> {blog.date}
            </span>
          </div>
        </div>

        <div className="rounded-[32px] overflow-hidden mb-12 aspect-[16/9] shadow-lg">
          <img 
            src={blog.coverImage} 
            alt={blog.title} 
            className="w-full h-full object-cover"
          />
        </div>

        <div className="prose prose-lg max-w-none text-slate-600 leading-relaxed whitespace-pre-line">
          {blog.content}
        </div>
      </article>
    </>
  );
}
