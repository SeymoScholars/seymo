import { useImage } from '../hooks/useImage';
import { useState } from 'react';
import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { 
  Cpu, Zap, BrainCircuit, Lightbulb, Blocks, 
  Terminal, Users, LineChart, ShieldCheck, 
  ArrowRight, Sparkles, Code, Network, Wrench,
  Bot, Server, Rocket, ChevronDown, CheckCircle,
  Compass, Target, XCircle, Quote, Star
} from 'lucide-react';

export default function RoboticsAIPage() {
  const { getImage } = useImage();

  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [openHighlightIndex, setOpenHighlightIndex] = useState<number | null>(null);

  const toggleHighlight = (index: number) => {
    setOpenHighlightIndex(openHighlightIndex === index ? null : index);
  };

  const scrollToCurriculum = () => {
    const target = document.getElementById('curriculum');
    if (!target) return;
    const start = window.scrollY;
    const end = target.getBoundingClientRect().top + window.scrollY;
    const distance = end - start;
    const duration = 100;
    let startTime: number | null = null;
    const ease = (t: number) =>
      t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    const step = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      window.scrollTo(0, start + distance * ease(progress));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  const handleEnrollClick = () => {
    // Relying on global or passed props or an event dispatch if needed,
    // but typically we'd use a context or window event for the modal.
    // For now we'll trigger a custom event.
    window.dispatchEvent(new CustomEvent('open-enroll-modal'));
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <>
      <Helmet>
        <title>Beyond Barriers | Robotics & AI | SeymoScholars</title>
        <meta name="description" content="Discover how SeymoScholars goes Beyond Barriers to teach Robotics, AI, and Future-Ready skills." />
        <meta name="keywords" content="Robotics, Artificial Intelligence, AI, Classes 3-10, coding for kids, STEM education, offline learning, SeymoScholars, primary school robotics, middle school AI, python, scratch, IoT" />
        <meta property="og:title" content="Beyond Barriers | Robotics & AI | SeymoScholars" />
        <meta property="og:description" content="Discover how SeymoScholars goes Beyond Barriers to teach Robotics, AI, and Future-Ready skills." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://seymoscholars.com/programs/robotics-ai" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Robotics & Artificial Intelligence Program | SeymoScholars" />
        <meta name="twitter:description" content="An immersive Robotics & Artificial Intelligence journey designed for students from Classes 1–10." />
        <link rel="canonical" href="https://seymoscholars.com/programs/robotics-ai" />
        <script type="application/ld+json">
          {`{
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Robotics & Artificial Intelligence Program | SeymoScholars",
            "description": "An immersive Robotics & Artificial Intelligence journey designed for students from Classes 1–10.",
            "url": "https://seymoscholars.com/programs/robotics-ai",
            "publisher": {
              "@type": "EducationalOrganization",
              "name": "SeymoScholars"
            }
          }`}
        </script>
      </Helmet>

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden bg-slate-900 border-b border-indigo-900/50">
        <div className="absolute inset-0 z-0">
          <img 
            src={getImage('robotics.img1', 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=2000&h=1200')} 
            alt="Robotics and AI" 
            className="w-full h-full object-cover opacity-20 filter grayscale mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/95 to-slate-900/80"></div>
          
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-[100px] mix-blend-screen"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[100px] mix-blend-screen"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center text-center">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700/50 text-indigo-300 font-medium text-sm tracking-wide uppercase mb-8 backdrop-blur-sm"
          >
            <Bot className="w-5 h-5 text-indigo-400" />
            Beyond Barriers
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight tracking-tight"
          >
            Core academics provide the foundation, <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-400 to-emerald-400">
               Future Readiness builds the leader.
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-slate-300 max-w-3xl mb-12 leading-relaxed"
          >
            A premium progression of Robotics, Coding, and Artificial Intelligence that transforms students from passive tech consumers into confident creators.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <button 
              onClick={handleEnrollClick}
              className="px-8 py-4 bg-indigo-500 text-white font-bold rounded-2xl text-lg hover:bg-indigo-400 transition-all shadow-lg hover:shadow-indigo-500/25 flex items-center justify-center gap-2"
            >
              Book Free Demo Class
              <Sparkles className="w-5 h-5" />
            </button>
            <button 
              onClick={scrollToCurriculum}
              className="px-8 py-4 bg-slate-800 text-white font-bold rounded-2xl text-lg hover:bg-slate-700 border border-slate-600 transition-all flex items-center justify-center gap-2"
            >
              Explore Curriculum
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Program Specs Bar */}
      <section className="py-12 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-8 text-center">
            {[
              { value: "Limited", label: "Students per batch" },
              { value: "3 to 10", label: "Classes covered" },
              { value: "3", label: "Curriculum tracks" },
              { value: "Free", label: "Demo class to start" }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="flex flex-col items-center gap-2"
              >
                <span className="text-4xl font-black text-slate-900">{stat.value}</span>
                <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider text-center">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Parents Love This Program */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-emerald-600 font-bold uppercase tracking-wider text-sm mb-4">Trust & Reliability</h2>
            <h3 className="text-3xl md:text-4xl font-black text-slate-900 mb-6">Why Parents Love This Program</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {[
              {
                title: "A clear roadmap from Class 3 to Class 10",
                desc: "Every session connects to the next. Parents always know exactly where their child is in the program and where they are heading — no random lessons, no filler weeks."
              },
              {
                title: "Built for how children think at each age",
                desc: "A Class 2 child learns through play and physical building. A Class 9 student works with real Python and data. The curriculum shifts as the child grows — it never asks a young mind to think like an engineer prematurely."
              },
              {
                title: "School subjects become easier, not harder",
                desc: "When a student codes a motor to demonstrate Newton's laws, Physics stops being abstract. The program is mapped directly to board curriculum so every session reinforces what the school is already teaching."
              },
              {
                title: "Parents can see exactly what was built each session",
                desc: "Children do not just attend a class — they bring something home. A working circuit, a coded animation, a robot that moves. Progress is visible and tangible, not hidden inside a test score."
              },
              {
                title: "Small batches mean every child is known by name",
                desc: "A maximum of ten students per batch means the educator knows each child's pace, their sticking points, and their strengths. No child is invisible in this classroom."
              },
              {
                title: "A weekend commitment that does not disrupt school life",
                desc: "Two hours per week, scheduled on weekends or after school. Enough to build real skill over time. Not so much that it creates pressure on top of an already full school week."
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-slate-50 p-6 rounded-2xl shadow-sm border border-emerald-50 hover:border-emerald-200 hover:shadow-md transition-all">
                <div className="flex items-start gap-4">
                  <ShieldCheck className="w-6 h-6 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-slate-800 text-base mb-1">{item.title}</p>
                    <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Learning Journey */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className={`absolute inset-0 bg-[url('${getImage('robotics.bg1', 'https://images.unsplash.com/photo-1555255707-c07966088b7b?auto=format&fit=crop&q=80')}')] opacity-5 bg-cover mix-blend-overlay`}></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-indigo-400 font-bold uppercase tracking-wider text-sm mb-4">A Proven Pathway</h2>
            <h3 className="text-3xl md:text-5xl font-black text-white">The Learning Journey</h3>
          </div>

          <div className="relative">
            {/* Connecting line */}
            <div className="hidden lg:block absolute top-[60px] left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-transparent via-indigo-600 to-transparent z-0"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative z-10">
              {[
                { label: "Curiosity", icon: <Lightbulb className="w-6 h-6" /> },
                { label: "Exploration", icon: <Compass className="w-6 h-6" /> },
                { label: "Creation", icon: <Wrench className="w-6 h-6" /> },
                { label: "Innovation", icon: <Rocket className="w-6 h-6" /> },
                { label: "Real World Application", icon: <ShieldCheck className="w-6 h-6" /> }
              ].map((step, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="w-32 h-32 rounded-full border-4 border-slate-800 bg-slate-900 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(79,70,229,0.3)] relative group cursor-pointer hover:border-indigo-500 transition-colors">
                    <div className="absolute inset-0 bg-indigo-500/20 rounded-full scale-0 group-hover:scale-100 transition-transform"></div>
                    <div className="text-indigo-400 group-hover:text-white transition-colors relative z-10">
                      {step.icon}
                    </div>
                  </div>
                  <h4 className="font-black text-lg text-slate-200">{step.label}</h4>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum Pathway */}
      <section id="curriculum" className="py-24 bg-slate-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-indigo-600 font-bold uppercase tracking-wider text-sm mb-4">The Development Journey</h2>
            <h3 className="text-3xl md:text-5xl font-black text-slate-900 mb-6">From Curiosity to Leadership</h3>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">This isn't an extracurricular activity. It's a structured pathway designed to permanently elevate how your child thinks, executes, and leads.</p>
          </div>

          <div className="space-y-12">
            {/* Track 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-[40px] p-8 md:p-12 shadow-sm border border-slate-100 flex flex-col xl:flex-row gap-12 items-center"
            >
              <div className="xl:w-1/3">
                <div className="px-4 py-2 bg-rose-100 text-rose-700 font-bold text-sm uppercase tracking-wider rounded-full inline-block mb-6">Primary School</div>
                <h4 className="text-3xl font-black text-slate-900 mb-2">Classes 3–5</h4>
                <p className="text-rose-600 font-bold text-xl mb-4 italic">"Explore, Imagine, Create"</p>
                <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                  <strong>Why it matters:</strong> At this age, children view machines as magic. We demystify technology by helping them understand that computers simply follow clear, step-by-step instructions. This permanently shifts them from passive consumers to proactive thinkers.
                </p>
                <img 
                  src={getImage('robotics.img2', 'https://images.unsplash.com/photo-1596443686812-2f45229eebc3?auto=format&fit=crop&q=80&w=600&h=400')} 
                  alt="Young student exploring robotics" 
                  className="rounded-[24px] object-cover w-full h-48 md:h-64 shadow-md"
                />
              </div>
              <div className="xl:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "Machines", "Smart Machines", "Intro to Robots", 
                  "Parts of Robots", "How Robots Work", "Prediction or Decision Making", 
                  "Debugging", "Artificial vs Natural", "Introduction to Artificial Intelligence"
                ].map((topic, i) => (
                  <div key={i} className="flex items-center gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <CheckCircle className="w-5 h-5 text-rose-500 shrink-0" />
                    <span className="font-semibold text-slate-700">{topic}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Track 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-[40px] p-8 md:p-12 shadow-sm border border-slate-100 flex flex-col xl:flex-row gap-12 items-center"
            >
              <div className="xl:w-1/3 xl:order-2">
                <div className="px-4 py-2 bg-amber-100 text-amber-700 font-bold text-sm uppercase tracking-wider rounded-full inline-block mb-6">Middle School</div>
                <h4 className="text-3xl font-black text-slate-900 mb-2">Classes 6–8</h4>
                <p className="text-amber-600 font-bold text-xl mb-4 italic">"Understand, Innovate, Apply"</p>
                <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                  <strong>Why it matters:</strong> Abstract academics peak here. By applying algebra and physics to code physical sensors and motors, students gain profound conceptual clarity. They learn resilience—when code fails, they debug, rather than giving up.
                </p>
                <img 
                   src={getImage('robotics.img3', 'https://images.unsplash.com/photo-1581093588401-fbb62a02f120?auto=format&fit=crop&q=80&w=600&h=400')} 
                   alt="Middle school student building a robot" 
                   className="rounded-[24px] object-cover w-full h-48 md:h-64 shadow-md"
                />
              </div>
              <div className="xl:w-2/3 xl:order-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "Introduction to Robotics", "Step-by-Step Thinking", "Introduction to AI", "AI in Daily Life",
                  "Smart Home", "Introduction to Scratch", "Motors and Movement", "Sensors and Outputs"
                ].map((topic, i) => (
                  <div key={i} className="flex items-center gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <CheckCircle className="w-5 h-5 text-amber-500 shrink-0" />
                    <span className="font-semibold text-slate-700">{topic}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Track 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-[40px] p-8 md:p-12 shadow-sm border border-slate-100 flex flex-col xl:flex-row gap-12 items-center"
            >
              <div className="xl:w-1/3">
                <div className="px-4 py-2 bg-indigo-100 text-indigo-700 font-bold text-sm uppercase tracking-wider rounded-full inline-block mb-6">Secondary School</div>
                <h4 className="text-3xl font-black text-slate-900 mb-2">Classes 9–10</h4>
                <p className="text-indigo-600 font-bold text-xl mb-4 italic">"Analyze, Build, Lead"</p>
                <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                  <strong>Why it matters:</strong> Students face immense exam pressure. We seamlessly integrate advanced Python and ML while strengthening their board subjects. They graduate not just with high scores, but with the communicative leadership and technical depth top universities demand.
                </p>
                <img 
                   src={getImage('robotics.img4', 'https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=600&h=400')} 
                   alt="Student presenting tech project" 
                   className="rounded-[24px] object-cover w-full h-48 md:h-64 shadow-md"
                />
              </div>
              <div className="xl:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "Introduction to Robotics", "Sensors and Motors", "Introduction to IoT",
                  "Introduction to AI", "AI ethics", "Applications of AI", "Introduction to Machine Learning", "Introduction to Python Coding"
                ].map((topic, i) => (
                  <div key={i} className="flex items-center gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <CheckCircle className="w-5 h-5 text-indigo-500 shrink-0" />
                    <span className="font-semibold text-slate-700">{topic}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>



      {/* Program Highlights */}
      <section className="py-24 bg-slate-900 text-white border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-16">
            <h2 className="text-cyan-400 font-bold uppercase tracking-wider text-sm mb-4">Core Focus Areas</h2>
            <h3 className="text-3xl md:text-5xl font-black mb-6">Program Highlights</h3>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">Exposure to industry-standard toolsets and concepts, adapted for young learners. Click on any area to learn more.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            {[
              { 
                title: "Robotics", 
                subtitle: "From Curiosity to Creation",
                icon: <Bot className="w-8 h-8 text-rose-400" />,
                details: {
                  learn: "Students learn how machines sense, think, and act. They build robots, understand components, work with motors and sensors, and gradually learn how engineering solves real-world problems.",
                  matters: "Children stop becoming passive consumers of technology and begin understanding how technology is built.",
                  skills: "Problem-solving, Logical thinking, Engineering mindset, Creativity, Team collaboration.",
                  future: "The next generation will work alongside intelligent machines. Understanding robotics gives children a head start in engineering, automation, manufacturing, and emerging technologies."
                }
              },
              { 
                title: "Artificial Intelligence", 
                subtitle: "Teaching Children to Understand the Technology Shaping Tomorrow",
                icon: <BrainCircuit className="w-8 h-8 text-indigo-400" />,
                details: {
                  learn: "Students explore AI fundamentals, Machine learning concepts, AI ethics, Decision making systems, and AI in everyday life.",
                  matters: "AI is already influencing education, healthcare, finance, and communication. Children need to understand AI, not just use it.",
                  outcome: "Your child develops the ability to think critically about technology rather than simply consuming it.",
                  future: "Every industry will be impacted by AI. Early AI literacy becomes a major advantage."
                }
              },
              { 
                title: "Scratch Programming", 
                subtitle: "The First Step Into Computational Thinking",
                icon: <Code className="w-8 h-8 text-amber-400" />,
                details: {
                  learn: "Using visual block programming, students create games, stories, animations, and interactive projects.",
                  matters: "Children learn how to break big problems into smaller steps.",
                  skills: "Computational thinking, Creativity, Planning, Logic.",
                  outcome: "Students begin understanding how software is created."
                }
              },
              { 
                title: "Python Programming", 
                subtitle: "Building Real Coding Skills",
                icon: <Terminal className="w-8 h-8 text-emerald-400" />,
                details: {
                  learn: "Students transition from visual coding to real programming. Topics include variables, conditions, loops, functions, and problem solving.",
                  matters: "Python powers AI, Data Science, Automation, and Robotics.",
                  outcome: "Students learn to create real solutions rather than merely using software."
                }
              },
              { 
                title: "IoT Concepts", 
                subtitle: "Connecting the Physical and Digital Worlds",
                icon: <Network className="w-8 h-8 text-blue-400" />,
                details: {
                  learn: "Students understand how devices communicate through the internet. Examples: Smart homes, Smart cities, Connected devices.",
                  matters: "IoT is becoming a foundation of modern life.",
                  skills: "Systems thinking, Technology awareness, Innovation mindset."
                }
              },
              { 
                title: "Sensors & Motors", 
                subtitle: "Where Ideas Come to Life",
                icon: <Zap className="w-8 h-8 text-cyan-400" />,
                details: {
                  learn: "Students connect sensors, motors, and controllers to create interactive robotic systems.",
                  matters: "This is where coding meets the physical world.",
                  outcome: "Children experience the excitement of building something that actually moves and responds."
                }
              },
              { 
                title: "Project-Based Learning", 
                subtitle: "Turning Knowledge Into Innovation",
                icon: <Lightbulb className="w-8 h-8 text-yellow-400" />,
                details: {
                  learn: "Students work on Robotics projects, AI projects, Group challenges, and Presentations.",
                  matters: "Real learning happens when knowledge is applied.",
                  skills: "Confidence, Communication, Leadership, Teamwork, Innovation.",
                  outcome: "Instead of only learning concepts, children learn how to create, present, and solve problems independently."
                }
              }
            ].map((feature, idx) => {
              const isOpen = openHighlightIndex === idx;
              return (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  className={`bg-slate-800/80 rounded-3xl border ${isOpen ? 'border-indigo-500' : 'border-slate-700/50'} overflow-hidden transition-all flex flex-col`}
                >
                  <button 
                    onClick={() => toggleHighlight(idx)}
                    className="flex items-center justify-between p-6 md:p-8 text-left w-full hover:bg-slate-700/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="shrink-0 bg-slate-800 p-3 rounded-2xl">
                        {feature.icon}
                      </div>
                      <div>
                        <h4 className="font-black text-xl text-white">{feature.title}</h4>
                        <p className="text-cyan-400 text-sm font-semibold mt-1">{feature.subtitle}</p>
                      </div>
                    </div>
                    <ChevronDown className={`w-6 h-6 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {isOpen && (
                    <div className="px-6 pb-6 md:px-8 md:pb-8 pt-2 space-y-4">
                      {feature.details.learn && (
                        <div>
                          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">What Students Learn</p>
                          <p className="text-slate-300 text-sm leading-relaxed">{feature.details.learn}</p>
                        </div>
                      )}
                      {feature.details.matters && (
                        <div>
                          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Why It Matters</p>
                          <p className="text-slate-300 text-sm leading-relaxed">{feature.details.matters}</p>
                        </div>
                      )}
                      {feature.details.skills && (
                        <div>
                          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Skills Developed</p>
                          <p className="text-slate-300 text-sm leading-relaxed">{feature.details.skills}</p>
                        </div>
                      )}
                      {feature.details.outcome && (
                        <div>
                          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Outcome</p>
                          <p className="text-slate-300 text-sm leading-relaxed">{feature.details.outcome}</p>
                        </div>
                      )}
                      {feature.details.future && (
                        <div>
                          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Future Relevance</p>
                          <p className="text-slate-300 text-sm leading-relaxed">{feature.details.future}</p>
                        </div>
                      )}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>


      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-indigo-600 font-bold uppercase tracking-wider text-sm mb-4">Gallery</h2>
            <h3 className="text-3xl md:text-5xl font-black text-slate-900">Innovation In Action</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[250px]">
            <div className="col-span-1 md:col-span-2 row-span-2 relative rounded-3xl overflow-hidden group">
              <img src={getImage('robotics.img5', 'https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=formathttps://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1000&h=800fit=crophttps://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1000&h=800q=80https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1000&h=800w=1000https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1000&h=800h=800')} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Robotics Activities" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                 <span className="text-white font-bold text-xl">Robotics Activities</span>
              </div>
            </div>
            
            <div className="relative rounded-3xl overflow-hidden group">
              <img src={getImage('robotics.img6', 'https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=800&h=600')} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Classroom Learning" />
               <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                 <span className="text-white font-bold text-lg">Classroom Learning</span>
              </div>
            </div>
            
            <div className="relative rounded-3xl overflow-hidden group">
              <img src={getImage('robotics.img7', 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800&h=600')} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Team Projects" />
               <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                 <span className="text-white font-bold text-lg">Team Projects</span>
              </div>
            </div>
            
            <div className="relative rounded-3xl overflow-hidden group">
              <img src={getImage('robotics.img8', 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800&h=600')} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Presentations" />
               <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                 <span className="text-white font-bold text-lg">Presentations</span>
              </div>
            </div>
            
            <div className="col-span-1 md:col-span-2 relative rounded-3xl overflow-hidden group">
              <img src={getImage('robotics.img9', 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=1000&h=600')} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Student Innovations" />
               <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                 <span className="text-white font-bold text-xl">Student Innovations</span>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* FAQ Section */}
      <section className="py-24 bg-slate-50 border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
             <h2 className="text-indigo-600 font-bold uppercase tracking-wider text-sm mb-4">Have Questions?</h2>
             <h3 className="text-3xl md:text-5xl font-black text-slate-900">Frequently Asked Questions</h3>
          </div>
          
          <div className="space-y-4">
             {[
               { q: "How will learning AI and Robotics shape my child's future?", a: "AI and robotics are reshaping every industry. By mastering these technologies early, children shift from being passive consumers to active creators, equipping them with the problem-solving and computational thinking skills essential for future leadership." },
               { q: "What is the right age for a child to start learning AI?", a: "The best time to start is early. Our program introduces foundational AI logic starting from Grade 1, gradually scaling up to real Python and machine learning. Early exposure demystifies technology and builds natural intuition without pressure." },
               { q: "Will this program teach real-world artificial intelligence?", a: "Yes. While we start with physical robotics and visual coding to build logic, the curriculum progresses into practical machine learning, data prediction, and actual AI system architecture tailored for young minds." },
               { q: "What practical skills will they gain from building robots?", a: "Building robots provides immediate, tangible feedback. It teaches resilience in debugging, logic in programming, and an engineering mindset. Children learn that complex future problems can be mapped out and solved systematically." }
             ].map((faq, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white border text-left border-slate-200 rounded-2xl overflow-hidden shadow-sm"
                >
                  <button
                    className="w-full px-6 py-5 flex items-center justify-between focus:outline-none hover:bg-slate-50 transition-colors"
                    onClick={() => toggleFaq(i)}
                  >
                    <span className="font-bold text-slate-900 pr-8">{faq.q}</span>
                    <ChevronDown className={`w-5 h-5 text-indigo-600 transition-transform duration-300 ${openFaqIndex === i ? 'rotate-180' : ''}`} />
                  </button>
                  
                  <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openFaqIndex === i ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="p-6 bg-slate-50/50 text-slate-600 border-t border-slate-100">
                      {faq.a}
                    </div>
                  </div>
                </motion.div>
             ))}
          </div>
        </div>
      </section>

      {/* Final Conversion Section */}
      <section className="py-32 bg-indigo-600 relative overflow-hidden">
        <div className={`absolute inset-0 bg-[url('${getImage('robotics.bg2', 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80')}')] opacity-10 bg-cover mix-blend-overlay`}></div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white rounded-full blur-[120px] mix-blend-overlay opacity-20"></div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
            Give Your Child a Head Start in the World of Innovation
          </h2>
          <p className="text-xl md:text-2xl text-indigo-100 mb-12 max-w-2xl mx-auto leading-relaxed">
            Experience our Robotics & AI program through a free demo class.
          </p>
          
          <button 
            onClick={handleEnrollClick}
            className="px-10 py-5 bg-white text-indigo-600 font-black rounded-2xl text-xl md:text-2xl hover:bg-indigo-50 transition-all shadow-2xl hover:shadow-indigo-900/50 hover:-translate-y-1 inline-flex items-center justify-center gap-3 w-full sm:w-auto"
          >
            Book Free Demo Class
            <ArrowRight className="w-6 h-6" />
          </button>
          
          <div className="mt-8 flex items-center justify-center gap-6 text-indigo-200 text-sm font-semibold">
             <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" /> Limited Slots Available</div>
             <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" /> No Prior Experience Required</div>
          </div>
        </div>
      </section>
    </>
  );
}
