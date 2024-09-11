import React from 'react';
import PricingCard from '@/components/Cards/PricingCard';
import pricingData from '@/lib/constants/pricingData.json';

interface PricingPlan {
  plan: string;
  price: string;
  features: string[];
}

const Pricing: React.FC = () => {
  return (
    <div className='flex flex-col items-center bg-gradient-to-br from-accent2/40 to-accent/40 dark:from-accent3/30 dark:to-accent4/30'>
      <div className='flex flex-col items-center justify-center space-y-6 p-2 lg:p-5 xl:p-8'>
        <div className='mx-auto max-w-4xl px-4 text-center sm:px-6'>
          <h2 className='text-base font-semibold leading-7 text-accent'>Our Pricing</h2>
          <p className='mt-2 text-4xl font-bold tracking-tight text-dark-800 dark:text-light-300'>
            Discover the Right Plan for You
          </p>
        </div>
        <p className='mx-auto max-w-4xl px-4 py-8 text-center text-dark-700 dark:text-light-400 sm:px-6 sm:py-14'>
          Choose a plan that fits your needs, packed with features to help you interact with your
          PDFs, boost productivity, and streamline your workflow.
        </p>
        {/* Plans */}
        <div className='mx-auto mt-12 grid max-w-7xl grid-cols-1 gap-6 px-4 sm:px-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-10 lg:px-8'>
          {pricingData.map((plan: PricingPlan, index: number) => (
            <PricingCard key={index} {...plan} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing;
