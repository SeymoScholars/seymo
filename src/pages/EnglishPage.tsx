import { useImage } from '../hooks/useImage';
import { CheckCircle2, BookA, Lightbulb, Compass, MessageSquare } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export default function EnglishPage() {
  const { getImage } = useImage();

  return (
    <>
      <Helmet>
        <title>English | SeymoScholars</title>
        <meta name="description" content="Explore our English curriculum at SeymoScholars. We focus on reading comprehension, grammar intricacies, and creative writing." />
        <meta name="keywords" content="English, English tuition, grammar, reading comprehension, writing, class 3-10 English, offline English classes, SeymoScholars" />
        <meta property="og:title" content="English | SeymoScholars" />
        <meta property="og:description" content="Explore our English curriculum at SeymoScholars. We focus on reading comprehension, grammar intricacies, and creative writing." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://seymoscholars.com/subjects/english" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="English | SeymoScholars" />
        <meta name="twitter:description" content="Explore our English curriculum at SeymoScholars. We focus on reading comprehension, grammar intricacies, and creative writing." />
        <link rel="canonical" href="https://seymoscholars.com/subjects/english" />
        <script type="application/ld+json">
          {`{
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "English | SeymoScholars",
            "description": "Explore our English curriculum at SeymoScholars. We focus on reading comprehension, grammar intricacies, and creative writing.",
            "url": "https://seymoscholars.com/subjects/english"
          }`}
        </script>
      </Helmet>

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-slate-50 relative border-b border-slate-100 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={getImage('english.img1', 'https://images.unsplash.com/photo-1476275466078-4007374efbbe?auto=format&fit=crop&q=80&w=2000&h=800')} 
            alt="Literature books lying on a table" 
            className="w-full h-full object-cover opacity-20 filter blur-[2px]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-50/90 to-slate-50"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm border border-rose-200">
            <BookA className="w-8 h-8" />
          </div>
          <h1 className="text-5xl font-black text-slate-900 mb-6">Language & Literature</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Mastering the art of expression. We guide students to communicate with clarity, empathy, and absolute confidence.
          </p>
        </div>
      </section>

      {/* Facts & Philosophy */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            
            <div className="p-8 rounded-[32px] bg-rose-50/50 border border-rose-100">
              <h3 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
                <Lightbulb className="w-6 h-6 text-rose-500" /> 
                Why Our Method Works (Facts)
              </h3>
              <ul className="space-y-6">
                <li className="flex items-start gap-4 text-slate-700 leading-relaxed">
                  <div className="bg-white p-2 rounded-xl shadow-sm text-rose-600 shrink-0 mt-1">
                    <span className="font-bold text-lg">1</span>
                  </div>
                  <p><strong>Contextual Grammar is Key:</strong> Teaching grammar rules in isolation is less effective than teaching them within the context of actual reading and writing. Contextual learning improves writing mechanics significantly.</p>
                </li>
                <li className="flex items-start gap-4 text-slate-700 leading-relaxed">
                  <div className="bg-white p-2 rounded-xl shadow-sm text-rose-600 shrink-0 mt-1">
                    <span className="font-bold text-lg">2</span>
                  </div>
                  <p><strong>Oral Proficiency Boosts Comprehension:</strong> Students who regularly engage in structured classroom discussions and spoken English activities show marked improvement in reading comprehension and critical thinking.</p>
                </li>
              </ul>
            </div>

            <div className="p-8 rounded-[32px] bg-pink-50/50 border border-pink-100">
              <h3 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
                <Compass className="w-6 h-6 text-pink-500" /> 
                Our Philosophy
              </h3>
              <ul className="space-y-6">
                <li className="flex items-start gap-4 text-slate-700 leading-relaxed">
                  <CheckCircle2 className="w-6 h-6 text-pink-500 shrink-0 mt-1" />
                  <p><strong>Voice Before Vocabulary:</strong> While vocabulary is important, helping a student find their unique voice and express their thoughts clearly is our primary goal. Words are just tools for expression.</p>
                </li>
                <li className="flex items-start gap-4 text-slate-700 leading-relaxed">
                  <CheckCircle2 className="w-6 h-6 text-pink-500 shrink-0 mt-1" />
                  <p><strong>Reading as an Experience:</strong> We transform reading from a chore into a journey. By carefully selecting diverse, engaging texts, we aim to build a lifelong love for literature rather than just fulfilling a reading quota.</p>
                </li>
                <li className="flex items-start gap-4 text-slate-700 leading-relaxed">
                  <CheckCircle2 className="w-6 h-6 text-pink-500 shrink-0 mt-1" />
                  <p><strong>SOF Olympiad Prep (IEO):</strong> We integrate comprehensive coaching for the International English Olympiad (IEO) directly into our structured curriculum to boost linguistic excellence.</p>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* Grade Breakdowns */}
      <section className="py-24 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
          
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="lg:w-1/2">
              <div className="inline-block px-4 py-1.5 rounded-full text-sm font-bold mb-6 bg-yellow-100 text-yellow-800 border border-yellow-200">
                Grades 3-5
              </div>
              <h3 className="text-3xl font-black text-slate-900 mb-4">Phonics & Storytelling</h3>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                We build early literacy through engaging childhood storybooks related to a child, graphic vocabulary blocks, and interactive phonics. Students learn to structure simple sentences and express their imagination freely in a supportive, colorful environment.
              </p>
            </div>
            <div className="lg:w-1/2">
              <div className="rounded-[40px] overflow-hidden shadow-2xl p-2 bg-yellow-100 border border-yellow-200">
                <img 
                  src={getImage('english.img2', 'https://upload.wikimedia.org/wikipedia/commons/a/af/The_Crow_and_the_Pitcher_-_Project_Gutenberg_etext_19994.jpg')} 
                  alt="Childhood storybooks with colorful details" 
                  className="w-full h-auto rounded-[32px] object-cover"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row-reverse gap-12 items-center">
            <div className="lg:w-1/2">
              <div className="inline-block px-4 py-1.5 rounded-full text-sm font-bold mb-6 bg-rose-100 text-rose-800 border border-rose-200">
                Grades 6-8
              </div>
              <h3 className="text-3xl font-black text-slate-900 mb-4">Structure & Comprehension</h3>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                Middle school English focuses on structural grammar tools and deeper reading comprehension. We use collaborative digital whiteboards for diagramming sentences and run interactive speaking circles to build conversational fluency.
              </p>
            </div>
            <div className="lg:w-1/2">
              <div className="rounded-[40px] overflow-hidden shadow-2xl p-2 bg-rose-100 border border-rose-200 relative">
                <div className="absolute top-8 right-8 bg-white p-3 rounded-2xl shadow-lg z-10 border border-slate-100 text-rose-600">
                  <MessageSquare className="w-8 h-8" />
                </div>
                <img 
                  src={getImage('english.img3', 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80&w=1000&h=700')} 
                  alt="Middle school students in a discussion circle" 
                  className="w-full h-auto rounded-[32px] object-cover"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="lg:w-1/2">
              <div className="inline-block px-4 py-1.5 rounded-full text-sm font-bold mb-6 bg-blue-100 text-blue-800 border border-blue-200">
                Grades 9-10
              </div>
              <h3 className="text-3xl font-black text-slate-900 mb-4">Critical Analysis</h3>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                Board exam preparations require analytical depth. Students utilize advanced editing tools and structured writing frameworks to craft compelling essays, analyze classic literature, and perfect their formal writing and debating skills.
              </p>
            </div>
            <div className="lg:w-1/2">
              <div className="rounded-[40px] overflow-hidden shadow-2xl p-2 bg-blue-100 border border-blue-200">
                <img 
                  src={getImage('english.img4', 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=formathttps://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1000&h=700fit=crophttps://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1000&h=700q=80https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1000&h=700w=1000https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1000&h=700h=700')} 
                  alt="High school students analyzing literature" 
                  className="w-full h-auto rounded-[32px] object-cover"
                />
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
