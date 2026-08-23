import { useImage } from '../hooks/useImage';
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Brain, Search, Puzzle, LineChart, Target, Lightbulb, TrendingUp, BookOpen } from 'lucide-react';

export default function HowWeTeach() {
  const { getImage } = useImage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>How We Teach | SeymoScholars</title>
        <meta name="description" content="Discover the Seymo Learning Model. We identify learning gaps through KUA assessments and reteach using CPA and activity-based learning." />
      </Helmet>

      <main className="pt-20">
        <section className="py-24 bg-green-50 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-green-100 via-transparent to-transparent opacity-50"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-4xl mx-auto mb-16">
              <div className="inline-block px-4 py-1.5 rounded-full text-sm font-bold mb-6 bg-green-100 text-green-800 border border-green-200 uppercase tracking-wider">
                Our Learning Model
              </div>
              <h1 className="text-5xl lg:text-6xl font-black text-slate-900 mb-6 leading-tight">
                Designed with <span className="text-green-700">Purpose.</span>
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed">
                We identify learning gaps through comprehensive assessment, then reteach through CPA and activity-based learning—making concepts clearer, more practical, and easier to apply.
              </p>
            </div>
          </div>
        </section>

        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-stretch">
              <div className="bg-slate-50 p-10 rounded-[2rem] border border-slate-100 h-full">
                <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-6 text-slate-400">
                  <span className="text-3xl">😞</span>
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-4">Conventional Remedial Support</h3>
                <p className="text-lg text-slate-600 leading-relaxed">
                  More of the <strong className="text-slate-800">same teaching</strong> often leads to repetition, weak application, disengagement and overall limited progress.
                </p>
              </div>

              <div className="bg-green-600 p-10 rounded-[2rem] text-white shadow-xl h-full shadow-green-600/20 transform lg:-translate-y-4">
                <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mb-6 text-white backdrop-blur-md">
                  <Lightbulb size={32} />
                </div>
                <h3 className="text-2xl font-black text-white mb-4">The Seymo Learning Model</h3>
                <p className="text-lg text-green-50 leading-relaxed font-medium">
                  We assess first, identify the gap and then reteach through a clearer more interactive learning pathway.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-slate-50 border-y border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl font-black text-slate-900 mb-4">What Sets Us Apart</h2>
              <p className="text-xl text-slate-600">
                A Learning Model Designed with Purpose.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                { title: "Structured support, not generic extra classes", desc: "Targeted academic intervention designed around specific learning gaps.", icon: Target },
                { title: "We assess before we teach", desc: "KUA-based assessment helps us identify what students know, understand, and can apply before support begins.", icon: Search },
                { title: "We reteach concepts differently, not repeatedly", desc: "CPA and activity-based teaching help students learn concepts in clearer, more effective ways.", icon: Brain },
                { title: "Progress is visible, not assumed", desc: "Transparent progress tracking helps schools and parents clearly see improvement over time.", icon: TrendingUp }
              ].map((feature, i) => (
                <div key={i} className="flex gap-6 p-8 bg-white rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center shrink-0">
                    <feature.icon size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{feature.title}</h3>
                    <p className="text-slate-600">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-block px-4 py-1.5 rounded-full text-sm font-bold mb-6 bg-yellow-100 text-yellow-800 border border-yellow-200 uppercase tracking-wider">
                Premium Initiative
              </div>
              <h2 className="text-4xl font-black text-slate-900 mb-6">Academic Mentorship</h2>
              <p className="text-xl text-slate-600">
                Seymo Scholars is our premium academic mentorship initiative for students in Grades 3 - 10.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-slate-900 mb-6">Our learning model is designed to strengthen:</h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { title: "Stronger concept retention", icon: Brain },
                    { title: "Hands-On Learning", icon: Puzzle },
                    { title: "Higher Engagement", icon: Target },
                    { title: "Independent Thinking", icon: Lightbulb }
                  ].map((item, i) => (
                    <div key={i} className="flex flex-col items-center justify-center p-6 bg-slate-50 rounded-2xl border border-slate-100 text-center gap-3">
                      <item.icon size={32} className="text-indigo-600" />
                      <span className="font-bold text-slate-700">{item.title}</span>
                    </div>
                  ))}
                </div>
                
                <div className="flex flex-wrap gap-4 mt-8 pt-8 border-t border-slate-100 justify-center lg:justify-start">
                  <div className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-full font-bold">
                    <span className="text-xl">✓</span> Mentors. Not Tutors
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-full font-bold">
                    <span className="text-xl">✓</span> Progress. Measured Transparently
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="absolute left-6 top-0 bottom-0 w-1 bg-orange-200 rounded-full"></div>
                <div className="space-y-12 relative">
                  {[
                    { title: "We teach with purpose, not just pace.", desc: "We focus on why a student is struggling, not just how quickly a chapter can be completed." },
                    { title: "We build understanding, not memorisation.", desc: "Our approach is designed to strengthen concepts, clarity and confidence." },
                    { title: "We track progress, not just attendance.", desc: "Every student's growth is measured through structured assessments, observation, and targeted academic support." },
                    { title: "We guide students beyond the classroom.", desc: "We help students develop discipline, confidence, and independent learning habits—not just finish schoolwork." }
                  ].map((point, i) => (
                    <div key={i} className="flex gap-6 relative">
                      <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center shrink-0 z-10 text-white font-bold shadow-md shadow-orange-500/30 -ml-5">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-slate-900 mb-2">{point.title}</h4>
                        <p className="text-slate-600 leading-relaxed font-medium">{point.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mt-20 pt-16 border-t border-slate-100 text-center">
              <div>
                <BookOpen size={40} className="mx-auto mb-4 text-slate-900" />
                <h4 className="text-lg font-black uppercase text-slate-900">Structured</h4>
                <p className="text-slate-600">MATH Support</p>
              </div>
              <div className="md:border-l md:border-r border-slate-200">
                <Search size={40} className="mx-auto mb-4 text-slate-900" />
                <h4 className="text-lg font-black uppercase text-slate-900">Developed</h4>
                <p className="text-slate-600">Scientific Thinking</p>
              </div>
              <div>
                <Brain size={40} className="mx-auto mb-4 text-slate-900" />
                <h4 className="text-lg font-black uppercase text-slate-900">Coherent</h4>
                <p className="text-slate-600">Literacy & Expression</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-slate-50 border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-20">
              <div className="flex items-center gap-4 justify-center mb-6">
                <h2 className="text-4xl font-black text-slate-900">KUA Framework</h2>
              </div>
              <p className="text-center text-xl text-slate-600 mb-12 max-w-3xl mx-auto">
                We identify what students know, what they understand and what they can apply to assess what kind of support they need. We assess before and after each learning session.
              </p>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-yellow-50 p-8 rounded-3xl border border-yellow-100">
                  <div className="text-center mb-6">
                    <span className="inline-block w-16 h-16 bg-yellow-400 text-yellow-900 text-3xl font-black rounded-full leading-[4rem] shadow-sm">K</span>
                  </div>
                  <h3 className="text-2xl font-black text-center text-yellow-900 mb-4 uppercase tracking-wider">Know</h3>
                  <p className="text-center text-yellow-800 font-medium">Facts, terms and concepts that your child can recall.</p>
                </div>
                <div className="bg-orange-50 p-8 rounded-3xl border border-orange-100">
                  <div className="text-center mb-6">
                    <span className="inline-block w-16 h-16 bg-orange-400 text-orange-900 text-3xl font-black rounded-full leading-[4rem] shadow-sm">U</span>
                  </div>
                  <h3 className="text-2xl font-black text-center text-orange-900 mb-4 uppercase tracking-wider">Understand</h3>
                  <p className="text-center text-orange-800 font-medium">What your child can explain, interpret or reason through.</p>
                </div>
                <div className="bg-green-50 p-8 rounded-3xl border border-green-100">
                  <div className="text-center mb-6">
                    <span className="inline-block w-16 h-16 bg-green-500 text-green-950 text-3xl font-black rounded-full leading-[4rem] shadow-sm">A</span>
                  </div>
                  <h3 className="text-2xl font-black text-center text-green-900 mb-4 uppercase tracking-wider">Apply</h3>
                  <p className="text-center text-green-800 font-medium">What your child can solve, use or demonstrate independently.</p>
                </div>
              </div>
            </div>

            <div className="pt-20 border-t border-slate-100">
              <div className="flex items-center gap-4 justify-center mb-6">
                <h2 className="text-4xl font-black text-slate-900">CPA Framework</h2>
              </div>
              <p className="text-center text-xl text-slate-600 mb-12 max-w-3xl mx-auto">
                Integrated with Activity-Based Learning. We turn abstract concepts into hands-on understanding through structured, practical learning.
              </p>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100 group hover:-translate-y-1 transition-transform">
                  <div className="h-48 rounded-2xl bg-indigo-50 mb-6 overflow-hidden">
                    <img src={getImage('howWeTeach.img1', 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&q=80&w=800')} alt="Concrete Learning" className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <h3 className="text-2xl font-black text-center text-indigo-900 mb-4 uppercase tracking-widest bg-indigo-100 py-2 rounded-xl">Concrete</h3>
                  <p className="text-center text-slate-600 font-medium">Hands-on materials and real examples to introduce new concepts physically.</p>
                </div>
                <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100 group hover:-translate-y-1 transition-transform">
                  <div className="h-48 rounded-2xl bg-orange-50 mb-6 overflow-hidden">
                    <img src={getImage('howWeTeach.img2', 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&q=80&w=800')} alt="Pictorial Learning" className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <h3 className="text-2xl font-black text-center text-orange-900 mb-4 uppercase tracking-widest bg-orange-100 py-2 rounded-xl">Pictorial</h3>
                  <p className="text-center text-slate-600 font-medium">Visual models and guided representation to bridge objects to theory.</p>
                </div>
                <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100 group hover:-translate-y-1 transition-transform">
                  <div className="h-48 rounded-2xl bg-purple-50 mb-6 overflow-hidden">
                    <img src={getImage('howWeTeach.img3', 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800')} alt="Abstract Learning" className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <h3 className="text-2xl font-black text-center text-purple-900 mb-4 uppercase tracking-widest bg-purple-100 py-2 rounded-xl">Abstract</h3>
                  <p className="text-center text-slate-600 font-medium">Independent problem solving and concept application using standard symbols.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-slate-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-black mb-6">Proven Outcomes</h2>
                <div className="text-6xl font-black text-yellow-400 mb-4">
                  &gt; 56%
                </div>
                <h3 className="text-2xl font-bold mb-4">Improvement in children identified with a Maths learning gap.</h3>
                <p className="text-slate-400">
                  Illustrative outcomes based on short-cycle classroom intervention under Seymo's structured <strong>Mathematics Learning Model Program</strong>.
                </p>
                <p className="text-sm text-slate-500 mt-4 italic">
                  *Based on Nov 25 - Jan 26 results of KUA assessments of N=30 students over a 60 day Maths Intervention Program.
                </p>
              </div>
              <div className="bg-slate-800 p-8 rounded-3xl border border-slate-700">
                <div className="h-64 flex items-end gap-2 text-center pb-8 border-b-2 border-l-2 border-slate-600 px-4 relative">
                  <div className="absolute top-0 right-4 text-sm font-bold text-slate-400">60 day Maths Intervention Program</div>
                  <div className="w-1/6 bg-indigo-500/80 rounded-t-lg transition-all duration-1000" style={{ height: "20%" }}></div>
                  <div className="w-1/6 bg-indigo-500/80 rounded-t-lg transition-all duration-1000" style={{ height: "25%" }}></div>
                  <div className="w-1/6 bg-indigo-500/80 rounded-t-lg transition-all duration-1000" style={{ height: "35%" }}></div>
                  <div className="w-1/6 bg-indigo-500/80 rounded-t-lg transition-all duration-1000" style={{ height: "55%" }}></div>
                  <div className="w-1/6 bg-indigo-500/80 rounded-t-lg transition-all duration-1000" style={{ height: "70%" }}></div>
                  <div className="w-1/6 bg-indigo-400 rounded-t-lg transition-all duration-1000 relative" style={{ height: "100%" }}>
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-yellow-400 text-yellow-900 font-bold px-3 py-1 rounded-full text-sm">Target</div>
                  </div>
                  
                  <div className="absolute -bottom-6 left-4 text-sm font-bold text-slate-400">Day 1</div>
                  <div className="absolute -bottom-6 right-4 text-sm font-bold text-slate-400">Day 60</div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}
