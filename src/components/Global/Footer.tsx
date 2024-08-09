import React from 'react';

const Footer = () => {
  return (
    <footer className='bottom-0 w-full bg-light-500/30 py-6 text-dark-700 shadow-black inner-glow-light-60 dark:bg-dark-700/50 dark:text-light-600 dark:inner-glow-dark-70'>
      <div className='container mx-auto flex flex-wrap justify-between'>
        <div className='mb-4 w-full sm:w-1/2 md:w-1/4 lg:w-1/6'>
          <h3 className='mb-2 text-lg font-bold'>DocuBot</h3>
          <ul>
            <li>Desktop app</li>
            <li>Mobile app</li>
            <li>Integrations</li>
          </ul>
        </div>

        <div className='mb-4 w-full sm:w-1/2 md:w-1/4 lg:w-1/6'>
          <h3 className='mb-2 text-lg font-bold'>Support</h3>
          <ul>
            <li>Help center</li>
            <li>Contact us</li>
            <li>Privacy & terms</li>
            <li>Cookie policy</li>
            <li>Cookies & CCPA preferences</li>
          </ul>
        </div>

        <div className='mb-4 w-full sm:w-1/2 md:w-1/4 lg:w-1/6'>
          <h3 className='mb-2 text-lg font-bold'>Company</h3>
          <ul>
            <li>About us</li>
            <li>Jobs</li>
            <li>Investor relations</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
