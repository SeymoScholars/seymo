import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, CheckCircle2, Sparkles, Microscope, BookOpen, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useImage } from '../hooks/useImage';

const gradeLevels = [
  {
    id: '3-5',
    range: 'Grades 3-5',
    title: 'Explore, Imagine, Create',
    description: 'Transforming natural curiosity into structured observation. We introduce the syntax of mathematics, the wonders of science, and the absolute basics of building algorithms and physical robots.',
    features: ['Interactive Reading & Vocabulary', 'Mental Math & Logical Puzzles', 'Understanding Machines & Sensors', 'First Steps in Robot Assembly', 'Includes SOF Olympiad syllabus coverage'],
    icon: <Sparkles className="w-6 h-6" />,
    image: '/im2.jpg',
    fallback: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=800&h=600'
  },
  {
    id: '6-8',
    range: 'Grades 6-8',
    title: 'Understand, Innovate, Apply',
    description: 'Bridging concrete arithmetic to abstract algebra, and passive screen time to active coding. Middle school is where students learn to command machines logically using Scratch and real-world sensors.',
    features: ['Pre-Algebra & Investigative Science', 'Complex Grammar & Communication', 'Scratch Coding & Algorithmic Logic', 'Building Smart Home Prototypes', 'Includes SOF Olympiad syllabus coverage'],
    icon: <Microscope className="w-6 h-6" />,
    image: '/im3.jpg',
    fallback: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800&h=600'
  },
  {
    id: '9-10',
    range: 'Grades 9-10',
    title: 'Analyze, Build, Lead',
    description: 'Balancing rigorous CBSE/ICSE board exam preparation with advanced technological fluency. Students master core syllabus while coding in Python and building machine learning models.',
    features: ['Board Exam Simulators & Strategy', 'Advanced Math & Physics Applications', 'Python Programming & IoT Projects', 'Includes SOF Olympiad syllabus coverage'],
    icon: <BookOpen className="w-6 h-6" />,
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800&h=600'
  }
];

export default function Grades({ onEnrollClick }: { onEnrollClick?: () => void }) {
  const [activeTab, setActiveTab] = useState(0);
  const { getImage } = useImage();

  return (
    <section id="grades" className="scroll-mt-24 py-24 relative bg-slate-50 border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="px-4 py-1.5 bg-indigo-50 text-indigo-600 font-bold rounded-full text-sm uppercase tracking-wider border border-indigo-100 inline-block mb-4">Developmental Pathway</h2>
          <h3 className="text-3xl md:text-4xl font-black text-slate-900 mb-6 mt-4">
            A framework for future readiness.
          </h3>
          <p className="text-lg text-slate-600">
            Our curriculum isn't just about passing the next test. It's a carefully calibrated journey designed to build unstoppable confidence year after year.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start mb-16">
          {/* Tabs Sidebar */}
          <div className="w-full lg:w-1/3 space-y-4">
            {gradeLevels.map((grade, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`w-full text-left p-6 rounded-[24px] border-2 transition-all flex items-center gap-4 ${
                  activeTab === index 
                    ? 'border-indigo-600 bg-white shadow-xl shadow-indigo-100/50 scale-[1.02]' 
                    : 'border-slate-200 hover:border-indigo-300 bg-white hover:bg-slate-50'
                }`}
              >
                <div className={`p-3 rounded-2xl transition-colors ${
                  activeTab === index ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-500'
                }`}>
                  {grade.icon}
                </div>
                <div>
                  <div className={`font-black text-lg transition-colors ${activeTab === index ? 'text-indigo-900' : 'text-slate-700'}`}>
                    {grade.range}
                  </div>
                  <div className={`text-sm font-medium transition-colors ${activeTab === index ? 'text-indigo-600' : 'text-slate-500'}`}>
                    {grade.title}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Tab Content Panel */}
          <div className="w-full lg:w-2/3">
            <div className="bg-white rounded-[40px] p-6 md:p-10 border border-slate-100 shadow-sm relative overflow-hidden min-h-[500px] flex">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="w-full relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
                >
                  <div className="order-2 md:order-1">
                    <div className="inline-block px-4 py-1.5 rounded-full text-sm font-bold mb-6 bg-yellow-100 text-yellow-800 border border-yellow-200">
                      {gradeLevels[activeTab].title}
                    </div>
                    <h4 className="text-3xl font-black mb-4 text-slate-900">{gradeLevels[activeTab].range}</h4>
                    <p className="mb-8 leading-relaxed text-slate-600">
                      {gradeLevels[activeTab].description}
                    </p>
                    <ul className="space-y-4">
                      {gradeLevels[activeTab].features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5 text-indigo-500" />
                          <span className="text-slate-700 font-medium">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="order-1 md:order-2 relative rounded-[32px] overflow-hidden shadow-xl aspect-square md:aspect-auto md:h-full min-h-[300px]">
                    <img 
                      src={getImage(`grades.img${activeTab + 1}`, gradeLevels[activeTab].image)} 
                      onError={(e) => {
                        if (gradeLevels[activeTab].fallback) {
                          e.currentTarget.src = getImage(`grades.fallback${activeTab + 1}`, gradeLevels[activeTab].fallback as string);
                        }
                      }}
                      alt={gradeLevels[activeTab].title}
                      className="absolute inset-0 w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
        
        {onEnrollClick && (
          <div className="text-center">
            <button 
              onClick={onEnrollClick}
              className="px-8 py-4 bg-slate-900 text-white font-bold rounded-2xl text-lg hover:bg-slate-800 transition-all shadow-lg hover:-translate-y-1 inline-flex items-center gap-2"
            >
              Book a Demo Class
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
