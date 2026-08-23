import { useImage } from '../hooks/useImage';
import { motion } from 'motion/react';
import { Target, Award, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Educators({ onEnrollClick }: { onEnrollClick: () => void }) {
  const { getImage } = useImage();
  return (
    <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
      {/* Decorative patterns */}
      <div className={`absolute inset-0 opacity-10 bg-[url('${getImage('educators.bg1', 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAzNHYtbDItMi0yaS0ydi0yaTJ2LTJsMi0ydi0ybC0yLTIiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIyIi8+PC9nPjwvc3ZnPg==')}')]`}></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="px-4 py-1.5 bg-indigo-500/20 text-indigo-300 font-bold rounded-full text-sm uppercase tracking-wider border border-indigo-400/30 inline-block mb-6">Expert Faculty</h2>
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-6 leading-tight">
              Guided by passionate subject matter experts
            </h3>
            <p className="text-lg text-slate-300 mb-8 leading-relaxed">
              Our educators are not just teachers; they are mentors dedicated to unlocking every student's potential. Led by a team with profound experience in academic excellence, including leadership by Ankan Roy (CEO).
            </p>
            
            <div className="space-y-4 mb-10">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center shrink-0">
                  <Award className="w-5 h-5 text-amber-400" />
                </div>
                <span className="font-medium text-slate-200">Rigorous Selection Process</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center shrink-0">
                  <Target className="w-5 h-5 text-emerald-400" />
                </div>
                <span className="font-medium text-slate-200">Focus on Conceptual Clarity</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center shrink-0">
                  <BookOpen className="w-5 h-5 text-blue-400" />
                </div>
                <span className="font-medium text-slate-200">Continuous Curriculum Innovation</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/about"
                className="px-8 py-4 bg-white text-slate-900 font-bold rounded-2xl text-lg hover:bg-slate-100 transition-all shadow-lg inline-flex items-center"
              >
                Learn About Our Story
              </Link>
              <button 
                onClick={onEnrollClick}
                className="px-8 py-4 bg-indigo-600 text-white font-bold rounded-2xl text-lg hover:bg-indigo-500 transition-all border border-indigo-500"
              >
                Book a Demo Class
              </button>
            </div>
          </div>

          <div className="relative">
             <div className="absolute inset-0 bg-indigo-500 rounded-[40px] mix-blend-overlay filter blur-3xl transform rotate-6 scale-90 opacity-40"></div>
             <motion.img 
               initial={{ opacity: 0, x: 20 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.7 }}
               src={getImage('educators.img1', 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=1000&h=1200')}
               alt="A passionate educator"
               className="relative z-10 w-full h-[500px] object-cover rounded-[40px] shadow-2xl border border-slate-700"
             />
          </div>
        </div>
      </div>
    </section>
  );
}
