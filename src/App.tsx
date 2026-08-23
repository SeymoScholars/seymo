/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ImageProvider } from './hooks/useImage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import EnrollModal from './components/EnrollModal';
import ScrollToTop from './components/ScrollToTop';

import Home from './pages/Home';
import About from './pages/About';
import MathPage from './pages/MathPage';
import SciencePage from './pages/SciencePage';
import EnglishPage from './pages/EnglishPage';
import Grade3to5Page from './pages/Grade3to5Page';
import Grade6to8Page from './pages/Grade6to8Page';
import Grade9to10Page from './pages/Grade9to10Page';
import Blog from './pages/Blog';
import BlogDetails from './pages/BlogDetails';
import SuccessStories from './pages/SuccessStories';
import RoboticsAIPage from './pages/RoboticsAIPage';
import ForSchools from './pages/ForSchools';
import HowWeTeach from './pages/HowWeTeach';

export default function App() {
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);

  useEffect(() => {
    const handleOpenModal = () => setIsEnrollModalOpen(true);
    window.addEventListener('open-enroll-modal', handleOpenModal);
    return () => window.removeEventListener('open-enroll-modal', handleOpenModal);
  }, []);

  return (
    <HelmetProvider>
      <ImageProvider>
        <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-50/60 via-white to-white font-sans text-slate-900 selection:bg-indigo-100 selection:text-indigo-900 relative">
          <Navbar onEnrollClick={() => setIsEnrollModalOpen(true)} />
          <main>
            <Routes>
              <Route path="/" element={<Home onEnrollClick={() => setIsEnrollModalOpen(true)} />} />
              <Route path="/about" element={<About />} />
              <Route path="/subjects/mathematics" element={<MathPage />} />
              <Route path="/subjects/science" element={<SciencePage />} />
              <Route path="/subjects/english" element={<EnglishPage />} />
              <Route path="/programs/robotics-ai" element={<RoboticsAIPage />} />
              <Route path="/grades/3-5" element={<Grade3to5Page />} />
              <Route path="/grades/6-8" element={<Grade6to8Page />} />
              <Route path="/grades/9-10" element={<Grade9to10Page />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogDetails />} />
              <Route path="/success-stories" element={<SuccessStories />} />
              <Route path="/for-schools" element={<ForSchools />} />
              <Route path="/how-we-teach" element={<HowWeTeach />} />
            </Routes>
          </main>
          <Footer onEnrollClick={() => setIsEnrollModalOpen(true)} />
          <EnrollModal isOpen={isEnrollModalOpen} onClose={() => setIsEnrollModalOpen(false)} />
        </div>
      </BrowserRouter>
      </ImageProvider>
    </HelmetProvider>
  );
}
