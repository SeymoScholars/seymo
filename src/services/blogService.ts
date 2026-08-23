export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  author: string;
  category: string;
  coverImage: string;
  summary: string;
  content: string;
}

const MOCK_BLOGS: BlogPost[] = [
  {
    slug: 'importance-of-stem-subjects',
    title: 'The Growing Importance of STEM Subjects',
    date: 'July 10, 2026',
    author: 'Probad Chakraborty',
    category: 'STEM',
    coverImage: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=800&h=500',
    summary: 'Why STEM education is critical for the future and how SeymoScholars integrates it seamlessly into the core curriculum.',
    content: `The Foundation of Modern Innovation
STEM (Science, Technology, Engineering, and Mathematics) subjects are no longer just optional areas of interest; they are the very foundation of modern innovation. As the world rapidly digitizes, understanding these core fields has become essential for every student, regardless of their ultimate career path.

Moving Beyond the Textbook
Traditional education often isolates these subjects, treating them as discrete siloes of information. However, the real world demands integrated thinking. At SeymoScholars, our approach to STEM is inherently interdisciplinary. We believe that to truly grasp the principles of physics, one must understand the mathematics behind them, and to engineer a solution, one must apply scientific logic.

Hands-On Application
Our curriculum moves students away from rote memorization and towards hands-on application. By engaging in real-world problem-solving scenarios, students learn how to formulate hypotheses, test their theories, and analyze data critically. This process builds not just knowledge, but the cognitive resilience needed to tackle complex, unstructured problems.

Preparing for Tomorrow
The jobs of tomorrow will require individuals who can adapt, innovate, and think computationally. By prioritizing STEM education today, we are equipping our students with the toolkit they need to become the leaders and creators of the future. We foster an environment where curiosity is celebrated and failure is viewed simply as a stepping stone to discovery.`
  },
  {
    slug: 'future-of-robotics-and-ai',
    title: 'Why Robotics & AI Are the New Literacy',
    date: 'July 5, 2026',
    author: 'Anurag Ghosh',
    category: 'Technology',
    coverImage: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800&h=500',
    summary: 'Understanding why we must equip our students with AI and robotics skills to navigate the 21st-century landscape.',
    content: `The New Literacy
In the 21st century, understanding Artificial Intelligence and Robotics is akin to reading and writing. It is the new literacy. As AI continues to permeate every aspect of our lives, from healthcare to finance, it is imperative that our education systems adapt to prepare students for a tech-centric world.

Demystifying Technology
Our robotics and AI modules are designed to demystify these complex technologies. We start early, introducing foundational concepts through engaging, age-appropriate platforms. Students don't just learn what AI is; they learn how to build simple models, understand algorithms, and grasp the ethical implications of autonomous systems.

Building Computational Thinking
Robotics provides a tangible, interactive medium for developing computational thinking. When a student programs a robot to navigate a maze, they are learning sequence, logic, and debugging. They see the immediate, physical results of their code, which makes abstract programming concepts concrete and deeply memorable.

Empowering Future Creators
The goal is not to turn every student into a software engineer, but to ensure that no student is left intimidated by technology. We want our students to transition from passive consumers of digital products to active creators. By integrating robotics and AI, we are fostering a generation of innovators who will command technology to solve the world's most pressing challenges.`
  },
  {
    slug: 'mastering-the-kua-framework',
    title: 'Mastering the KUA Framework',
    date: 'June 28, 2026',
    author: 'Saheli Deb Roy',
    category: 'Pedagogy',
    coverImage: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&q=80&w=800&h=500',
    summary: 'A deep dive into our core educational philosophy: Knowledge, Understanding, and Application.',
    content: `Redefining Mastery
At the heart of SeymoScholars' pedagogical approach lies the KUA Framework: Knowledge, Understanding, and Application. This tri-layered model ensures that learning goes far beyond the superficial recall of facts, driving students toward true conceptual mastery and practical competence.

Level 1: Knowledge
The first tier is Knowledge. This is the acquisition of essential facts, vocabulary, and fundamental laws. While traditional education often stops here, we view knowledge merely as the raw material. It is the foundation upon which higher-order thinking is built. We ensure that this knowledge is precise and easily accessible to the student.

Level 2: Understanding
The second tier is Understanding. This is where students connect the dots. They move from knowing 'what' to grasping 'why'. We challenge students to explain concepts in their own words, to build mental models, and to identify patterns. Understanding means a student can recognize a principle even when it is presented in an unfamiliar context.

Level 3: Application
The final and most crucial tier is Application. Knowledge and understanding are theoretical until they are put to the test. In this phase, students use what they have learned to solve novel, unstructured problems. Whether it's conducting an experiment, writing a piece of software, or analyzing a case study, application proves that learning has truly occurred.

The Continuous Cycle
The KUA framework is not a linear path but a continuous cycle. Application often reveals gaps in knowledge or understanding, prompting a return to earlier tiers. This iterative process builds deep, resilient learning, ensuring our students are not just prepared for exams, but for life.`
  }
];

// Replace this with your actual Google Apps Script Web App URL after deployment
const APPS_SCRIPT_URL = import.meta.env.VITE_APPS_SCRIPT_URL || '';

export async function fetchBlogs(): Promise<BlogPost[]> {
  if (APPS_SCRIPT_URL) {
    try {
      const response = await fetch(APPS_SCRIPT_URL);
      if (response.ok) {
        const data = await response.json();
        return data as BlogPost[];
      }
    } catch (error) {
      console.error("Failed to fetch blogs from Google Sheets. Falling back to mock data.", error);
    }
  }
  return MOCK_BLOGS;
}

export async function fetchBlogBySlug(slug: string): Promise<BlogPost | null> {
  if (APPS_SCRIPT_URL) {
    try {
      const response = await fetch(`${APPS_SCRIPT_URL}?slug=${slug}`);
      if (response.ok) {
        const data = await response.json();
        if (data && !Array.isArray(data)) {
           return data as BlogPost;
        } else if (Array.isArray(data) && data.length > 0) {
           return data[0] as BlogPost;
        }
      }
    } catch (error) {
      console.error(`Failed to fetch blog ${slug} from Google Sheets. Falling back to mock data.`, error);
    }
  }
  const blog = MOCK_BLOGS.find((b) => b.slug === slug);
  return blog || null;
}
