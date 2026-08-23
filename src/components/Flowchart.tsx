import { motion } from 'motion/react';
import { 
  BookX, XCircle, Users, BookOpen, AlertTriangle,
  ArrowRight,
  FlaskConical, Lightbulb, UserCheck, Bot, Sparkles, CheckCircle2
} from 'lucide-react';

const differences = [
  {
    title: "Learning Method",
    traditional: { icon: <BookX className="w-5 h-5 text-rose-500" />, text: "Passive Lectures", desc: "Your child sits and listens, expected to blindly absorb information without truly engaging." },
    seymo: { icon: <FlaskConical className="w-5 h-5 text-[#4B6F44]" />, text: "Hands-on Learning", desc: "At SeymoScholars, your child builds, experiments, and owns every single lesson." }
  },
  {
    title: "Focus Area",
    traditional: { icon: <XCircle className="w-5 h-5 text-rose-500" />, text: "Rote Memorization", desc: "Your child is being trained to pass a test rather than think independently." },
    seymo: { icon: <Lightbulb className="w-5 h-5 text-[#4B6F44]" />, text: "Conceptual Clarity", desc: "We make sure your child truly understands instead of just remembering until exam day." }
  },
  {
    title: "Pacing & Attention",
    traditional: { icon: <Users className="w-5 h-5 text-rose-500" />, text: "Standardized Curriculum", desc: "In a class of 40, your child's unique pace and high potential goes completely unnoticed." },
    seymo: { icon: <UserCheck className="w-5 h-5 text-[#4B6F44]" />, text: "Personalized Path", desc: "Every child learns differently, and we make sure yours is never left behind." }
  },
  {
    title: "Tools & Resources",
    traditional: { icon: <BookOpen className="w-5 h-5 text-rose-500" />, text: "Static Textbooks", desc: "Your child is preparing for tomorrow's challenges using yesterday's outdated tools." },
    seymo: { icon: <Bot className="w-5 h-5 text-[#4B6F44]" />, text: "Modern Tech Integration", desc: "Robotics, AI, and smart tools that speak your child's language and secure their future success." }
  },
  {
    title: "Mindset",
    traditional: { icon: <AlertTriangle className="w-5 h-5 text-rose-500" />, text: "Fear of Failure", desc: "When mistakes are punished, curiosity dies along with your child's self-confidence." },
    seymo: { icon: <Sparkles className="w-5 h-5 text-[#4B6F44]" />, text: "Confidence to Innovate", desc: "We teach your child that every mistake is just the first step to something truly brilliant." }
  }
];

export default function Flowchart({ onEnrollClick }: { onEnrollClick?: () => void }) {
  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 blur-[100px] rounded-full mix-blend-multiply"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/10 blur-[100px] rounded-full mix-blend-multiply"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-indigo-600 font-bold uppercase tracking-wider text-sm mb-4">The SeymoScholars Difference</h2>
          <h3 className="text-3xl md:text-5xl font-black text-slate-900 mb-6">Why We Are Different</h3>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Traditional schooling leaves gaps in conceptual understanding. Here is how we bridge them and prepare your child for the future.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Header Row */}
          <div className="hidden md:grid grid-cols-[1fr_auto_1fr] gap-8 mb-8 items-center text-center">
            <h4 className="text-2xl font-bold border border-slate-200 text-slate-500 bg-white shadow-sm py-4 rounded-2xl">Traditional Education</h4>
            <div className="w-12"></div>
            <h4 className="text-2xl font-bold bg-[#4B6F44] text-white shadow-lg py-4 rounded-2xl">SeymoScholars</h4>
          </div>

          <div className="space-y-8 relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute left-1/2 top-4 bottom-4 w-[2px] bg-[#a3b39d] -translate-x-1/2 z-0"></div>

            {differences.map((diff, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative z-10"
              >
                {/* Mobile Label */}
                <div className="md:hidden text-center mb-4 font-bold text-emerald-700 uppercase tracking-wider text-sm">{diff.title}</div>
                
                <div className="group flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 md:gap-12 transition-all">
                  
                  {/* Traditional Side */}
                  <div className="flex-1 w-full md:w-auto text-left md:text-right p-6 rounded-3xl bg-white shadow-sm border border-slate-100 group-hover:shadow-lg group-hover:border-slate-300 transition-all">
                    <div className="flex flex-row md:flex-row-reverse items-center gap-3 mb-2">
                       <div className="p-2 bg-white rounded-full shadow-sm border border-slate-100">
                         {diff.traditional.icon}
                       </div>
                       <h5 className="font-bold text-slate-800 text-lg md:text-xl">{diff.traditional.text}</h5>
                    </div>
                    <p className="text-slate-500 text-sm md:text-base leading-relaxed md:pr-14">{diff.traditional.desc}</p>
                  </div>

                  {/* Divider / Arrow */}
                  <div className="flex shrink-0 items-center justify-center w-14 h-14 rounded-full bg-[#eef1e6] border-[4px] border-slate-50 z-10 shadow-sm relative">
                     <span className="hidden md:block absolute right-full top-1/2 -translate-y-1/2 w-12 border-t-[3px] border-dotted border-[#a3b39d]"></span>
                     <ArrowRight className="w-6 h-6 text-[#86997d] rotate-90 md:rotate-0" />
                     <span className="hidden md:block absolute left-full top-1/2 -translate-y-1/2 w-12 border-t-[3px] border-dotted border-[#a3b39d]"></span>
                  </div>

                  {/* Seymo Side */}
                  <div className="flex-1 w-full md:w-auto text-left p-6 rounded-3xl bg-[#4B6F44] shadow-sm border border-[#4B6F44] group-hover:shadow-lg transition-all">
                    <div className="flex items-center gap-3 mb-2">
                       <div className="p-2 bg-white rounded-full shadow-sm">
                         {diff.seymo.icon}
                       </div>
                       <h5 className="font-bold text-white text-lg md:text-xl">{diff.seymo.text}</h5>
                    </div>
                    <p className="text-white/90 text-sm md:text-base leading-relaxed pl-14 md:pl-0">{diff.seymo.desc}</p>
                  </div>
                  
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Bottom badge */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-12 flex justify-center"
          >
            <button onClick={onEnrollClick} className="inline-flex items-center gap-3 bg-white hover:bg-slate-50 cursor-pointer px-8 py-4 rounded-full shadow-lg border border-indigo-100 hover:shadow-indigo-500/25 transition-all">
              <CheckCircle2 className="w-6 h-6 text-indigo-600" />
              <span className="font-bold text-indigo-900 text-lg">Experience the difference with a free trial class</span>
            </button>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
