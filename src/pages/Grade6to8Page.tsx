import { useImage } from '../hooks/useImage';
import { CheckCircle2, Microscope, Calculator, BookOpen, Dna } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

export default function Grade6to8Page() {
  const { getImage } = useImage();

  return (
    <>
      <Helmet>
        <title>Grades 6-8 Program | SeymoScholars</title>
        <meta name="description" content="Our Grades 6-8 middle school program focuses on bridging the gap between concrete foundations and abstract theories." />
        <meta name="keywords" content="Class 6-8 tuition, middle school education, math coaching, science tuition, english classes, SeymoScholars, offline classes" />
        <meta property="og:title" content="Grades 6-8 Program | SeymoScholars" />
        <meta property="og:description" content="Our Grades 6-8 middle school program focuses on bridging the gap between concrete foundations and abstract theories." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://seymoscholars.com/grades/6-8" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Grades 6-8 Program | SeymoScholars" />
        <meta name="twitter:description" content="Our Grades 6-8 middle school program focuses on bridging the gap between concrete foundations and abstract theories." />
        <link rel="canonical" href="https://seymoscholars.com/grades/6-8" />
        <script type="application/ld+json">
          {`{
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Grades 6-8 Program | SeymoScholars",
            "description": "Our Grades 6-8 middle school program focuses on bridging the gap between concrete foundations and abstract theories.",
            "url": "https://seymoscholars.com/grades/6-8"
          }`}
        </script>
      </Helmet>

      <section className="pt-32 pb-20 bg-slate-50 relative border-b border-slate-100 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/im3.jpg" 
            onError={(e) => {
              e.currentTarget.src = getImage('grade6to8.fallback1', 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=2000&h=800');
            }}
            alt="Middle school students" 
            className="w-full h-full object-cover opacity-20 filter blur-[2px]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-50/90 to-slate-50"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm border border-emerald-200">
            <Microscope className="w-8 h-8" />
          </div>
          <h1 className="text-5xl font-black text-slate-900 mb-6">Grades 6-8: Middle School Transition</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Guiding students through complex concepts. We bridge the gap between concrete foundations and abstract theories, accompanied by Scratch programming and daily AI applications.
          </p>
        </div>
      </section>

      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="lg:w-1/2 order-2 lg:order-1">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4 pt-12">
                  <div className="rounded-3xl overflow-hidden shadow-lg border border-slate-100">
                    <img src={getImage('grade6to8.img1', 'https://images.unsplash.com/photo-1564410267841-915d8e4d71ea?auto=format&fit=crop&q=80&w=600&h=800')} alt="Science experiment" className="w-full h-full object-cover" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="rounded-3xl overflow-hidden shadow-lg border border-slate-100">
                    <img src={getImage('grade6to8.img2', 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80&w=600&h=800')} alt="Discussion" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:w-1/2 order-1 lg:order-2">
              <h2 className="px-4 py-1.5 bg-emerald-50 text-emerald-700 font-bold rounded-full text-sm uppercase tracking-wider border border-emerald-100 inline-block mb-4">Our Approach</h2>
              <h3 className="text-3xl md:text-4xl font-black text-slate-900 mb-6 mt-4">
                Analytical and investigative.
              </h3>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Middle school is where reasoning takes center stage. We encourage students to ask "Why?", to test hypotheses, formalize logic, and innovate with robotics like Smart Home automation and sensor-based movement.
              </p>
              
              <ul className="space-y-6">
                <li className="flex items-start gap-4 text-slate-700">
                  <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0 mt-1" />
                  <div>
                    <strong className="block text-slate-900 mb-1">Scientific Method & Labs</strong>
                    <p>Transitioning from basic observation to controlled experiments and formal data analysis.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4 text-slate-700">
                  <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0 mt-1" />
                  <div>
                    <strong className="block text-slate-900 mb-1">Algebraic Thinking & Logic</strong>
                    <p>Bridging physical math models into abstract algebraic equations and algorithmic step-wise thinking.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4 text-slate-700">
                  <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0 mt-1" />
                  <div>
                    <strong className="block text-slate-900 mb-1">AI & Sensors</strong>
                    <p>Exploring practical AI in daily life, handling motors and sensors, and coding with Scratch.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-black text-slate-900 mb-12">Explore Subjects for Grades 6-8</h2>
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
