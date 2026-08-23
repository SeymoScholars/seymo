import { motion } from 'motion/react';
import { Star, Quote } from 'lucide-react';
import { useImage } from '../hooks/useImage';

const testimonials = [
  {
    name: 'Priyanka Das',
    role: 'Parent of 8th Grade student',
    content: 'We noticed our son struggling not with the subjects, but with the rote method of his school. Since joining SeymoScholars, he actually understands the "why" behind the physics. He is building real projects and talking about logic flows at the dinner table. Incredible transformation.',
    rating: 5,
  },
  {
    name: 'Rahuljit Sen',
    role: 'Parent of 6th Grade student',
    content: 'The robotics module changed everything. It took my daughter from being intimidated by math to applying it practically to make her robot move. It bridged the textbook to the real world, and her confidence has never been higher.',
    rating: 5,
  },
  {
    name: 'Aman Singh',
    role: 'Parent of 9th Grade student',
    content: 'School alone was no longer enough. The board exam pressure was killing his creativity. SeymoScholars somehow manages to balance rigorous CBSE preparation with future-ready AI literacy. It is exactly the holistic environment we were searching for.',
    rating: 5,
  },
];

export default function Testimonials() {
  const { getImage } = useImage();
  return (
    <section id="testimonials" className="scroll-mt-24 py-24 bg-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-50/50 via-transparent to-transparent opacity-50"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="px-4 py-1.5 bg-indigo-50 text-indigo-600 font-bold rounded-full text-sm uppercase tracking-wider border border-indigo-100 inline-block mb-4">Parent Perspectives</h2>
          <h3 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 mt-4">
            Hear from parents who chose more.
          </h3>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Discover how shifting the focus from rote memorization to practical innovation is transforming students' academic confidence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => {
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="bg-slate-50 p-10 rounded-[40px] shadow-sm hover:shadow-2xl border border-slate-100 relative transition-all group hover:-translate-y-2 flex flex-col"
              >
                <Quote className="absolute top-10 right-10 w-16 h-16 text-indigo-100/50 group-hover:text-indigo-100 transition-colors" />
                
                <div className="flex gap-1 mb-8 relative z-10">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                
                <p className="text-slate-700 text-lg mb-10 relative z-10 leading-relaxed italic flex-grow">
                  "{testimonial.content}"
                </p>
                
                <div className="flex flex-col mt-auto pt-6 border-t border-slate-200">
                  <p className="font-extrabold text-slate-900">- {testimonial.name}({testimonial.role})</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
