import { useImage } from '../hooks/useImage';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, Star, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero({ onEnrollClick }: { onEnrollClick: () => void }) {
  const { getImage } = useImage();
  return (
    <section id="home" className="pt-20 pb-20 md:pt-24 md:pb-32 overflow-hidden bg-slate-50 relative">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-20 left-10 w-64 h-64 bg-indigo-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute top-20 right-10 w-64 h-64 bg-rose-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-64 h-64 bg-amber-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center px-4 py-1.5 bg-indigo-50 text-indigo-600 font-bold rounded-full text-sm uppercase tracking-wider border border-indigo-100 mb-6">
              <span>Future-Proof Education for Grades 3-10</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-slate-900 mt-4 leading-[1.1] mb-6">
              Good grades are important, but <span className="text-indigo-600">curiosity and innovation</span> build the future.
            </h1>
            <p className="text-lg md:text-xl text-slate-600 mb-8 leading-relaxed">
              <span className="font-black text-indigo-600 block sm:inline mr-1 underline decoration-indigo-300 decoration-3 underline-offset-4">School alone is no longer enough.</span> We at SeymoScholars bridge the gap between rigorous academic success in STEM subjects, and the absolute necessity of critical thinking, Robotics, and AI fluency in tomorrow's world. English and Economics are taught on demand.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={onEnrollClick}
                className="px-8 py-4 bg-slate-100 text-slate-700 font-bold rounded-2xl text-lg hover:bg-slate-200 transition-all flex items-center justify-center gap-2"
              >
                Secure Their Future
                <ArrowRight className="w-5 h-5" />
              </button>
              <Link 
                to="/programs/robotics-ai"
                className="px-8 py-4 bg-indigo-600 text-white font-bold rounded-2xl text-lg hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                Beyond Barriers
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-[40px] shadow-[0_20px_50px_rgba(8,_112,_184,_0.07)] border border-slate-200 bg-white p-2 md:p-3">
              <img 
                src={getImage('hero.img1', '/im1.jpg')} 
                onError={(e) => {
                  e.currentTarget.src = getImage('hero.fallback1', 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1200&h=800');
                }}
                alt="Students collaborating and learning together" 
                className="w-full h-auto rounded-[32px] object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
