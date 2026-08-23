import { useImage } from '../hooks/useImage';
import { motion } from 'motion/react';
import { Smartphone, BellRing, CalendarDays, FileBadge } from 'lucide-react';

const features = [
  {
    icon: <Smartphone className="w-6 h-6 text-indigo-600" />,
    title: 'Parent App',
    description: 'Track daily attendance, view syllabus coverage, and monitor upcoming assignments.',
  },
  {
    icon: <LineChart className="w-6 h-6 text-indigo-600" />,
    title: 'Performance Reports',
    description: 'Detailed monthly analytical reports on subject-wise performance and areas of improvement.',
  },
  {
    icon: <Users className="w-6 h-6 text-indigo-600" />,
    title: 'PTM Sessions',
    description: 'Regular one-on-one Parent-Teacher Meetings to discuss holistic progress and strategies.',
  },
  {
    icon: <BellRing className="w-6 h-6 text-indigo-600" />,
    title: 'Instant Alerts',
    description: 'SMS and email notifications for test scores, absent marks, and special announcements.',
  }
];

import { LineChart, Users } from 'lucide-react';

export default function ParentCommunication({ onEnrollClick }: { onEnrollClick: () => void }) {
  const { getImage } = useImage();
  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="order-2 lg:order-1 relative">
             <div className="absolute inset-0 bg-blue-100 rounded-[40px] mix-blend-multiply filter blur-3xl transform -rotate-3 scale-105"></div>
             <motion.img 
               initial={{ opacity: 0, x: -20 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.7 }}
               src={getImage('parentComm.img1', 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1000&h=1000')}
               alt="Parent and teacher discussing student progress"
               className="relative z-10 w-full h-[600px] object-cover rounded-[40px] shadow-2xl border-8 border-white aspect-square lg:aspect-auto"
             />
             
             {/* Floating UI Card */}
             <motion.div 
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="absolute -right-4 -bottom-4 lg:-right-10 lg:bottom-10 bg-white p-6 rounded-2xl shadow-xl border border-slate-100 z-20 w-72"
             >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                    <FileBadge className="w-6 h-6" />
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-900">Math Test Score</h5>
                    <p className="text-sm font-medium text-green-600">Improved by 15%</p>
                  </div>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 mb-2">
                  <div className="bg-green-500 h-2 rounded-full w-[85%]"></div>
                </div>
                <p className="text-xs text-slate-500 text-right">Excellent progress!</p>
             </motion.div>
          </div>

          <div className="order-1 lg:order-2">
            <h2 className="px-4 py-1.5 bg-indigo-50 text-indigo-600 font-bold rounded-full text-sm uppercase tracking-wider border border-indigo-100 inline-block mb-6">Parent Partnership</h2>
            <h3 className="text-3xl md:text-4xl font-black text-slate-900 mb-6 leading-tight">
              Stay connected with your child's progress
            </h3>
            <p className="text-lg text-slate-600 mb-10 leading-relaxed">
              We believe education is a collaborative effort. We maintain complete transparency with parents regarding their child's academic journey.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
              {features.map((feature, index) => (
                <div key={index} className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex flex-col items-start hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-4 text-indigo-600 border border-slate-200">
                    {feature.icon}
                  </div>
                  <h4 className="font-bold text-slate-900 mb-2">{feature.title}</h4>
                  <p className="text-sm text-slate-600">{feature.description}</p>
                </div>
              ))}
            </div>

            <button 
              onClick={onEnrollClick}
              className="px-8 py-4 bg-slate-900 text-white font-bold rounded-2xl text-lg hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 inline-flex items-center gap-2"
            >
              Book a Demo Class
              <CalendarDays className="w-5 h-5" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
