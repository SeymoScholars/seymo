import { motion } from 'motion/react';
import { Calculator, Dna, BookA, ArrowRight, Bot, LineChart } from 'lucide-react';
import { Link } from 'react-router-dom';

const subjects = [
  {
    id: 'mathematics',
    title: 'Mathematics',
    icon: <Calculator className="w-8 h-8 text-blue-600" />,
    description: 'Beyond formulas. We teach structural logic and numerical reasoning so your child can solve unstructured real-world problems.',
    topics: ['Core Arithmetic Skills', 'Algebra & Equations', 'Geometry & Spatial Sense', 'Data Handling', 'Logical Reasoning'],
    color: 'border-slate-200 bg-white hover:border-blue-300',
    btnColor: 'text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-100',
  },
  {
    id: 'science',
    title: 'Science',
    icon: <Dna className="w-8 h-8 text-emerald-600" />,
    description: 'Beyond textbooks. We turn passive readers into active investigators, equipping them with the analytical mindset of an engineer.',
    topics: ['Physics & Mechanics', 'Chemistry Fundamentals', 'Biology & Life Sciences', 'Environmental Science'],
    color: 'border-slate-200 bg-white hover:border-emerald-300',
    btnColor: 'text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-100',
  },
  {
    id: 'english',
    title: 'English',
    icon: <BookA className="w-8 h-8 text-rose-600" />,
    description: 'Beyond grammar. We build eloquent communicators and confident leaders who can articulate complex ideas clearly.',
    topics: ['Grammar & Vocabulary', 'Creative Writing', 'Reading Comprehension', 'Spoken English'],
    color: 'border-slate-200 bg-white hover:border-rose-300',
    btnColor: 'text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-100',
  },
  {
    id: 'robotics-ai',
    title: 'Robotics & AI',
    icon: <Bot className="w-8 h-8 text-indigo-600" />,
    description: 'The foundation of tomorrow. We teach children to command technology rather than just consume it, ensuring absolute future fluency.',
    topics: ['Hands-on Robotics Projects', 'Coding and Computational Thinking', 'AI-Powered Problem Solving', 'Real-World Innovations'],
    color: 'border-slate-200 bg-white hover:border-indigo-300 ring-1 ring-indigo-50',
    btnColor: 'text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-100',
    directLink: '/programs/robotics-ai'
  },
];

export default function Subjects({ onEnrollClick }: { onEnrollClick?: () => void }) {
  return (
    <section id="subjects" className="scroll-mt-24 py-24 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="px-4 py-1.5 bg-indigo-50 text-indigo-600 font-bold rounded-full text-sm uppercase tracking-wider border border-indigo-100 inline-block mb-4">Core Pathways</h2>
            <h3 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 mt-4">
              Shaping the minds of tomorrow's innovators.
            </h3>
            <p className="text-lg text-slate-600">
              Traditional education covers the basics. We cover STEM based thinking and keep English and Economics as subjects taught on demand alongside what comes next — Robotics, AI, and the thinking skills most classrooms never get to.
            </p>
          </div>
          {onEnrollClick && (
            <button 
              onClick={onEnrollClick}
              className="px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-colors shadow-md hidden md:block"
            >
              Start the Journey
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {subjects.map((subject, index) => (
            <motion.div
              key={subject.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`p-8 rounded-[32px] border transition-all ${subject.color} group hover:shadow-xl flex flex-col h-full`}
            >
              <div className="bg-white w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                {subject.icon}
              </div>
              <h4 className="text-2xl font-black text-slate-900 mb-4">{subject.title}</h4>
              <p className="text-slate-600 mb-8 min-h-[80px]">
                {subject.description}
              </p>
              
              <ul className="space-y-3 mb-8 flex-grow">
                {subject.topics.map((topic, i) => (
                  <li key={i} className="flex items-start gap-2 text-slate-700 font-medium">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 shrink-0"></div>
                    <span className="leading-tight">{topic}</span>
                  </li>
                ))}
              </ul>

              <Link to={subject.directLink || `/subjects/${subject.id}`} className={`w-full mt-auto py-3 px-4 rounded-xl font-bold transition-colors flex items-center justify-center gap-2 ${subject.btnColor}`}>
                Explore {subject.title.split(' ')[0]} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          ))}
        </div>
        
        {onEnrollClick && (
          <div className="mt-12 text-center md:hidden">
            <button 
              onClick={onEnrollClick}
              className="px-8 py-4 bg-indigo-600 text-white font-bold rounded-2xl text-lg hover:bg-indigo-700 transition-colors shadow-md w-full"
            >
              Book a Demo Class
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
