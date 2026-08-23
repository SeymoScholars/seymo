import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';

export default function Navbar({ onEnrollClick }: { onEnrollClick: () => void }) {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    if (location.pathname !== '/') {
      setActiveSection('');
      return;
    }

    const handleScroll = () => {
      const subjects = document.getElementById('subjects');
      const grades = document.getElementById('grades');
      const testimonials = document.getElementById('testimonials');
      
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      let currentSection = '';

      if (testimonials && testimonials.offsetTop <= scrollPosition) {
        currentSection = ''; // Back to Home highlight
      } else if (grades && grades.offsetTop <= scrollPosition) {
        currentSection = '#grades';
      } else if (subjects && subjects.offsetTop <= scrollPosition) {
        currentSection = '#subjects';
      }

      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    setTimeout(handleScroll, 100);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const links = [
    { title: 'Home', path: '/' },
    { title: 'Subjects', path: '/#subjects' },
    { title: 'Grades', path: '/#grades' },
    { title: 'Beyond Barriers', path: '/programs/robotics-ai' },
    { title: 'About Us', path: '/about' },
    { title: 'Blog', path: '/blog' },
    { title: 'How We Teach', path: '/how-we-teach' },
    { title: 'For Schools', path: '/for-schools' }
  ];

  const isActive = (path: string) => {
    if (path.includes('#')) {
      const hash = path.substring(path.indexOf('#'));
      if (location.pathname === '/') {
        if (activeSection === hash) return true;
        if (!activeSection && location.hash === hash) return true;
        return false;
      }
      return false;
    }
    if (path === '/') {
      return location.pathname === '/' && activeSection === '';
    }
    return location.pathname === path;
  };

  const closeMenu = () => setIsMenuOpen(false);

  // Helper for hash routing
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    closeMenu();
    if (path.startsWith('/#') && location.pathname === '/') {
      e.preventDefault();
      const hash = path.substring(2); // remove '/#'
      const element = document.getElementById(hash);
      if (element) {
        window.history.pushState(null, '', `/#${hash}`);
        element.scrollIntoView({ behavior: 'smooth' });
        setActiveSection(`#${hash}`);
      }
    } else if (path === '/' && location.pathname === '/') {
      e.preventDefault();
      window.history.pushState(null, '', '/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setActiveSection('');
    }
  };

  return (
    <>
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <Link to="/" className="flex items-center shrink-0 mt-1.5 sm:mt-2" onClick={closeMenu}>
              <Logo className="w-32 sm:w-44 h-auto" />
            </Link>

            <div className="hidden lg:flex flex-1 items-center justify-evenly px-4 lg:px-8 xl:px-12">
              {links.map((link) => {
                const active = isActive(link.path);
                
                if (link.title === 'For Schools') {
                  return (
                    <Link
                      key={link.title}
                      to={link.path}
                      onClick={(e) => handleNavClick(e, link.path)}
                      className={`px-3 py-1.5 rounded border transition-all text-sm font-bold bg-[#4B6F44] text-white hover:bg-[#385433] ${active ? 'shadow-[0_0_12px_rgba(75,111,68,0.5)] border-[#385433]' : 'border-[#4B6F44]'}`}
                    >
                      {link.title}
                    </Link>
                  );
                }
                if (link.title === 'Beyond Barriers') {
                  return (
                    <Link
                      key={link.title}
                      to={link.path}
                      onClick={(e) => handleNavClick(e, link.path)}
                      className={`px-3 py-1.5 rounded border transition-all text-sm font-bold bg-blue-900 text-white hover:bg-blue-800 ${active ? 'shadow-[0_0_12px_rgba(30,58,138,0.5)] border-blue-500' : 'border-blue-900'}`}
                    >
                      {link.title}
                    </Link>
                  );
                }

                return (
                  <Link
                    key={link.title}
                    to={link.path}
                    onClick={(e) => handleNavClick(e, link.path)}
                    className={`px-3 py-1.5 rounded-full transition-all text-sm font-bold ${active ? 'bg-indigo-50 text-indigo-700 shadow-[0_0_12px_rgba(79,70,229,0.4)] border border-indigo-200' : 'text-slate-600 hover:text-indigo-600 hover:bg-slate-50'}`}
                  >
                    {link.title}
                  </Link>
                );
              })}
            </div>

            <div className="flex items-center gap-4">
              <button 
                onClick={onEnrollClick} 
                className="px-5 py-2 sm:px-6 sm:py-2.5 bg-[#4B6F44] text-white text-sm sm:text-base font-bold rounded-full hover:bg-[#385433] transition-colors shrink-0"
              >
                Enroll Now
              </button>
              
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 lg:hidden text-slate-600 hover:text-indigo-600 hover:bg-slate-50 rounded-full transition-colors focus:outline-none"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Full Screen Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="fixed inset-0 z-40 lg:hidden bg-white pt-20 flex flex-col"
          >
            <div className="flex-1 overflow-y-auto px-6 py-8">
              <div className="max-w-7xl mx-auto flex flex-col gap-6">
                {links.map((link, index) => {
                  const active = isActive(link.path);
                  
                  if (link.title === 'For Schools') {
                    return (
                      <motion.div
                        key={link.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 + 0.1 }}
                      >
                        <Link
                          to={link.path}
                          onClick={(e) => handleNavClick(e, link.path)}
                          className={`block w-full sm:w-max text-center sm:text-left px-6 py-4 rounded-2xl transition-all border font-bold text-xl sm:text-2xl bg-[#4B6F44] text-white hover:bg-[#385433] ${active ? 'shadow-[0_0_20px_rgba(4,120,87,0.5)] border-emerald-400' : 'border-emerald-700'}`}
                        >
                          {link.title}
                        </Link>
                      </motion.div>
                    );
                  }
                  if (link.title === 'Beyond Barriers') {
                    return (
                      <motion.div
                        key={link.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 + 0.1 }}
                      >
                        <Link
                          to={link.path}
                          onClick={(e) => handleNavClick(e, link.path)}
                          className={`block w-full sm:w-max text-center sm:text-left px-6 py-4 rounded-2xl transition-all border font-bold text-xl sm:text-2xl bg-blue-900 text-white hover:bg-blue-800 ${active ? 'shadow-[0_0_20px_rgba(30,58,138,0.5)] border-blue-500' : 'border-blue-900'}`}
                        >
                          {link.title}
                        </Link>
                      </motion.div>
                    );
                  }

                  return (
                    <motion.div
                      key={link.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 + 0.1 }}
                    >
                      <Link
                        to={link.path}
                        onClick={(e) => handleNavClick(e, link.path)}
                        className={`block w-full sm:w-max text-center sm:text-left px-6 py-4 rounded-2xl transition-all font-bold text-2xl sm:text-4xl ${active ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' : 'text-slate-800 hover:text-indigo-600 hover:bg-slate-50 border border-transparent'}`}
                      >
                        {link.title}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </div>
            
            <div className="p-6 bg-slate-50 border-t border-slate-100 mt-auto">
              <div className="max-w-7xl mx-auto">
                <p className="text-sm font-medium text-slate-500 text-center">
                  Structured for Success
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
