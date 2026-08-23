import { useImage } from '../hooks/useImage';
import { CheckCircle2, Calculator, Lightbulb, Compass, Ruler } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import mathBoardImg from '../assets/images/math_board_3d_1779860594526.png';

export default function MathPage() {
  const { getImage } = useImage();

  return (
    <>
      <Helmet>
        <title>Mathematics | SeymoScholars</title>
        <meta name="description" content="Explore our Mathematics curriculum at SeymoScholars. We use interactive conceptual learning to build strong foundations from grades 3 to 10." />
        <meta name="keywords" content="Mathematics, Math tuition, class 3-10 math, conceptual math learning, SeymoScholars, offline math classes, learn math, mathematics curriculum" />
        <meta property="og:title" content="Mathematics | SeymoScholars" />
        <meta property="og:description" content="Explore our Mathematics curriculum at SeymoScholars. We use interactive conceptual learning to build strong foundations from grades 3 to 10." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://seymoscholars.com/subjects/mathematics" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Mathematics | SeymoScholars" />
        <meta name="twitter:description" content="Explore our Mathematics curriculum at SeymoScholars. We use interactive conceptual learning to build strong foundations from grades 3 to 10." />
        <link rel="canonical" href="https://seymoscholars.com/subjects/mathematics" />
        <script type="application/ld+json">
          {`{
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Mathematics | SeymoScholars",
            "description": "Explore our Mathematics curriculum at SeymoScholars. We use interactive conceptual learning to build strong foundations from grades 3 to 10.",
            "url": "https://seymoscholars.com/subjects/mathematics"
          }`}
        </script>
      </Helmet>
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-slate-50 relative border-b border-slate-100 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-slate-900">
          <img 
            src={mathBoardImg} 
            alt="Beautiful Mathematics Visualization" 
            className="w-full h-full object-cover opacity-60 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-50"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 pt-10">
          <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm border border-blue-200">
            <Calculator className="w-8 h-8" />
          </div>
          <h1 className="text-5xl font-black text-slate-900 mb-6">Mathematics Mastery</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Moving beyond mere calculations. We build an intuitive understanding of numbers, shapes, and patterns through visual and interactive learning.
          </p>
        </div>
      </section>

      {/* Facts & Philosophy */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            
            <div className="p-8 rounded-[32px] bg-indigo-50/50 border border-indigo-100">
              <h3 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
                <Lightbulb className="w-6 h-6 text-indigo-500" /> 
                Why Our Method Works (Facts)
              </h3>
              <ul className="space-y-6">
                <li className="flex items-start gap-4 text-slate-700 leading-relaxed">
                  <div className="bg-white p-2 rounded-xl shadow-sm text-indigo-600 shrink-0 mt-1">
                    <span className="font-bold text-lg">1</span>
                  </div>
                  <p><strong>Visual Learning Increases Retention:</strong> Studies show that students taught with concrete visual models are 60% more likely to retain and apply mathematical concepts correctly than those taught through rote algorithm memorization.</p>
                </li>
                <li className="flex items-start gap-4 text-slate-700 leading-relaxed">
                  <div className="bg-white p-2 rounded-xl shadow-sm text-indigo-600 shrink-0 mt-1">
                    <span className="font-bold text-lg">2</span>
                  </div>
                  <p><strong>Early Spatial Skills Predict Success:</strong> Developing spatial reasoning through hands-on geometric models in early grades is a stronger predictor of future STEM success than early arithmetic skills.</p>
                </li>
              </ul>
            </div>

            <div className="p-8 rounded-[32px] bg-blue-50/50 border border-blue-100">
              <h3 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
                <Compass className="w-6 h-6 text-blue-500" /> 
                Our Philosophy
              </h3>
              <ul className="space-y-6">
                <li className="flex items-start gap-4 text-slate-700 leading-relaxed">
                  <CheckCircle2 className="w-6 h-6 text-blue-500 shrink-0 mt-1" />
                  <p><strong>Concept Over Calculation:</strong> We believe a student who understands <em>why</em> a formula works can reconstruct it if forgotten. We prioritize structural understanding before introducing computational shortcuts.</p>
                </li>
                <li className="flex items-start gap-4 text-slate-700 leading-relaxed">
                  <CheckCircle2 className="w-6 h-6 text-blue-500 shrink-0 mt-1" />
                  <p><strong>Tangible Interactivity:</strong> Mathematics is not a spectator sport. By physically or digitally manipulating math models, abstract theories transform into engaging, logical realities.</p>
                </li>
                <li className="flex items-start gap-4 text-slate-700 leading-relaxed">
                  <CheckCircle2 className="w-6 h-6 text-blue-500 shrink-0 mt-1" />
                  <p><strong>SOF Olympiad Prep (IMO):</strong> We offer specialized coaching and syllabus alignment for the prestigious International Mathematics Olympiad to master logical reasoning and problem-solving.</p>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* Grade Breakdowns */}
      <section className="py-24 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
          
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="lg:w-1/2">
              <div className="inline-block px-4 py-1.5 rounded-full text-sm font-bold mb-6 bg-yellow-100 text-yellow-800 border border-yellow-200">
                Grades 3-5
              </div>
              <h3 className="text-3xl font-black text-slate-900 mb-4">Concrete Foundations</h3>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                In their early foundational years, our students learn mathematics using engaging, tangible interactive blocks. This tactile method turns abstract numbers into physical quantities, allowing students to "feel" math through counting units, fractions blocks, and logic grids.
              </p>
            </div>
            <div className="lg:w-1/2">
              <div className="rounded-[40px] overflow-hidden shadow-2xl p-2 bg-yellow-100 border border-yellow-200">
                <img 
                  src={getImage('math.img1', 'https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&q=80&w=1000&h=700')} 
                  alt="Young students learning with interactive blocks" 
                  className="w-full h-auto rounded-[32px] object-cover"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row-reverse gap-12 items-center">
            <div className="lg:w-1/2">
              <div className="inline-block px-4 py-1.5 rounded-full text-sm font-bold mb-6 bg-emerald-100 text-emerald-800 border border-emerald-200">
                Grades 6-8
              </div>
              <h3 className="text-3xl font-black text-slate-900 mb-4">Bridging the Abstract</h3>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                As students transition to middle school, we blend interactive blocks with visual mathematical tools. We introduce algebraic thinking and complex geometry through guided digital labs and physical models, ensuring the bridge to abstract math is seamless and intuitive.
              </p>
            </div>
            <div className="lg:w-1/2">
              <div className="rounded-[40px] overflow-hidden shadow-2xl p-2 bg-emerald-100 border border-emerald-200">
                <img 
                  src={getImage('math.img2', 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=1000&h=700')} 
                  alt="Middle school students using mathematical tools" 
                  className="w-full h-auto rounded-[32px] object-cover"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="lg:w-1/2">
              <div className="inline-block px-4 py-1.5 rounded-full text-sm font-bold mb-6 bg-blue-100 text-blue-800 border border-blue-200">
                Grades 9-10
              </div>
              <h3 className="text-3xl font-black text-slate-900 mb-4">Advanced Applications</h3>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                For our senior students preparing for board exams, learning is driven by sophisticated mathematical software and precision geometric tools. We construct real-world simulation models for trigonometry, calculus foundations, and probability, ensuring absolute mastery of the syllabus.
              </p>
            </div>
            <div className="lg:w-1/2">
              <div className="rounded-[40px] overflow-hidden shadow-2xl p-2 bg-blue-100 border border-blue-200 relative">
                <div className="absolute top-8 left-8 bg-white p-3 rounded-2xl shadow-lg z-10 border border-slate-100 text-blue-600">
                  <Ruler className="w-8 h-8" />
                </div>
                <img 
                  src={getImage('math.img3', 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=1000&h=700')} 
                  alt="High school students using advanced tools" 
                  className="w-full h-auto rounded-[32px] object-cover"
                />
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
