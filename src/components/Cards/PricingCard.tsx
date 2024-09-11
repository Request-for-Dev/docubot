import React from 'react';

interface PricingCardProps {
  plan: string;
  price: string;
  features: string[];
}

const PricingCard: React.FC<PricingCardProps> = ({ plan, price, features }) => {
  return (
    <div className='flex max-w-md flex-col justify-between rounded-lg bg-light-400/30 shadow-lg shadow-dark-900/30 ring-1 ring-accent2/80 drop-shadow-md dark:bg-dark-700/50 dark:ring-accent/80'>
      <div className='px-6 py-8'>
        <h3 className='mb-4 text-2xl font-bold text-accent'>{plan}</h3>
        <p className='text-3xl font-semibold text-dark-700 dark:text-light-300'>{price}</p>
      </div>
      <div className='px-6 pb-8'>
        <ul className='space-y-4'>
          {features.map((feature, index) => (
            <li
              key={index}
              className='flex items-center text-sm font-light text-dark-600 dark:text-light-400'
            >
              <span className='mr-3 h-5 w-5 flex-none rounded-full bg-accent dark:bg-accent2' />
              {feature}
            </li>
          ))}
        </ul>
      </div>
      <div className='flex w-full flex-1 items-end justify-end px-6 pb-8 pt-4 text-center'>
        <button className='h-min rounded-md bg-accent px-6 py-3 font-semibold text-white transition-colors duration-300 hover:bg-accent2'>
          Select Plan
        </button>
      </div>
    </div>
  );
};

export default PricingCard;
