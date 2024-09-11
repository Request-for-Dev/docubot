import React from 'react';
import FAQItem from '@/components/Cards/FAQCard';
import faqData from '@/lib/constants/faqData.json';
import Footer from '@/components/Global/Footer';

const FAQPage: React.FC = () => {
  return (
    <div className='flex flex-col items-center overflow-scroll overflow-x-hidden bg-gradient-to-br from-accent2/40 to-accent/40 dark:from-accent3/30 dark:to-accent4/30'>
      <div className='flex flex-col items-center justify-start space-y-15 p-2 lg:p-5 xl:p-12'>
        <div className='mx-auto max-w-4xl px-4 text-center sm:px-6'>
          <h2 className='text-base font-semibold leading-7 text-accent'>FAQ</h2>
          <p className='mt-2 text-4xl font-bold tracking-tight text-dark-800 dark:text-light-300'>
            Frequently Asked Questions
          </p>
        </div>
        <div className='mx-auto mt-12 max-w-3xl px-4 sm:px-6'>
          <div className='rounded-lg bg-light-400/30 p-8 shadow-lg shadow-dark-900/30 ring-1 ring-accent2/80 drop-shadow-md dark:bg-dark-700/50 dark:ring-accent/80'>
            {faqData.faqs.map((faq, index) => (
              <FAQItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FAQPage;
