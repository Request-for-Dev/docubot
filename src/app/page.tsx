import Image from 'next/image';

import { Button } from '@/components/ui/button';
import Link from 'next/link';

import { FilePlus2, TextSearch, Binary, DatabaseZap, FileOutput, Eye } from 'lucide-react';
import Footer from '@/components/Global/Footer';

const features = [
  {
    title: 'Store and Chat with your PDFs & documents',
    description:
      'Store your documents and chat with them in real-time. Ask questions, perform data analysis, edit your documents, and more.',
    icon: FilePlus2,
  },
  {
    title: 'Chat with and analyze entire code repositories',
    description:
      'Chat with your code repositories. Find bugs, get code improvements, write tests, and more.',
    icon: Binary,
  },
  {
    title: 'Code Search',
    description: 'Search your code repositories. Find the code you need with a simple search.',
    icon: TextSearch,
  },
  {
    title: 'Document Management',
    description:
      'Manage your documents and code repositories in one place. Easily search, filter, and sort your documents.',
    icon: DatabaseZap,
  },
  {
    title: 'Export your chats to multiple formats.',
    description:
      'Export your chats to multiple formats. You can export your chats to a PDF, CSV or a JSON file.',
    icon: FileOutput,
  },
  {
    title: 'Responsive Across Deivices',
    description: 'View your documents on any device, anywhere, with a user friendly interface.',
    icon: Eye,
  },
];

export default function Home() {
  return (
    <>
      <main className='flex flex-col items-center overflow-scroll overflow-x-hidden bg-gradient-to-bl from-accent3/40 to-accent2/40'>
        <div className='flex flex-col items-center justify-center p-2 lg:p-5 xl:p-12'>
          <div className='mx-auto flex max-w-7xl flex-col items-center justify-center rounded-md bg-light-400 px-6 py-16 drop-shadow-xl dark:bg-dark-600 sm:py-8 lg:px-8'>
            <div className='mx-auto flex max-w-2xl flex-col items-center justify-center sm:text-center'>
              <h4 className='text-base font-semibold leading-7 text-accent'>
                Your Interactive Document Companion
              </h4>
              <h1 className='sm:-text-6xl my-2 text-3xl font-bold tracking-tight text-dark-800 dark:text-light-400'>
                Welcome to DocuBot
              </h1>
              <Image src='/logo.png' alt='logo' width={124} height={124} />
              <h2 className='my-3 text-xl font-semibold'>
                Chat with your Documents & Code Repositories
              </h2>
              <p className='mb-2 py-4 text-lg leading-8 text-dark-600 dark:text-light-400 lg:mb-4'>
                Introducing DocuBot <span className='font-bold text-accent'>DocuBot</span>
                <br /> Upload your Documents or Repo and DocuBot will answer any questions about
                your
                <br /> Easy to use, <span className='font-bold text-accent'>DocuBot</span> is ideal
                for everyone.
                <br /> Transform your boring documents into a{' '}
                <span className='font-bold text-accent3'>dynamic conversations</span>, and enhance
                your productivity effortlessly
              </p>
            </div>
            <div className='my-2 flex items-center justify-center space-x-6'>
              <Button>
                <Link href='/dashboard'>Get Started</Link>
              </Button>
              <Button>
                <Link href='/dashboard'>See Pricing</Link>
              </Button>
            </div>
          </div>

          <div className='relavtive mb-8 overflow-hidden pt-16 md:mb-12 lg:mb-16'>
            <div className='mx-auto max-w-7xl px-6 lg:px-8'>
              <Image
                src='/illustration.jpeg'
                alt='illustration'
                width={2432}
                height={1442}
                className='mb-[-0%] rounded-xl shadow-2xl ring-1 ring-accent2'
              />
              <div aria-hidden='true' className='relative'>
                <div className='-x-inset-32 absolute bottom-0 w-full rounded-xl bg-gradient-to-t from-white/95 pt-[5%]' />
              </div>
            </div>
          </div>

          {/* map thru features  */}

          <div className='mb-3 md:mb-6 lg:mb-10'>
            <dl className='gapy-y-10 mx-auto grid max-w-2xl grid-cols-1 gap-x-6 px-6 text-base text-dark-700 dark:text-light-700 sm:grid-cols-2 lg:mx-0 lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16 lg:px-8'>
              {features.map((feature, i) => (
                <div
                  key={i}
                  className='relative rounded-lg border border-accent/80 bg-light-500/30 px-2 py-4 shadow-lg shadow-dark-900/30 drop-shadow-md dark:border-accent2/80 dark:bg-dark-700/50'
                >
                  <dt className='inline font-semibold text-dark-800 dark:text-light-600'>
                    <feature.icon
                      className='absolute left-3 top-5 h-10 w-10 text-accent2 dark:text-accent'
                      aria-hidden='true'
                    />

                    <p className='ml-16 text-lg font-medium leading-6'>{feature.title}</p>
                  </dt>
                  <dd className='ml-16 mt-2 text-base'>{feature.description}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
}
