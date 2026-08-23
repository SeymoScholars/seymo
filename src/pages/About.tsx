import { useImage } from '../hooks/useImage';
import { Target, Heart, Lightbulb, GraduationCap, CheckCircle2, Activity, Sparkles, BookOpen } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export default function About() {
  const { getImage } = useImage();

  return (
    <>
      <Helmet>
        <title>About Us | SeymoScholars</title>
        <meta name="description" content="Learn about SeymoScholars and our operations lead Probad Chakraborty's vision for concept-led education tailored for Indian students in grades 3 to 10." />
        <meta name="keywords" content="About SeymoScholars, Probad Chakraborty, conceptually led education, Indian students, class 3-10 learning, offline education" />
        <meta property="og:title" content="About Us | SeymoScholars" />
        <meta property="og:description" content="Learn about SeymoScholars and our operations lead Probad Chakraborty's vision for concept-led education tailored for Indian students in grades 3 to 10." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://seymoscholars.com/about" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About Us | SeymoScholars" />
        <meta name="twitter:description" content="Learn about SeymoScholars and our operations lead Probad Chakraborty's vision for concept-led education tailored for Indian students in grades 3 to 10." />
        <link rel="canonical" href="https://seymoscholars.com/about" />
        <script type="application/ld+json">
          {`{
            "@context": "https://schema.org",
            "@type": "AboutPage",
            "name": "About Us | SeymoScholars",
            "description": "Learn about SeymoScholars and our operations lead Probad Chakraborty's vision for concept-led education tailored for Indian students in grades 3 to 10.",
            "url": "https://seymoscholars.com/about"
          }`}
        </script>
      </Helmet>
      <section className="py-24 pt-32 bg-slate-50 relative border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-black text-slate-900 mb-6">Who We Are</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Seymo Scholars is a European education organisation working closely with children and families to strengthen learning at its roots. Our work sits at the intersection of thoughtful pedagogy, child safety, and transparent parent partnership.
          </p>
        </div>
      </section>

      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="lg:w-1/2 relative lg:pr-8">
              <div className="relative rounded-[40px] overflow-hidden shadow-2xl bg-blue-100 p-2">
                <img 
                  src={getImage('about.img1', 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=1200&h=1000')} 
                  alt="Students collaborating" 
                  className="w-full h-auto rounded-[32px] object-cover aspect-[4/3] lg:aspect-auto"
                />
                <div className="absolute top-10 -right-2 md:-right-6 bg-white p-4 justify-center items-center rounded-2xl shadow-xl hidden md:flex gap-3 border border-slate-100">
                  <div className="bg-rose-100 p-2 rounded-full text-rose-600 shrink-0">
                    <Heart className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Trusted By</p>
                    <p className="text-sm font-black text-slate-900">Loving Parents</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2">
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center shrink-0 border border-blue-100 text-blue-600">
                    <Target className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xl font-extrabold text-slate-900 mb-2">Our Mission</h4>
                    <p className="text-slate-600">To bridge the gap between traditional schooling and the demands of tomorrow. We build leaders, thinkers, and innovators equipped with both academic rigorousness and technical fluency.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center shrink-0 border border-orange-100 text-orange-600">
                    <Lightbulb className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xl font-extrabold text-slate-900 mb-2">Our Methodology</h4>
                    <p className="text-slate-600">We replace rote memorization with hands-on building, critical inquiry, and project-based learning—integrating Core Academics with cutting-edge Robotics and AI.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
          
          <div className="flex flex-col lg:flex-row-reverse gap-12 items-center">
            <div className="lg:w-1/2 relative lg:pl-8">
              <div className="relative rounded-[40px] overflow-hidden shadow-2xl bg-amber-100 p-2">
                <img 
                  src={getImage('about.founder', '/founder.png')} 
                  onError={(e) => {
                    e.currentTarget.src = getImage('about.fallback1', 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=1200&h=1000');
                  }}
                  alt="Probad Chakraborty" 
                  className="w-full h-auto rounded-[32px] object-cover aspect-[3/4] max-h-[550px] lg:aspect-auto"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-10 -left-2 md:-left-6 bg-white p-4 justify-center items-center rounded-2xl shadow-xl hidden md:flex gap-3 border border-slate-100">
                  <div className="bg-amber-100 p-2 rounded-full text-amber-600 shrink-0">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Operations Lead</p>
                    <p className="text-sm font-black text-slate-900">Probad Chakraborty</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2">
              <h2 className="px-4 py-1.5 bg-indigo-50 text-indigo-600 font-bold rounded-full text-sm uppercase tracking-wider border border-indigo-100 inline-block mb-4">Leadership</h2>
              <h3 className="text-3xl md:text-4xl font-black text-slate-900 mb-6 mt-4">
                Visionary Leadership
              </h3>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                Meet <strong>Probad Chakraborty</strong>, the operations lead of Seymo India and one of the major driving forces behind SeymoScholars. With almost a decade of experience in the educational sector, Probad identified a crucial gap in how foundational subjects were being taught in Indian schools.
              </p>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                His passion for interactive formats and concept-based learning inspired him to build an ecosystem where students are celebrated for asking "why" instead of just memorizing the "how." Under his leadership, SeymoScholars has positively impacted the lives of thousands of students across the nation.
              </p>
            </div>
          </div>

        </div>
      </section>

      <section id="philosophy" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="px-4 py-1.5 bg-rose-50 text-rose-600 font-bold rounded-full text-sm uppercase tracking-wider border border-rose-100 inline-block mb-4">Our Philosophy</h2>
            <h3 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 mt-4">
              The KUA Framework & Holistic Progress
            </h3>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              We replace rote learning with a scientific development model. Here is how we cultivate deep knowledge and real-world capability.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
            
            {/* Left Column: KUA Framework */}
            <div className="p-8 md:p-10 rounded-[40px] bg-indigo-50/50 border border-indigo-100/80 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 bg-indigo-600 text-white rounded-2xl shadow-md">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <h4 className="text-2xl font-black text-slate-900">The KUA Framework</h4>
                </div>
                <p className="text-slate-600 mb-8 leading-relaxed">
                  Our core pedagogy splits lessons into three key conceptual elements, ensuring your child learns actively rather than passively.
                </p>
                
                <div className="space-y-6">
                  <div className="flex gap-4 items-start pb-6 border-b border-indigo-100">
                    <div className="w-10 h-10 rounded-full bg-white border-2 border-indigo-500 font-black text-indigo-600 flex items-center justify-center shrink-0 shadow-sm">
                      K
                    </div>
                    <div>
                      <h5 className="font-extrabold text-slate-900 mb-1">Knowledge (Acquisition)</h5>
                      <p className="text-slate-600 text-sm leading-relaxed">
                        Acquiring essential fundamental facts, mathematical laws, scientific laws, and languages with absolute clarity and precision.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start pb-6 border-b border-indigo-100">
                    <div className="w-10 h-10 rounded-full bg-white border-2 border-indigo-500 font-black text-indigo-600 flex items-center justify-center shrink-0 shadow-sm">
                      U
                    </div>
                    <div>
                      <h5 className="font-extrabold text-slate-900 mb-1">Understanding (Inquiry)</h5>
                      <p className="text-slate-600 text-sm leading-relaxed">
                        Diving deep into the "why" and "how". Building rich mental models, explaining core principles in their own words, and debugging logic.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-full bg-white border-2 border-indigo-500 font-black text-indigo-600 flex items-center justify-center shrink-0 shadow-sm">
                      A
                    </div>
                    <div>
                      <h5 className="font-extrabold text-slate-900 mb-1">Application (Execution)</h5>
                      <p className="text-slate-600 text-sm leading-relaxed">
                        Translating knowledge and understanding into action: building robots, writing functional code, testing hypotheses, and executing real lab experiments.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Holistic Progress */}
            <div className="p-8 md:p-10 rounded-[40px] bg-rose-50/50 border border-rose-100/80 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 bg-rose-600 text-white rounded-2xl shadow-md">
                    <Activity className="w-6 h-6" />
                  </div>
                  <h4 className="text-2xl font-black text-slate-900">Holistic Progress</h4>
                </div>
                <p className="text-slate-600 mb-8 leading-relaxed">
                  We look at your child's complete development. Academic excellence handles current grades, while future-readiness prepares them for tomorrow.
                </p>

                <div className="space-y-6">
                  <div className="p-5 bg-white rounded-2xl border border-rose-100/50 shadow-sm">
                    <h5 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-rose-500" />
                      Academic Milestone Alignment
                    </h5>
                    <p className="text-slate-600 text-xs leading-relaxed">
                      Rigorous alignment with school curricula (CBSE/ICSE) and targeted coaching for competitive SOF Olympiads (NSO/IMO/IEO).
                    </p>
                  </div>

                  <div className="p-5 bg-white rounded-2xl border border-rose-100/50 shadow-sm">
                    <h5 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-rose-500" />
                      Cognitive & Creative Readiness
                    </h5>
                    <p className="text-slate-600 text-xs leading-relaxed">
                      Building logical and computational fluency through robotics and coding, helping students design innovative solutions under self-belief.
                    </p>
                  </div>

                  <div className="p-5 bg-white rounded-2xl border border-rose-100/50 shadow-sm">
                    <h5 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                      <GraduationCap className="w-5 h-5 text-rose-500" />
                      Emotional Confidence & Resilience
                    </h5>
                    <p className="text-slate-600 text-xs leading-relaxed">
                      Normalizing failure as a natural step in the engineering cycle, boosting public speaking, and inspiring active classroom participation.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Meet Our Mentors */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h3 className="text-indigo-600 font-bold tracking-wider uppercase mb-3">Meet Our Mentors</h3>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
              The Mentors Guiding the Next Generation
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-16 max-w-5xl mx-auto">
            {[
              { id: 1, name: 'Anurag Ghosh', role: 'Mentor', fallback: 'https://images.unsplash.com/photo-1544717302-de2939b7ef71?auto=format&fit=crop&q=80&w=800&h=800' },
              { id: 2, name: 'Sidhhartha Mirdha', role: 'Mentor', fallback: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&q=80&w=800&h=800' },
              { id: 3, name: 'Mohsina Hashim', role: 'Mentor', fallback: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800&h=800' },
              { id: 4, name: 'Saheli Deb Roy', role: 'Mentor', fallback: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=800&h=800' },
              { id: 5, name: 'Suchana Chanda', role: 'Mentor', fallback: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=800&h=800' },
              { id: 6, name: 'Siddarth Sherpa', role: 'School Relationship Manager', fallback: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800&h=800' },
            ].map((teacher) => (
              <div key={teacher.id} className="relative rounded-[32px] overflow-visible">
                <div className="rounded-[32px] overflow-hidden shadow-xl border border-slate-100 bg-slate-50">
                  <img 
                    src={getImage(`about.faculty${teacher.id}`, `/teacher${teacher.id}.png`)} 
                    onError={(e) => {
                      e.currentTarget.src = getImage(`about.facultyFallback${teacher.id}`, teacher.fallback);
                    }}
                    alt={`${teacher.role} ${teacher.id}`}
                    className="w-full h-auto aspect-square object-cover hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                </div>
                
                {/* Floating Message Bar */}
                <div className="absolute -bottom-6 left-0 right-0 flex justify-center z-10">
                  <div className="bg-white px-6 py-4 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-slate-100 flex items-center gap-4 hover:-translate-y-1 transition-transform duration-300">
                    <div className="bg-indigo-50 p-2.5 rounded-full text-indigo-600 shrink-0">
                      <GraduationCap className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider mb-0.5">{teacher.role}</p>
                      <p className="text-slate-900 font-bold whitespace-nowrap text-lg">{teacher.name}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
