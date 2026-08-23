import { Quote } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { useImage } from '../hooks/useImage';

const testimonials = [
  {
    id: 1,
    content: "The conceptual approach completely changed my son's perspective on math. He used to dread it, and now he looks forward to solving complex puzzles.",
    author: "Priya Sharma",
    role: "Mother of 5th Grader",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200&h=200"
  },
  {
    id: 2,
    content: "Transitioning to middle school science was seamless. The interactive virtual labs helped my daughter grasp atomic structures effortlessly.",
    author: "Rahul Verma",
    role: "Father of 8th Grader",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200"
  },
  {
    id: 3,
    content: "The rigorous board prep for class 10 gave us immense confidence. The focus on answering strategies and time management was exactly what we needed.",
    author: "Anita Desai",
    role: "Mother of 10th Grader",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200&h=200"
  },
  {
    id: 4,
    content: "SeymoScholars doesn't just teach the syllabus, they teach children how to think critically. My son's English comprehension has vastly improved.",
    author: "Vikram Singh",
    role: "Father of 6th Grader",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200&h=200"
  },
  {
    id: 5,
    content: "The hands-on learning tools for younger kids are amazing. It feels like play to them, but they are absorbing fundamental concepts rapidly.",
    author: "Meera Patel",
    role: "Mother of 3rd Grader",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200&h=200"
  },
  {
    id: 6,
    content: "A game-changer for digital learning. The teachers are incredibly supportive and the platform's focus on actual understanding over rote learning is refreshing.",
    author: "Sanjay Kumar",
    role: "Father of 9th Grader",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200&h=200"
  }
];

export default function SuccessStories() {
  const { getImage } = useImage();
  return (
    <>
      <Helmet>
        <title>Success Stories | SeymoScholars</title>
        <meta name="description" content="Hear directly from parents about how SeymoScholars' concept-led curriculum has transformed their children's educational journey." />
        <meta name="keywords" content="SeymoScholars reviews, student success stories, offline class testimonies, parent feedback, educational milestones" />
        <meta property="og:title" content="Success Stories | SeymoScholars" />
        <meta property="og:description" content="Hear directly from parents about how SeymoScholars' concept-led curriculum has transformed their children's educational journey." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://seymoscholars.com/success-stories" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Success Stories | SeymoScholars" />
        <meta name="twitter:description" content="Hear directly from parents about how SeymoScholars' concept-led curriculum has transformed their children's educational journey." />
        <link rel="canonical" href="https://seymoscholars.com/success-stories" />
        <script type="application/ld+json">
          {`{
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Success Stories | SeymoScholars",
            "description": "Hear directly from parents about how SeymoScholars' concept-led curriculum has transformed their children's educational journey.",
            "url": "https://seymoscholars.com/success-stories"
          }`}
        </script>
      </Helmet>

      <section className="pt-32 pb-20 bg-slate-50 relative border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-black text-slate-900 mb-6">Success Stories</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Discover how SeymoScholars has empowered students across India to achieve their academic goals and develop a love for learning.
          </p>
        </div>
      </section>

      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div 
                key={testimonial.id}
                className="bg-slate-50 p-8 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl transition-all relative flex flex-col"
              >
                <Quote className="absolute top-8 right-8 w-10 h-10 text-indigo-100" />
                <p className="text-slate-700 leading-relaxed mb-8 flex-grow relative z-10 italic">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center gap-4 mt-auto">
                  <img src={getImage(`successStories.img${testimonial.id}`, testimonial.image)} alt={testimonial.author} className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-md" />
                  <div>
                    <h4 className="font-extrabold text-slate-900">{testimonial.author}</h4>
                    <p className="text-sm font-medium text-slate-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
