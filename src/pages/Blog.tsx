import { Calendar, User, ArrowRight } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { BlogPost, fetchBlogs } from '../services/blogService';

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadBlogs() {
      try {
        setLoading(true);
        const data = await fetchBlogs();
        setPosts(data);
      } catch (err: any) {
        setError(err.message || "Failed to load blogs");
      } finally {
        setLoading(false);
      }
    }
    loadBlogs();
  }, []);

  return (
    <>
      <Helmet>
        <title>Blog | SeymoScholars</title>
        <meta name="description" content="Read our latest insights on education, parenting, and learning methodologies tailored for Indian students." />
        <meta name="keywords" content="SeymoScholars blog, educational insights, Indian school curriculum, parenting tips, learning methodolgies" />
        <meta property="og:title" content="Blog | SeymoScholars" />
        <meta property="og:description" content="Read our latest insights on education, parenting, and learning methodologies tailored for Indian students." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://seymoscholars.com/blog" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Blog | SeymoScholars" />
        <meta name="twitter:description" content="Read our latest insights on education, parenting, and learning methodologies tailored for Indian students." />
        <link rel="canonical" href="https://seymoscholars.com/blog" />
        <script type="application/ld+json">
          {`{
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "Blog | SeymoScholars",
            "description": "Read our latest insights on education, parenting, and learning methodologies tailored for Indian students.",
            "url": "https://seymoscholars.com/blog"
          }`}
        </script>
      </Helmet>

      <section className="pt-32 pb-20 bg-slate-50 relative border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-black text-slate-900 mb-6">SeymoScholars Blog</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Insights, advice, and perspectives on modern education from our expert educators.
          </p>
        </div>
      </section>

      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="text-xl font-bold text-slate-600 animate-pulse">Loading blogs...</div>
            </div>
          ) : error ? (
            <div className="flex justify-center items-center py-20">
              <div className="text-xl font-bold text-red-600">{error}</div>
            </div>
          ) : posts.length === 0 ? (
            <div className="flex justify-center items-center py-20">
              <div className="text-xl font-bold text-slate-600">No blogs found.</div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {posts.map((post) => (
                  <article key={post.slug} className="group cursor-pointer">
                    <Link to={`/blog/${post.slug}`} className="block">
                      <div className="relative rounded-[32px] overflow-hidden mb-6 aspect-[16/10]">
                        <img 
                          src={post.coverImage} 
                          alt={post.title} 
                          className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-bold text-indigo-600 shadow-sm">
                          {post.category}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-slate-500 font-medium mb-4">
                        <span className="flex items-center gap-1.5">
                          <User className="w-4 h-4" /> {post.author}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-4 h-4" /> {post.date}
                        </span>
                      </div>
                      
                      <h3 className="text-2xl font-black text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">
                        {post.title}
                      </h3>
                      
                      <p className="text-slate-600 leading-relaxed mb-6">
                        {post.summary}
                      </p>
                      
                      <span className="text-indigo-600 font-bold flex items-center gap-2 group-hover:gap-3 transition-all">
                        Continue Reading <ArrowRight className="w-4 h-4" />
                      </span>
                    </Link>
                  </article>
                ))}
              </div>
              
            </>
          )}
        </div>
      </section>
    </>
  );
}
