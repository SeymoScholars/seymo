import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, User, Phone, Mail, GraduationCap, Loader2, CheckCircle2 } from 'lucide-react';

export default function EnrollModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    
    const formData = new FormData(e.currentTarget);
    formData.append('timestamp', new Date().toISOString());

    try {
      const scriptUrl = 'https://script.google.com/macros/s/AKfycbxkLRcmMTCHhgPuFYxWtvnT1efTzi9igshLaRE0svZt7ev2KS3Pp4Xm2lcCir4KbNY/exec';

      await fetch(scriptUrl, {
        method: 'POST',
        mode: 'no-cors', // no-cors is important for Google Apps Script
        body: formData
      });
      
      setStatus('success');
      setTimeout(() => {
        setStatus('idle');
        onClose();
      }, 2500);
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus('error');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg bg-white rounded-[32px] shadow-2xl overflow-hidden border border-slate-100"
          >
            <div className="p-8">
              <button
                onClick={onClose}
                className="absolute top-6 right-6 w-10 h-10 bg-slate-100 text-slate-500 rounded-full flex items-center justify-center hover:bg-slate-200 transition-colors"
                disabled={status === 'submitting'}
              >
                <X className="w-5 h-5" />
              </button>
              
              <h3 className="text-3xl font-black text-slate-900 mb-2">Book your Demo Class!</h3>
              <p className="text-slate-600 mb-8 border-b border-slate-100 pb-6">
                Enter your details and our academic counselor will get in touch with you shortly.
              </p>
              
              {status === 'success' ? (
                <div className="py-8 flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 text-green-500">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-2xl font-bold text-slate-900 mb-2">Request Submitted!</h4>
                  <p className="text-slate-600">Thank you for your interest. We'll be in touch soon.</p>
                </div>
              ) : (
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Parent's Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                      <input name="parentName" type="text" required className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all font-medium text-slate-700" placeholder="John Doe" disabled={status === 'submitting'} />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Phone Number</label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                        <input name="phone" type="tel" required className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all font-medium text-slate-700" placeholder="+91 xxxxx xxxxx" disabled={status === 'submitting'} />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Child's Grade</label>
                      <div className="relative">
                        <GraduationCap className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                        <select name="grade" required defaultValue="" className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all font-medium text-slate-700 appearance-none bg-white" disabled={status === 'submitting'}>
                          <option value="" disabled>Select Grade</option>
                          <option>Grade 3</option>
                          <option>Grade 4</option>
                          <option>Grade 5</option>
                          <option>Grade 6</option>
                          <option>Grade 7</option>
                          <option>Grade 8</option>
                          <option>Grade 9</option>
                          <option>Grade 10</option>
                          <option>Grade 11</option>
                          <option>Grade 12</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                      <input name="email" type="email" required className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all font-medium text-slate-700" placeholder="john@example.com" disabled={status === 'submitting'} />
                    </div>
                  </div>
                  
                  {status === 'error' && (
                    <div className="text-red-500 text-sm font-medium">
                      Failed to submit request. Please try again.
                    </div>
                  )}

                  <div className="pt-2">
                    <button 
                      type="submit" 
                      disabled={status === 'submitting'}
                      className="w-full py-4 bg-indigo-600 text-white font-bold rounded-xl text-lg hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200 flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {status === 'submitting' ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        'Submit Request'
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
