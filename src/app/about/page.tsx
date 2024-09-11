import React from 'react';
import Footer from '@/components/Global/Footer';
import { ArrowRight, Code, Lightbulb, Rocket } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className='min-h-screen overflow-auto bg-gradient-to-br from-accent2/40 to-accent/40 dark:from-accent3/30 dark:to-accent4/30'>
      <div className='container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8'>
        <h1 className='mb-12 text-center text-4xl font-bold tracking-tight text-dark-800 dark:text-light-300 sm:text-5xl'>
          About DocuBot
        </h1>

        <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
          {/* App Overview */}
          <Section
            title='App Overview'
            icon={<Rocket className='h-8 w-8' />}
            className='md:col-span-2 lg:col-span-1'
          >
            <p>
              DocuBot is an AI-powered document analysis and chat interface that revolutionizes
              information retrieval and document interaction. It allows users to effortlessly
              extract and analyze information from PDF documents through natural language
              conversations.
            </p>
          </Section>

          {/* About the Creator */}
          <Section
            title='About the Creator'
            icon={<Code className='h-8 w-8' />}
            className='row-span-2 md:col-span-2 lg:col-span-2'
          >
            <p>
              DocuBot was created by Steven Watkins, also known as Digital Alchemyst. Steven is a
              Sr. Next.js Architect, AI Integration Specialist, Prompt Architect, and Chief Product
              Innovator. With a passion for cutting-edge technology and AI, Steven brought DocuBot
              to life, showcasing his expertise in rapid development and innovation.
            </p>
            <a
              href='https://www.alchemyst.digital/'
              className='mt-4 inline-flex items-center text-accent hover:underline'
              target='_blank'
              rel='noopener noreferrer'
            >
              Learn more about the creator <ArrowRight className='ml-2 h-4 w-4' />
            </a>
          </Section>

          {/* About the Company */}
          <Section title='About Alchemy Labz' icon={<Lightbulb className='h-8 w-8' />}>
            <p>
              DocuBot is owned and operated by Alchemy Labz, a company at the forefront of
              AI-powered solutions. Alchemy Labz is committed to developing innovative tools that
              enhance productivity and streamline information processing for users across various
              industries.
            </p>
          </Section>

          {/* App Story */}
          <Section title='The DocuBot Story' className='md:col-span-2 lg:col-span-3'>
            <p className='mb-4'>
              DocuBot was born during the University of Code AI SaaS Challenge, where it secured an
              impressive 2nd place among 4,000 contestants. Developed in just 3 days, DocuBot
              showcases the power of rapid innovation and expertise in AI and SaaS development.
            </p>
            <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
              {[
                'Implemented document vectorization using Pinecone and LangChain for efficient information retrieval.',
                'Integrated Google Firebase/Firestore for backend operations and Stripe for subscription payments.',
                'Implemented a robust rate limiting system for AI conversations, optimizing resource usage.',
                'Recognized as the most helpful participant in the challenge for assisting fellow developers.',
                'Showcased the ability to work under pressure, completing a complex project within a tight deadline.',
                'Implemented markdown styling and code markup with syntax highlighting for AI responses.',
              ].map((achievement, index) => (
                <div key={index} className='rounded-lg bg-light-100 p-4 shadow dark:bg-dark-800'>
                  <p className='text-sm'>{achievement}</p>
                </div>
              ))}
            </div>
            <p className='mt-4'>
              DocuBot continues to evolve, pushing the boundaries of AI-powered document analysis
              and interaction.
            </p>
          </Section>
        </div>
      </div>
      <div className='py-12'>
        <Footer />
      </div>
    </div>
  );
};

interface SectionProps {
  title: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

const Section: React.FC<SectionProps> = ({ title, children, icon, className }) => (
  <div
    className={`rounded-lg bg-light-400/30 p-6 shadow-lg shadow-dark-900/30 ring-1 ring-accent2/80 drop-shadow-md dark:bg-dark-700/50 dark:ring-accent/80 ${className}`}
  >
    <div className='mb-4 flex items-center'>
      {icon && <div className='mr-3 text-accent'>{icon}</div>}
      <h2 className='text-2xl font-semibold text-dark-800 dark:text-light-300'>{title}</h2>
    </div>
    <div className='text-dark-600 dark:text-light-400'>{children}</div>
  </div>
);

export default AboutPage;
