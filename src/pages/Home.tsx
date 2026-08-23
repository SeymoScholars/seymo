import Hero from '../components/Hero';
import Flowchart from '../components/Flowchart';
import Grades from '../components/Grades';
import Subjects from '../components/Subjects';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import CTA from '../components/CTA';
import { Helmet } from 'react-helmet-async';

export default function Home({ onEnrollClick }: { onEnrollClick: () => void }) {
  return (
    <>
      <Helmet>
        <title>SeymoScholars | Grades 3-10 Math, Science & English</title>
        <meta name="description" content="India's leading specialized learning platform for Grades 3 to 10. Master Mathematics, Science, and English with interactive conceptual learning." />
        <meta name="keywords" content="SeymoScholars, offline learning center, math tuition, science coaching, english classes, robotics, AI courses, class 3-10 education, conceptual learning, demo class, India" />
        <meta property="og:title" content="SeymoScholars | Grades 3-10 Math, Science & English" />
        <meta property="og:description" content="India's leading specialized learning platform for Grades 3 to 10. Master Mathematics, Science, and English with interactive conceptual learning." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="SeymoScholars | Grades 3-10 Math, Science & English" />
        <meta name="twitter:description" content="India's leading specialized learning platform for Grades 3 to 10. Master Mathematics, Science, and English with interactive conceptual learning." />
        <link rel="canonical" href="https://seymoscholars.com/" />
        <script type="application/ld+json">
          {`{
            "@context": "https://schema.org",
            "@type": "EducationalOrganization",
            "name": "SeymoScholars",
            "description": "India's leading specialized offline learning platform for Grades 3 to 10. Master Mathematics, Science, English, Robotics, and AI.",
            "url": "https://seymoscholars.com"
          }`}
        </script>
      </Helmet>
      <Hero onEnrollClick={onEnrollClick} />
      <Flowchart onEnrollClick={onEnrollClick} />
      <CTA onEnrollClick={onEnrollClick} />
      <Subjects />
      <Grades />
      <Testimonials />
      <FAQ onEnrollClick={onEnrollClick} />
    </>
  );
}
