// components/PricingCard.tsx

import React from 'react';

interface PricingCardProps {
  plan: string;
  price: string;
  features: string[];
}

const PricingCard: React.FC<PricingCardProps> = ({ plan, price, features }) => {
  return (
    <div className='flex max-w-md flex-col justify-between rounded-lg bg-light-400 shadow-md ring-1 ring-dark-300 dark:bg-dark-600'>
      <div className='px-6 py-4'>
        <h3 className='mb-2 text-xl font-bold text-accent'>{plan}</h3>
        <p className='text-2xl font-semibold text-dark-700 dark:text-light-300'>{price}</p>
      </div>
      <div className='px-6 pb-6 pt-4'>
        <ul className='space-y-3'>
          {features.map((feature, index) => (
            <li
              key={index}
              className='flex items-center text-sm font-light text-dark-600 dark:text-light-400'
            >
              <span className='mr-2 h-4 w-4 flex-none rounded-full bg-accent2' />
              {feature}
            </li>
          ))}
        </ul>
      </div>
      <div className='flex w-full flex-1 items-end justify-end px-6 pb-4 pt-4 text-center'>
        <button className='h-min rounded-md bg-accent px-6 py-2 font-semibold text-white hover:bg-accent2'>
          Select Plan
        </button>
      </div>
    </div>
  );
};

export default PricingCard;
