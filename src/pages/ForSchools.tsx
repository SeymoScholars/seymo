import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  Target, 
  Search, 
  Brain, 
  TrendingUp, 
  Users, 
  CheckCircle2, 
  Lightbulb, 
  Puzzle, 
  BookOpen, 
  Handshake, 
  Microscope,
  FlaskConical,
  GraduationCap,
  Award,
  Building2
} from 'lucide-react';

export default function ForSchools() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>For Schools | SeymoScholars</title>
        <meta name="description" content="Partner with Seymo Scholars to bring structured, measurable, and child-centred learning support to your school." />
      </Helmet>

      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-24 lg:py-32 bg-slate-900 overflow-hidden text-white">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-900 via-slate-900 to-slate-900 opacity-80"></div>
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="inline-block px-4 py-1.5 rounded-full text-sm font-bold mb-6 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 uppercase tracking-widest">
                  For Schools
                </div>
                <h1 className="text-5xl lg:text-6xl font-black mb-6 leading-tight">
                  A Learning Model <br/>
                  <span className="text-indigo-400">Designed with Purpose</span>
                </h1>
                <p className="text-xl text-slate-300 leading-relaxed mb-8">
                  Schools today face a growing challenge: students often progress through the curriculum without fully developing conceptual understanding, application skills, or academic confidence.
                </p>
                <p className="text-lg text-slate-400 leading-relaxed mb-10">
                  Seymo Scholars partners with schools to provide structured learning support that addresses the root causes of learning difficulties—not just their symptoms. Our programmes identify learning gaps, strengthen conceptual understanding, and build independent learners through a research-backed educational model.
                </p>
                <div className="flex flex-col sm:flex-row gap-6 mt-8">
                  <a href="mailto:support@seymoscholars.org" className="px-10 py-5 bg-orange-500 text-white font-black rounded-full hover:bg-orange-600 hover:scale-105 transition-all text-center text-lg shadow-[0_0_40px_rgba(249,115,22,0.4)]">
                    Schedule a Consultation
                  </a>
                  <a href="#how-it-works" className="px-10 py-5 bg-white/10 border-2 border-indigo-400 font-bold rounded-full hover:bg-white/20 transition-all text-center backdrop-blur-sm text-lg hover:border-indigo-300">
                    Explore Our Model
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { title: "3+ Years", desc: "In Education", icon: Award },
                  { title: "European", desc: "Educational Organisation", icon: Building2 },
                  { title: "Child-Centric", desc: "Design & Methodology", icon: Users },
                  { title: "CPP Certified", desc: "Professional Educators", icon: GraduationCap }
                ].map((stat, i) => (
                  <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-sm hover:bg-white/10 transition-colors">
                    <stat.icon className="text-indigo-400 w-10 h-10 mb-4" />
                    <div className="text-2xl font-black text-white mb-1">{stat.title}</div>
                    <div className="text-sm font-medium text-slate-400 uppercase tracking-wide">{stat.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Why Schools Partner */}
        <section id="how-it-works" className="py-24 bg-slate-50 border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl font-black text-slate-900 mb-6">Why Schools Partner with Seymo Scholars</h2>
              <p className="text-xl text-slate-600">
                We go beyond conventional remedial teaching. We provide a structured partnership that integrates seamlessly with your school's vision.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                { 
                  title: "Structured Support, Not Generic Extra Classes", 
                  desc: "Traditional remedial support often repeats classroom teaching in the same way students previously struggled to understand. At Seymo Scholars, intervention begins with diagnosis. Our targeted academic support is designed around specific learning gaps, ensuring every session addresses what a student actually needs.",
                  icon: Target,
                  color: "blue"
                },
                { 
                  title: "We Assess Before We Teach", 
                  desc: "Through our Knowledge–Understanding–Application (KUA) framework, we identify what students know, understand, and can apply independently. This allows us to create focused learning pathways that address individual and group learning needs before support begins.",
                  icon: Search,
                  color: "yellow"
                },
                { 
                  title: "We Reteach Concepts Differently, Not Repeatedly", 
                  desc: "Students do not always need more teaching—they often need clearer teaching. Using the Concrete–Pictorial–Abstract (CPA) framework integrated with activity-based learning, we transform abstract concepts into meaningful understanding. Rather than repeating information, we redesign the learning experience.",
                  icon: Brain,
                  color: "green"
                },
                { 
                  title: "Progress Is Visible, Not Assumed", 
                  desc: "Schools and families deserve evidence of growth. Our structured assessment and progress tracking systems provide transparent insight into student development over time, allowing all stakeholders to clearly see improvement and identify next steps.",
                  icon: TrendingUp,
                  color: "indigo"
                }
              ].map((feature, i) => (
                <div key={i} className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                  <div className={`w-14 h-14 bg-${feature.color}-50 text-${feature.color}-600 rounded-2xl flex items-center justify-center mb-6`}>
                    <feature.icon size={28} />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-4">{feature.title}</h3>
                  <p className="text-lg text-slate-600 leading-relaxed font-medium">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* The Seymo Learning Model */}
        <section className="py-24 bg-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-50 via-transparent to-transparent opacity-50 z-0"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl font-black text-slate-900 mb-6">The Seymo Learning Model</h2>
                <div className="inline-block px-4 py-2 rounded-xl bg-orange-100 text-orange-800 font-bold text-lg mb-8">
                  Mentors. Not Tutors.
                </div>
                <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                  Our role is not simply to help students complete work. We help students develop independent thinking, academic confidence, learning discipline, self-directed study habits, and long-term conceptual understanding.
                </p>
                <ul className="space-y-6">
                  <li className="flex gap-4">
                    <CheckCircle2 className="text-indigo-600 shrink-0 mt-1" size={24} />
                    <p className="text-lg text-slate-800 font-medium"><strong>We teach with purpose, not pace.</strong> We focus on why a student is struggling, not just how quickly content can be covered.</p>
                  </li>
                  <li className="flex gap-4">
                    <CheckCircle2 className="text-indigo-600 shrink-0 mt-1" size={24} />
                    <p className="text-lg text-slate-800 font-medium"><strong>We build understanding, not memorisation.</strong> Our approach is designed to strengthen concepts, clarity and confidence.</p>
                  </li>
                </ul>
              </div>
              <div className="bg-slate-900 rounded-3xl p-10 text-white shadow-2xl">
                <h3 className="text-2xl font-black mb-8 text-indigo-300">How Our Framework Works</h3>
                
                <div className="space-y-8">
                  <div>
                    <h4 className="text-xl font-bold mb-4 flex items-center gap-3">
                      <Search className="text-yellow-400" /> KUA Framework
                    </h4>
                    <p className="text-slate-400 mb-4 font-medium">We assess before and after every learning session to understand engagement at three critical levels:</p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <div className="bg-slate-800 p-3 rounded-lg text-center">
                        <div className="text-sm font-bold text-yellow-400 mb-1 tracking-wider">KNOW</div>
                        <div className="text-xs text-slate-300">Recall facts & concepts</div>
                      </div>
                      <div className="bg-slate-800 p-3 rounded-lg text-center">
                        <div className="text-sm font-bold text-orange-400 mb-1 tracking-wider">UNDERSTAND</div>
                        <div className="text-xs text-slate-300">Explain & connect ideas</div>
                      </div>
                      <div className="bg-slate-800 p-3 rounded-lg text-center">
                        <div className="text-sm font-bold text-green-400 mb-1 tracking-wider">APPLY</div>
                        <div className="text-xs text-slate-300">Solve independently</div>
                      </div>
                    </div>
                  </div>

                  <div className="w-full h-px bg-slate-700"></div>

                  <div>
                    <h4 className="text-xl font-bold mb-4 flex items-center gap-3">
                      <Puzzle className="text-indigo-400" /> CPA Framework
                    </h4>
                    <p className="text-slate-400 mb-4 font-medium">Integrated with activity-based learning for deep conceptual development:</p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <div className="bg-slate-800 p-3 rounded-lg text-center border-b-2 border-indigo-400">
                        <div className="text-sm font-bold text-white mb-1">CONCRETE</div>
                        <div className="text-xs text-slate-300">Hands-on materials</div>
                      </div>
                      <div className="bg-slate-800 p-3 rounded-lg text-center border-b-2 border-purple-400">
                        <div className="text-sm font-bold text-white mb-1">PICTORIAL</div>
                        <div className="text-xs text-slate-300">Visual models</div>
                      </div>
                      <div className="bg-slate-800 p-3 rounded-lg text-center border-b-2 border-pink-400">
                        <div className="text-sm font-bold text-white mb-1">ABSTRACT</div>
                        <div className="text-xs text-slate-300">Independent mastery</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Curiosity Labs - Featured Section */}
        <section className="py-24 bg-green-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-[3rem] p-8 lg:p-16 shadow-xl border border-green-100 flex flex-col lg:flex-row gap-12 items-center">
              <div className="lg:w-1/2">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-full font-bold uppercase tracking-wider text-sm mb-6">
                  <Microscope size={18} /> Flagship Addition
                </div>
                <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mb-6">Curiosity Labs</h2>
                <p className="text-2xl text-green-700 font-medium mb-6">Where Learning Comes Alive.</p>
                
                <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                  Curiosity Labs are Seymo Scholars' experiential learning environments designed to transform curiosity into understanding. These sessions extend beyond traditional academic support and encourage students to explore, investigate, create, and discover through hands-on experiences.
                </p>

                <div className="bg-green-800 text-white p-6 rounded-2xl shadow-lg relative overflow-hidden mb-8">
                  <div className="absolute right-0 bottom-0 opacity-10">
                    <FlaskConical size={120} />
                  </div>
                  <p className="text-xl font-bold font-serif italic relative z-10">
                    "Curiosity is not an extra. It is the foundation of meaningful learning."
                  </p>
                </div>

                <p className="text-slate-600 font-medium">
                  These experiences strengthen engagement, improve concept retention, and cultivate a lifelong love for learning, helping students become active participants rather than passive recipients.
                </p>
              </div>

              <div className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "Scientific thinking",
                  "Problem-solving abilities",
                  "Creativity and innovation",
                  "Observation and inquiry skills",
                  "Collaboration and communication",
                  "Real-world application of classroom concepts"
                ].map((skill, index) => (
                  <div key={index} className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex flex-col gap-3 group hover:bg-green-50 transition-colors">
                    <div className="w-8 h-8 rounded-full bg-green-200 text-green-800 flex items-center justify-center font-black group-hover:bg-green-600 group-hover:text-white transition-colors">
                      {index + 1}
                    </div>
                    <span className="font-bold text-slate-800">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Outcomes & Comparison */}
        <section className="py-24 bg-white relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl font-black text-slate-900 mb-6">Our Learning Model Is Designed to Strengthen</h2>
              <p className="text-xl text-slate-600">
                Assessment-driven intervention and activity-based instruction contribute directly to measurable educational outcomes.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4 mb-24">
              {[
                "Stronger Concept Retention",
                "Hands-On Learning",
                "Higher Engagement",
                "Independent Thinking",
                "Structured Mathematics Support",
                "Developed Scientific Thinking",
                "Coherent Literacy & Expression"
              ].map((outcome, i) => (
                <div key={i} className="px-6 py-4 rounded-2xl border-2 border-indigo-100 bg-white font-bold text-indigo-900 shadow-sm text-lg flex items-center gap-2">
                  <CheckCircle2 className="text-indigo-500" size={20} />
                  {outcome}
                </div>
              ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-8 items-stretch">
              <div className="bg-slate-50 p-10 rounded-[2rem] border border-slate-200 h-full">
                <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-6 text-slate-400 text-3xl">
                  📉
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-6 pb-6 border-b border-slate-200">Conventional Remedial Support</h3>
                <p className="text-lg text-slate-700 font-medium mb-6">More of the same teaching often leads to:</p>
                <ul className="space-y-4">
                  {[
                    "Repetition without understanding",
                    "Weak application of concepts",
                    "Reduced engagement",
                    "Limited long-term progress"
                  ].map((item, i) => (
                    <li key={i} className="flex gap-3 text-slate-600">
                      <span className="text-red-400 mt-1">✕</span> {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-indigo-600 p-10 rounded-[2rem] text-white shadow-xl h-full shadow-indigo-600/20 transform lg:-translate-y-4">
                <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mb-6 text-white text-3xl backdrop-blur-md">
                  📈
                </div>
                <h3 className="text-2xl font-black text-white mb-6 pb-6 border-b border-white/20">The Seymo Learning Model</h3>
                <ul className="space-y-5">
                  {[
                    "We assess first.",
                    "We identify learning gaps.",
                    "We reteach through clearer, more interactive learning pathways.",
                    "We measure growth continuously.",
                    "We help students build understanding that lasts."
                  ].map((item, i) => (
                    <li key={i} className="flex gap-3 text-indigo-50 text-lg font-medium">
                      <CheckCircle2 className="text-green-400 shrink-0 mt-1" size={20} /> 
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Partnership Benefits */}
        <section className="py-24 bg-slate-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-black mb-6 text-center">Partnership Benefits for Schools</h2>
            <p className="text-xl text-slate-400 text-center max-w-3xl mx-auto mb-16">
              Position Seymo Scholars as an extension of your school's commitment to student success.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                "Academic intervention programmes",
                "Structured mathematics support",
                "Learning gap identification",
                "Transparent progress reporting",
                "Parent communication support",
                "Child-centric learning experiences",
                "Enrichment through Curiosity Labs",
                "Scalable implementation within school systems"
              ].map((benefit, index) => (
                <div key={index} className="bg-slate-800 p-6 rounded-2xl border border-slate-700 flex flex-col items-center text-center gap-4 hover:border-indigo-500 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
                    <CheckCircle2 size={24} />
                  </div>
                  <span className="font-bold text-slate-200">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="consultation" className="py-24 bg-white text-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mb-8 leading-tight">
              Every Student Can Progress When Learning Is Designed Correctly
            </h2>
            <p className="text-2xl text-slate-600 mb-6 font-medium leading-relaxed">
              We identify learning gaps through comprehensive assessment and reteach through CPA and activity-based learning—making concepts clearer, more practical, and easier to apply.
            </p>
            
            <div className="bg-indigo-50 p-8 rounded-3xl border border-indigo-100 mb-12">
              <h3 className="text-xl font-bold text-indigo-900 uppercase tracking-widest mb-2">Our Mission Is Simple:</h3>
              <p className="text-2xl text-indigo-700 font-serif italic">
                "To help students understand deeply, think independently, and grow confidently."
              </p>
            </div>

            <p className="text-xl text-slate-600 mb-10 font-bold">
              Partner with Seymo Scholars to bring structured, measurable, and child-centred learning support to your school.
            </p>
            
            <a href="mailto:support@seymoscholars.org" className="inline-flex items-center gap-3 px-10 py-5 bg-[#4B6F44] text-white font-bold rounded-full text-xl hover:bg-[#385433] transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1">
              Schedule a School Consultation <Handshake size={24} />
            </a>
            
            <div className="mt-8 text-slate-500 font-medium">
              <a href="https://www.seymoscholars.org" target="_blank" rel="noreferrer" className="hover:text-indigo-600 transition-colors">
                www.seymoscholars.org
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
