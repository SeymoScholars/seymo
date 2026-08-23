import { motion } from 'motion/react';
import { useImage } from '../hooks/useImage';

const images = [
  {
    src: "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=800&h=600",
    alt: "Modern classroom setup with smart boards",
    span: "col-span-12 md:col-span-8 row-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80&w=800&h=600",
    alt: "Students focused during an exam preparation session",
    span: "col-span-12 md:col-span-4 row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800&h=600",
    alt: "Science lab environment",
    span: "col-span-12 md:col-span-4 row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&q=80&w=800&h=600",
    alt: "Library and reading area",
    span: "col-span-12 md:col-span-4 row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&q=80&w=800&h=600",
    alt: "Student collaborative project",
    span: "col-span-12 md:col-span-8 row-span-1",
  }
];

export default function Gallery() {
  const { getImage } = useImage();
  return (
    <section className="py-24 bg-slate-50 border-t border-slate-100 text-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto mb-16">
          <h2 className="px-4 py-1.5 bg-indigo-50 text-indigo-600 font-bold rounded-full text-sm uppercase tracking-wider border border-indigo-100 inline-block mb-4">Our Environment</h2>
          <h3 className="text-3xl md:text-4xl font-black text-slate-900 mb-6 mt-4">
            A premium space designed for focused learning
          </h3>
          <p className="text-lg text-slate-600">
            Take a look inside our modern, well-equipped learning centers that provide a safe and inspiring atmosphere for students.
          </p>
        </div>

        <div className="grid grid-cols-12 auto-rows-[250px] gap-4">
          {images.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`${image.span} rounded-2xl overflow-hidden group relative shadow-sm hover:shadow-xl transition-all`}
            >
              <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-transparent transition-colors z-10"></div>
              <img 
                src={getImage(`gallery.img${index + 1}`, image.src)} 
                alt={image.alt} 
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" 
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
