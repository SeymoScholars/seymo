import { useImage } from '../hooks/useImage';
import { CheckCircle2, BookOpen, Calculator, Dna, GraduationCap } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

export default function Grade9to10Page() {
  const { getImage } = useImage();

  return (
    <>
      <Helmet>
        <title>Grades 9-10 Program | SeymoScholars</title>
        <meta name="description" content="Our Grades 9-10 program provides rigorous board exam preparation through advanced applications, simulators, and structured academic frameworks." />
        <meta name="keywords" content="Class 9-10 tuition, board exam preparation, high school education, math board prep, science coaching, english classes, SeymoScholars, offline classes" />
        <meta property="og:title" content="Grades 9-10 Program | SeymoScholars" />
        <meta property="og:description" content="Our Grades 9-10 program provides rigorous board exam preparation through advanced applications, simulators, and structured academic frameworks." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://seymoscholars.com/grades/9-10" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Grades 9-10 Program | SeymoScholars" />
        <meta name="twitter:description" content="Our Grades 9-10 program provides rigorous board exam preparation through advanced applications, simulators, and structured academic frameworks." />
        <link rel="canonical" href="https://seymoscholars.com/grades/9-10" />
        <script type="application/ld+json">
          {`{
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Grades 9-10 Program | SeymoScholars",
            "description": "Our Grades 9-10 program provides rigorous board exam preparation through advanced applications, simulators, and structured academic frameworks.",
            "url": "https://seymoscholars.com/grades/9-10"
          }`}
        </script>
      </Helmet>

      <section className="pt-32 pb-20 bg-slate-50 relative border-b border-slate-100 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={getImage('grade9to10.img1', 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=2000&h=800')} 
            alt="High school students" 
            className="w-full h-full object-cover opacity-20 filter blur-[2px]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-50/90 to-slate-50"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm border border-blue-200">
            <GraduationCap className="w-8 h-8" />
          </div>
          <h1 className="text-5xl font-black text-slate-900 mb-6">Grades 9-10: Advanced AI & Robotics Core</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Rigorous preparation aligned with CBSE/ICSE patterns. We focus on advanced applications, Python programming, Machine Learning, and Internet of Things.
          </p>
        </div>
      </section>

      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="lg:w-1/2">
              <h2 className="px-4 py-1.5 bg-blue-50 text-blue-700 font-bold rounded-full text-sm uppercase tracking-wider border border-blue-100 inline-block mb-4">Our Approach</h2>
              <h3 className="text-3xl md:text-4xl font-black text-slate-900 mb-6 mt-4">
                Structured, rigorous, and result-oriented.
              </h3>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                The high school years are critical. We shift our focus to mastering exam patterns, perfecting answer structures, and utilizing advanced simulation tools to guarantee absolute command over the syllabus, while leading advanced AI & Robotics projects.
              </p>
              
              <ul className="space-y-6">
                <li className="flex items-start gap-4 text-slate-700">
                  <CheckCircle2 className="w-6 h-6 text-blue-500 shrink-0 mt-1" />
                  <div>
                    <strong className="block text-slate-900 mb-1">Advanced Simulators & Tech</strong>
                    <p>Using industry-standard 3D scientific modeling software and diving deep into sensors, motors, and IoT.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4 text-slate-700">
                  <CheckCircle2 className="w-6 h-6 text-blue-500 shrink-0 mt-1" />
                  <div>
                    <strong className="block text-slate-900 mb-1">AI & Code Proficiency</strong>
                    <p>Mastering Python basics, exploring Machine Learning, understanding AI Ethics, and building real-world AI applications.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4 text-slate-700">
                  <CheckCircle2 className="w-6 h-6 text-blue-500 shrink-0 mt-1" />
                  <div>
                    <strong className="block text-slate-900 mb-1">Exam Strategy</strong>
                    <p>Focusing on time management, previous year question analysis, and high-scoring writing techniques.</p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="lg:w-1/2">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4 pt-12">
                  <div className="rounded-3xl overflow-hidden shadow-lg border border-slate-100">
                    <img src={getImage('grade9to10.img2', 'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&q=80&w=600&h=800')} alt="Advanced lab" className="w-full h-full object-cover" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="rounded-3xl overflow-hidden shadow-lg border border-slate-100">
                    <img src={getImage('grade9to10.img3', 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=600&h=800')} alt="Study session" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-black text-slate-900 mb-12">Explore Subjects for Grades 9-10</h2>
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
