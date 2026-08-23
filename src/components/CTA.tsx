import { useImage } from '../hooks/useImage';
import { Sparkles } from 'lucide-react';

export default function CTA({ onEnrollClick }: { onEnrollClick: () => void }) {
  const { getImage } = useImage();
  return (
    <section className="py-24 bg-indigo-600 text-white relative overflow-hidden">
      <div className={`absolute inset-0 bg-[url('${getImage('cta.bg1', 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80')}')] opacity-10 bg-cover mix-blend-overlay`}></div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-black mb-6">School alone is no longer enough.</h2>
        <p className="text-xl text-indigo-100 mb-10 leading-relaxed max-w-2xl mx-auto">
          Equip your child with the conceptual clarity, critical thinking, and advanced tech fluency they need to lead tomorrow's world. Don't let their potential wait.
        </p>
        <button 
          onClick={onEnrollClick}
          className="px-10 py-5 bg-white text-indigo-600 font-black rounded-2xl text-xl hover:bg-indigo-50 hover:scale-105 transition-all shadow-xl hover:shadow-indigo-900/20 inline-flex items-center gap-3"
        >
          Secure Their Future Today
          <Sparkles className="w-6 h-6" />
        </button>
      </div>
    </section>
  );
}
