import { motion } from 'motion/react';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: "What is SeymoScholars and how is it different from normal tuitions?",
    answer: "SeymoScholars is a premium future-readiness school, not a standard rote-memorization coaching center. While traditional tuitions rely on passive lectures and memorizing rules, our state-of-the-art interactive curriculum uses hands-on labs, tangible physical models, and active discovery. We ensure your child builds real conceptual conviction and creative confidence across Mathematics, Science, English, Robotics, and AI."
  },
  {
    question: "How do you teach advanced topics like Robotics and AI to school children?",
    answer: "We make technology highly intuitive and experiential. Instead of abstract code syntax on screens, younger students (Grades 3-5) interact with visual logic programs, smart bricks, and sensory engineering models. Middle and secondary students (Grades 6-10) build full-scale robots, program sensor feedback loops, and implement machine learning basics—transforming them from passive technology consumers into active creators."
  },
  {
    question: "Does SeymoScholars cover the school board syllabus?",
    answer: "Yes, absolutely. Our fundamental concepts are aligned with the CBSE, ICSE, and international school boards. However, we take it a step further. Traditional classrooms cover the theory; we cover what comes next. By applying scientific principles and mathematical logic directly to robotics, AI, and experimental design, students understand the 'why' behind the curriculum, which naturally leads to stronger board exam results."
  },
  {
    question: "My child is already busy with school. Will this be too overwhelming?",
    answer: "Not at all. Our programs are designed to spark curiosity and joy, making them the favorite hours of your child's week. By shifting from stressful rote learning to engaging, hands-on discovery, we relieve academic pressure rather than adding to it. Your child will find that their newfound conceptual strength makes schoolwork easier and faster to complete."
  },
  {
    question: "How does SeymoScholars prepare students for competitive platforms like the SOF Olympiad?",
    answer: "Our syllabus includes rigorous, embedded guidance and coaching for prestigious competitive benchmarks like the SOF National Science Olympiad (NSO), International Mathematics Olympiad (IMO), and International English Olympiad (IEO). By reinforcing deep logical reasoning and lateral thinking rather than simple fact-recall, we equip students with the high-level cognitive skills needed to excel globally."
  }
];

export default function FAQ({ onEnrollClick }: { onEnrollClick: () => void }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="px-4 py-1.5 bg-indigo-50 text-indigo-600 font-bold rounded-full text-sm uppercase tracking-wider border border-indigo-100 inline-block mb-4">Common Questions</h2>
          <h3 className="text-3xl md:text-4xl font-black text-slate-900 mb-6 mt-4">
            Frequently Asked Questions
          </h3>
        </div>

        <div className="space-y-4 mb-12">
          {faqs.map((faq, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="border border-slate-200 rounded-2xl overflow-hidden"
            >
              <button
                className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none bg-slate-50 hover:bg-indigo-50 transition-colors"
                onClick={() => toggle(index)}
              >
                <span className="font-bold text-slate-900 pr-8">{faq.question}</span>
                <ChevronDown className={`w-5 h-5 text-indigo-600 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`} />
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <div className="p-6 bg-white text-slate-600 border-t border-slate-100">
                  {faq.answer}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center p-8 bg-slate-50 rounded-3xl border border-slate-100">
          <h4 className="font-bold text-xl text-slate-900 mb-2">Ready to prepare your child for the future?</h4>
          <p className="text-slate-600 mb-6">Let's discuss how our programs can transform their academic journey.</p>
          <button 
            onClick={onEnrollClick}
            className="px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-colors shadow-md"
          >
            Start Your Child's Journey
          </button>
        </div>
      </div>
    </section>
  );
}
