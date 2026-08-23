import { motion } from 'motion/react';
import { BookOpenCheck, Brain, Target, Users, MonitorPlay, Award } from 'lucide-react';

const features = [
  {
    icon: <Users className="w-6 h-6 text-white" />,
    title: 'Expert Educators',
    description: 'Learn from Indias top teachers who make complex concepts simple and engaging.',
    containerClass: 'bg-blue-50 border border-blue-100',
    iconClass: 'bg-blue-500',
    titleClass: 'text-blue-900',
    descClass: 'text-blue-800/70',
  },
  {
    icon: <MonitorPlay className="w-6 h-6 text-white" />,
    title: 'Interactive Classes',
    description: 'Live interactive sessions with real-time doubt clearing and engaging visual aids.',
    containerClass: 'bg-indigo-50 border border-indigo-100',
    iconClass: 'bg-indigo-500',
    titleClass: 'text-indigo-900',
    descClass: 'text-indigo-800/70',
  },
  {
    icon: <Target className="w-6 h-6 text-white" />,
    title: 'Personalized Path',
    description: 'Adaptive learning algorithms that adjust to your childs unique learning pace.',
    containerClass: 'bg-rose-50 border border-rose-100',
    iconClass: 'bg-rose-500',
    titleClass: 'text-rose-900',
    descClass: 'text-rose-800/70',
  },
  {
    icon: <Brain className="w-6 h-6 text-white" />,
    title: 'Conceptual Clarity',
    description: 'Focus on understanding the "why" and "how" behind concepts, not just memorization.',
    containerClass: 'bg-amber-50 border border-amber-100',
    iconClass: 'bg-amber-500',
    titleClass: 'text-amber-900',
    descClass: 'text-amber-800/70',
  },
  {
    icon: <BookOpenCheck className="w-6 h-6 text-white" />,
    title: 'Comprehensive Notes',
    description: 'Detailed study materials, cheat sheets, and extensive question banks for revision.',
    containerClass: 'bg-emerald-50 border border-emerald-100',
    iconClass: 'bg-emerald-500',
    titleClass: 'text-emerald-900',
    descClass: 'text-emerald-800/70',
  },
  {
    icon: <Award className="w-6 h-6 text-white" />,
    title: 'Regular Assessments',
    description: 'Weekly mock tests and performance analytics to track and improve progress.',
    containerClass: 'bg-purple-50 border border-purple-100',
    iconClass: 'bg-purple-500',
    titleClass: 'text-purple-900',
    descClass: 'text-purple-800/70',
  },
];

export default function Features({ onEnrollClick }: { onEnrollClick?: () => void }) {
  return (
    <section id="features" className="py-24 bg-white relative border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="px-4 py-1.5 bg-indigo-50 text-indigo-600 font-bold rounded-full text-sm uppercase tracking-wider border border-indigo-100 inline-block mb-4">Why Parents Choose Us</h2>
          <h3 className="text-3xl md:text-4xl font-black text-slate-900 mb-6 mt-4">
            The best environment for your child to learn and grow
          </h3>
          <p className="text-lg text-slate-600 leading-relaxed">
            We provide a holistic learning experience that goes beyond textbooks, preparing students for real-world challenges alongside academic excellence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`p-8 rounded-[32px] flex flex-col gap-4 hover:shadow-xl transition-all group ${feature.containerClass}`}
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform ${feature.iconClass}`}>
                {feature.icon}
              </div>
              <h4 className={`text-xl font-extrabold ${feature.titleClass}`}>{feature.title}</h4>
              <p className={`text-base leading-relaxed ${feature.descClass}`}>
                {feature.description}
              </p>
            </motion.div>
          ))}
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
