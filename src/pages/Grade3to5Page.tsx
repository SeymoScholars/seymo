import { useImage } from '../hooks/useImage';
import { CheckCircle2, Sparkles, BookOpen, Calculator, Dna } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

export default function Grade3to5Page() {
  const { getImage } = useImage();

  return (
    <>
      <Helmet>
        <title>Grades 3-5 Program | SeymoScholars</title>
        <meta name="description" content="Our Grades 3-5 foundational program focuses on building core logic, vocabulary, and natural curiosity through highly interactive and sensory learning methods." />
        <meta name="keywords" content="Class 3-5 tuition, elementary education, foundational learning, Math for grade 3-5, Science for grade 3-5, English class 3-5, SeymoScholars, offline classes" />
        <meta property="og:title" content="Grades 3-5 Program | SeymoScholars" />
        <meta property="og:description" content="Our Grades 3-5 foundational program focuses on building core logic, vocabulary, and natural curiosity through highly interactive and sensory learning methods." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://seymoscholars.com/grades/3-5" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Grades 3-5 Program | SeymoScholars" />
        <meta name="twitter:description" content="Our Grades 3-5 foundational program focuses on building core logic, vocabulary, and natural curiosity through highly interactive and sensory learning methods." />
        <link rel="canonical" href="https://seymoscholars.com/grades/3-5" />
        <script type="application/ld+json">
          {`{
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Grades 3-5 Program | SeymoScholars",
            "description": "Our Grades 3-5 foundational program focuses on building core logic, vocabulary, and natural curiosity through highly interactive and sensory learning methods.",
            "url": "https://seymoscholars.com/grades/3-5"
          }`}
        </script>
      </Helmet>

      <section className="pt-32 pb-20 bg-slate-50 relative border-b border-slate-100 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/im2.jpg" 
            onError={(e) => {
              e.currentTarget.src = getImage('grade3to5.fallback', 'https://images.unsplash.com/photo-1542887800-faca0261c9e1?auto=format&fit=crop&q=80&w=2000&h=800');
            }}
            alt="Children collaborating" 
            className="w-full h-full object-cover opacity-20 filter blur-[2px]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-50/90 to-slate-50"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="w-16 h-16 bg-yellow-100 text-yellow-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm border border-yellow-200">
            <Sparkles className="w-8 h-8" />
          </div>
          <h1 className="text-5xl font-black text-slate-900 mb-6">Grades 3-5: The Foundational Years</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Igniting curiosity. We build an unbreakable foundation in numeracy, literacy, and scientific observation, sparking early interest through introductory Robotics & AI.
          </p>
        </div>
      </section>

      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="lg:w-1/2">
              <h2 className="px-4 py-1.5 bg-yellow-50 text-yellow-700 font-bold rounded-full text-sm uppercase tracking-wider border border-yellow-100 inline-block mb-4">Our Approach</h2>
              <h3 className="text-3xl md:text-4xl font-black text-slate-900 mb-6 mt-4">
                Playful, tactile, and deeply conceptual.
              </h3>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                For young learners, abstract rules can be confusing. We translate complex ideas into tangible activities. Students touch, move, and visualize concepts before ever putting a formula on paper, while building their very first real robots.
              </p>
              
              <ul className="space-y-6">
                <li className="flex items-start gap-4 text-slate-700">
                  <CheckCircle2 className="w-6 h-6 text-yellow-500 shrink-0 mt-1" />
                  <div>
                    <strong className="block text-slate-900 mb-1">Interactive Blocks & Models</strong>
                    <p>Fractions, place value, and basic geometry are taught using physical and digital manipulatives.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4 text-slate-700">
                  <CheckCircle2 className="w-6 h-6 text-yellow-500 shrink-0 mt-1" />
                  <div>
                    <strong className="block text-slate-900 mb-1">Intro to Tech Context</strong>
                    <p>Understanding machines around us, discovering how robots work, and grasping natural vs artificial intelligence.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4 text-slate-700">
                  <CheckCircle2 className="w-6 h-6 text-yellow-500 shrink-0 mt-1" />
                  <div>
                    <strong className="block text-slate-900 mb-1">Story-Driven Learning</strong>
                    <p>Vocabulary and early reading comprehension are woven into captivating interactive stories.</p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="lg:w-1/2">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4 pt-12">
                  <div className="rounded-3xl overflow-hidden shadow-lg border border-slate-100">
                    <img src={getImage('grade3to5.img1', 'https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&q=80&w=600&h=800')} alt="Block learning" className="w-full h-full object-cover" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="rounded-3xl overflow-hidden shadow-lg border border-slate-100">
                    <img src={getImage('grade3to5.img2', 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=600&h=800')} alt="Reading stories" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-black text-slate-900 mb-12">Explore Subjects for Grades 3-5</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link to="/subjects/mathematics" className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Calculator className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Mathematics</h3>
            </Link>
            <Link to="/subjects/science" className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Dna className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Science</h3>
            </Link>
            <Link to="/subjects/english" className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
              <div className="w-16 h-16 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <BookOpen className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">English</h3>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
