import { useImage } from '../hooks/useImage';
import { motion } from 'motion/react';
import { Presentation, MessageCircleQuestion, Puzzle, CheckCircle } from 'lucide-react';

const methods = [
  {
    icon: <Presentation className="w-6 h-6 text-blue-600" />,
    title: 'Interactive Conceptual Delivery',
    description: 'Concepts are introduced using real-world examples, visual aids, and interactive digital boards to ensure fundamental understanding.',
    theme: 'bg-blue-50 border-blue-100',
  },
  {
    icon: <MessageCircleQuestion className="w-6 h-6 text-rose-600" />,
    title: 'Active Doubt Resolution',
    description: 'Students are encouraged to ask questions immediately. Small batch sizes ensure no student is left behind.',
    theme: 'bg-rose-50 border-rose-100',
  },
  {
    icon: <Puzzle className="w-6 h-6 text-amber-600" />,
    title: 'Hands-on Practice',
    description: 'Supervised problem-solving sessions where educators guide students through application of learned concepts.',
    theme: 'bg-amber-50 border-amber-100',
  },
  {
    icon: <CheckCircle className="w-6 h-6 text-emerald-600" />,
    title: 'Formative Assessment',
    description: 'End-of-class pop quizzes to test immediate retention and identify areas needing revision in the next class.',
    theme: 'bg-emerald-50 border-emerald-100',
  },
];

export default function HowItWorks({ onEnrollClick }: { onEnrollClick: () => void }) {
  const { getImage } = useImage();
  return (
    <section className="py-24 bg-slate-50 relative border-t border-slate-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="px-4 py-1.5 bg-indigo-50 text-indigo-600 font-bold rounded-full text-sm uppercase tracking-wider border border-indigo-100 inline-block mb-6">Our Methodology</h2>
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 mb-6 leading-tight">
              Inside a SeymoScholars Classroom
            </h3>
            <p className="text-lg text-slate-600 mb-10 leading-relaxed">
              We believe that true learning happens when students are engaged, curious, and confident. Our physical classrooms are designed to foster interaction, peer learning, and deep conceptual thinking.
            </p>
            
            <div className="space-y-6">
              {methods.map((method, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`flex gap-4 p-5 rounded-2xl border ${method.theme}`}
                >
                  <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center shrink-0">
                    {method.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">{method.title}</h4>
                    <p className="text-slate-600 text-sm leading-relaxed">{method.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-12">
              <button 
                onClick={onEnrollClick}
                className="px-8 py-4 bg-indigo-600 text-white font-bold rounded-2xl text-lg hover:bg-indigo-700 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
              >
                Book a Demo Class
              </button>
            </div>
          </div>

          <div className="relative">
             <div className="absolute inset-0 bg-indigo-200/40 rounded-[40px] mix-blend-multiply filter blur-3xl transform rotate-6 scale-105"></div>
             <motion.img 
               initial={{ opacity: 0, scale: 0.95 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 0.7 }}
               src={getImage('howItWorks.img1', 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=1000&h=1200')}
               alt="Students engaged in a classroom"
               className="relative z-10 w-full h-[600px] object-cover rounded-[40px] shadow-2xl border-8 border-white"
             />
          </div>
        </div>
      </div>
    </section>
  );
}
