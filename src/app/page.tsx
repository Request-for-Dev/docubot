import Image from 'next/image';

import { FilePlus2, TextSearch, Binary, DatabaseZap, FileOutput, Eye } from 'lucide-react';
import Footer from '@/components/Global/Footer';
import featuresData from '@/l/util/constants.json';
import HeroSection from '@/components/Home/HeroSection';

const iconMap = {
  FilePlus2,
  TextSearch,
  Binary,
  DatabaseZap,
  FileOutput,
  Eye,
};

export default function Home() {
  const features = featuresData.features.map((feature) => ({
    ...feature,
    icon: iconMap[feature.icon as keyof typeof iconMap],
  }));

  return (
    <>
      <main className='flex flex-col items-center overflow-scroll overflow-x-hidden bg-gradient-to-bl from-accent3/40 to-accent2/40'>
        <div className='flex flex-col items-center justify-center p-2 lg:p-5 xl:p-12'>
          <HeroSection />

          <div className='relavtive mb-8 overflow-hidden pt-16 md:mb-12 lg:mb-16'>
            <div className='mx-auto max-w-7xl px-6 lg:px-8'>
              <Image
                src='/screencap.webp'
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
