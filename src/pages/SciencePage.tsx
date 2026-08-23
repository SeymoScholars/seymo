import { useImage } from '../hooks/useImage';
import { CheckCircle2, Dna, Lightbulb, Compass, Microscope } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import scienceHighSchoolImg from '../assets/images/science_high_school_lab_1779860630160.png';

export default function SciencePage() {
  const { getImage } = useImage();

  return (
    <>
      <Helmet>
        <title>Science | SeymoScholars</title>
        <meta name="description" content="Explore our Science curriculum at SeymoScholars. We use interactive conceptual learning to build strong foundations in physics, chemistry, and biology." />
        <meta name="keywords" content="Science, Science tuition, biology, physics, chemistry, class 3-10 science, offline science classes, SeymoScholars, interactive science learning" />
        <meta property="og:title" content="Science | SeymoScholars" />
        <meta property="og:description" content="Explore our Science curriculum at SeymoScholars. We use interactive conceptual learning to build strong foundations in physics, chemistry, and biology." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://seymoscholars.com/subjects/science" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Science | SeymoScholars" />
        <meta name="twitter:description" content="Explore our Science curriculum at SeymoScholars. We use interactive conceptual learning to build strong foundations in physics, chemistry, and biology." />
        <link rel="canonical" href="https://seymoscholars.com/subjects/science" />
        <script type="application/ld+json">
          {`{
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Science | SeymoScholars",
            "description": "Explore our Science curriculum at SeymoScholars. We use interactive conceptual learning to build strong foundations in physics, chemistry, and biology.",
            "url": "https://seymoscholars.com/subjects/science"
          }`}
        </script>
      </Helmet>

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-slate-50 relative border-b border-slate-100 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-slate-900">
          <img 
            src={getImage('science.img1', 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&q=80&w=2000&h=800')} 
            alt="Captivating Universe" 
            className="w-full h-full object-cover opacity-60 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-50"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 pt-10">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm border border-emerald-200">
            <Dna className="w-8 h-8" />
          </div>
          <h1 className="text-5xl font-black text-slate-900 mb-6 drop-shadow-xl">Science Exploration</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            From the microscopic building blocks of life to the vastness of the universe. We nurture natural curiosity.
          </p>
        </div>
      </section>

      {/* Facts & Philosophy */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            
            <div className="p-8 rounded-[32px] bg-emerald-50/50 border border-emerald-100">
              <h3 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
                <Lightbulb className="w-6 h-6 text-emerald-500" /> 
                Why Our Method Works (Facts)
              </h3>
              <ul className="space-y-6">
                <li className="flex items-start gap-4 text-slate-700 leading-relaxed">
                  <div className="bg-white p-2 rounded-xl shadow-sm text-emerald-600 shrink-0 mt-1">
                    <span className="font-bold text-lg">1</span>
                  </div>
                  <p><strong>Experimentation Drives Comprehension:</strong> Students who engage in active, inquiry-based science experiments score up to 20% higher on standard assessments than those learning from textbooks alone.</p>
                </li>
                <li className="flex items-start gap-4 text-slate-700 leading-relaxed">
                  <div className="bg-white p-2 rounded-xl shadow-sm text-emerald-600 shrink-0 mt-1">
                    <span className="font-bold text-lg">2</span>
                  </div>
                  <p><strong>Multisensory Learning is Essential:</strong> Scientific concepts often require visualizing invisible phenomena (like atoms or forces). Combining digital simulations with real-world lab activities creates stronger neural pathways.</p>
                </li>
              </ul>
            </div>

            <div className="p-8 rounded-[32px] bg-teal-50/50 border border-teal-100">
              <h3 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
                <Compass className="w-6 h-6 text-teal-500" /> 
                Our Philosophy
              </h3>
              <ul className="space-y-6">
                <li className="flex items-start gap-4 text-slate-700 leading-relaxed">
                  <CheckCircle2 className="w-6 h-6 text-teal-500 shrink-0 mt-1" />
                  <p><strong>Science is a Verb, Not Just a Noun:</strong> We teach science as an active process of discovery—observing, questioning, and testing—rather than just a body of facts to memorize.</p>
                </li>
                <li className="flex items-start gap-4 text-slate-700 leading-relaxed">
                  <CheckCircle2 className="w-6 h-6 text-teal-500 shrink-0 mt-1" />
                  <p><strong>Connecting to the Real World:</strong> Every scientific principle we teach is immediately connected to its real-world application, helping students understand not just the "what," but the "why it matters."</p>
                </li>
                <li className="flex items-start gap-4 text-slate-700 leading-relaxed">
                  <CheckCircle2 className="w-6 h-6 text-teal-500 shrink-0 mt-1" />
                  <p><strong>SOF Olympiad Prep (NSO):</strong> We provide comprehensive coaching and syllabus alignment for the prestigious SOF National Science Olympiad to build global competitive readiness.</p>
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
              <h3 className="text-3xl font-black text-slate-900 mb-4">Hands-on Discovery</h3>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                For younger students, science is about exploring their immediate environment. We use safe, interactive physical blocks, sensory bins, and simple nature experiments to introduce fundamental ideas about plants, animals, energy, and materials.
              </p>
            </div>
            <div className="lg:w-1/2">
              <div className="rounded-[40px] overflow-hidden shadow-2xl p-2 bg-yellow-100 border border-yellow-200">
                <img 
                  src={getImage('science.img3', 'https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&q=80&w=1000&h=700')} 
                  alt="Young students learning science interactively" 
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
              <h3 className="text-3xl font-black text-slate-900 mb-4">The Scientific Method</h3>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                Middle schoolers begin to formalize their scientific thinking. We introduce safe laboratory tools, 3/4 dimensional static solar system and ecosystem representations, and encourage them to design their own simple experiments to test hypotheses.
              </p>
            </div>
            <div className="lg:w-1/2">
              <div className="rounded-[40px] overflow-hidden shadow-2xl p-2 bg-emerald-100 border border-emerald-200">
                <img 
                  src={getImage('science.img2', 'https://images.unsplash.com/photo-1614313913007-2b4ae8ce32d6?auto=format&fit=crop&q=80&w=1000&h=700')} 
                  alt="Static 3/4 view of the solar system" 
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
              <h3 className="text-3xl font-black text-slate-900 mb-4">Rigorous Analysis</h3>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                As board exams approach, we dive deep into advanced physics, chemistry, and biology. Students utilize advanced measurement tools, optical instruments, and chemical modeling software to grasp complex reactions and mechanics thoroughly.
              </p>
            </div>
            <div className="lg:w-1/2">
              <div className="rounded-[40px] overflow-hidden shadow-2xl p-2 bg-blue-100 border border-blue-200">
                <img 
                  src={scienceHighSchoolImg} 
                  alt="High school students using advanced scientific tools" 
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
