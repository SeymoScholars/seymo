import { motion } from 'motion/react';
import { Sparkles, ClipboardCheck, Lightbulb, Users, LineChart, GraduationCap } from 'lucide-react';

const steps = [
  {
    icon: <Sparkles className="w-6 h-6 text-indigo-600" />,
    title: 'Book a Demo Class',
    description: 'Experience our teaching methodology firsthand and see how your child interacts with our expert educators.',
  },
  {
    icon: <ClipboardCheck className="w-6 h-6 text-indigo-600" />,
    title: 'Assessment',
    description: 'A comprehensive evaluation to understand your child\'s current academic standing and learning style.',
  },
  {
    icon: <Lightbulb className="w-6 h-6 text-indigo-600" />,
    title: 'Program Recommendation',
    description: 'A customized concept-led learning path tailored specifically to your child\'s needs.',
  },
  {
    icon: <Users className="w-6 h-6 text-indigo-600" />,
    title: 'Regular Classes',
    description: 'Engaging, interactive offline sessions focusing on conceptual clarity rather than rote memorization.',
  },
  {
    icon: <LineChart className="w-6 h-6 text-indigo-600" />,
    title: 'Progress Monitoring',
    description: 'Continuous tracking with regular assessments and detailed feedback for steady improvement.',
  },
  {
    icon: <GraduationCap className="w-6 h-6 text-indigo-600" />,
    title: 'Academic Growth',
    description: 'Build confidence, master core subjects, and achieve outstanding results in school and board exams.',
  },
];

export default function StudentLearningJourney({ onEnrollClick }: { onEnrollClick: () => void }) {
  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="px-4 py-1.5 bg-indigo-50 text-indigo-600 font-bold rounded-full text-sm uppercase tracking-wider border border-indigo-100 inline-block mb-4">The Pathway to Success</h2>
          <h3 className="text-3xl md:text-4xl font-black text-slate-900 mb-6 mt-4">
            The Student Learning Journey
          </h3>
          <p className="text-lg text-slate-600">
            A structured, proven process designed to transform students into confident scholars.
          </p>
        </div>

        <div className="relative">
          {/* Connecting line for desktop */}
          <div className="hidden md:block absolute top-[44px] left-[44px] right-[44px] h-[2px] bg-slate-100 z-0"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative bg-white pt-8"
              >
                <div className="w-20 h-20 bg-indigo-50 border-[4px] border-white shadow-xl rounded-full flex items-center justify-center mb-6 relative z-10 mx-auto md:mx-0">
                  <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-slate-900 border-4 border-white text-white flex items-center justify-center text-xs font-bold shadow-sm">
                    {index + 1}
                  </div>
                  {step.icon}
                </div>
                <div className="text-center md:text-left">
                  <h4 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h4>
                  <p className="text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <button 
            onClick={onEnrollClick}
            className="px-8 py-4 bg-slate-900 text-white font-bold rounded-2xl text-lg hover:bg-slate-800 transition-all inline-flex items-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-1"
          >
            Start Your Child's Journey
            <Sparkles className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
