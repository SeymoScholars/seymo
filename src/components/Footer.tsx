import { Facebook, Instagram, ArrowRight, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

export default function Footer({ onEnrollClick }: { onEnrollClick: () => void }) {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-6 text-white text-opacity-90">
              <Link to="/">
                <Logo className="w-32 h-auto" isDarkText={false} />
              </Link>
            </div>
            <p className="text-slate-400 mb-6 leading-relaxed">
              Empowering students from grades 3 to 10 with world-class education in Math, Science, English, and AI and Robotics. Mapping seamlessly to CBSE, ICSE and West Bengal Board standards.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/profile.php?id=61560751592394" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-indigo-600 transition-colors text-white">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/seymo.scholars?igsh=MTVoMGo3MjUxdm0xcg==" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-indigo-600 transition-colors text-white">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 text-lg">Quick Links</h4>
            <ul className="space-y-4">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><a href="/about#philosophy" className="hover:text-white transition-colors">Why Choose Us</a></li>
              <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link to="/success-stories" className="hover:text-white transition-colors">Success Stories</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 text-lg">Curriculum</h4>
            <ul className="space-y-4">
              <li><Link to="/programs/robotics-ai" className="hover:text-white transition-colors">Beyond Barriers - Robotics & AI</Link></li>
              <li><Link to="/grades/3-5" className="hover:text-white transition-colors">Grades 3-5 Program</Link></li>
              <li><Link to="/grades/6-8" className="hover:text-white transition-colors">Grades 6-8 Program</Link></li>
              <li><Link to="/grades/9-10" className="hover:text-white transition-colors">Grades 9-10 Program</Link></li>
              <li><Link to="/subjects/mathematics" className="hover:text-white transition-colors">Mathematics Courses</Link></li>
              <li><Link to="/subjects/science" className="hover:text-white transition-colors">Science Explorations</Link></li>
              <li><Link to="/subjects/english" className="hover:text-white transition-colors">English Mastery</Link></li>
              <li><Link to="/programs/robotics-ai" className="hover:text-white transition-colors">Robotics and AI Courses</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 text-lg">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-24 shrink-0 text-slate-500">Email:</div>
                <a href="mailto:support@seymoscholars.org" className="hover:text-white transition-colors">support@seymoscholars.org</a>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-24 shrink-0 text-slate-500">Phone:</div>
                <a href="tel:033-4538-3028" className="hover:text-white transition-colors">033-4538-3028 / +91 9831514333</a>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-24 shrink-0 text-slate-500">Location:</div>
                <span>Gariahat, Hindustan Park, Kolkata-700029</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} SeymoScholars Education Pvt. Ltd. All rights reserved.</p>
          <div className="flex items-center space-x-2">
            <Shield className="w-5 h-5 text-emerald-400" />
            <span className="text-white font-medium">Child Protection Policy Certified</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
