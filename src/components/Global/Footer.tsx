import React from 'react';
import Link from 'next/link';
import NewsletterSubscribe from './NewsletterSubscribe';
import SocialLinks from './SocialLinks';

const Footer = () => {
  return (
    <footer className='bottom-0 flex w-full flex-col items-center justify-start bg-light-500/30 py-6 text-dark-700 shadow-black inner-glow-light-60 dark:bg-dark-700/50 dark:text-light-600 dark:inner-glow-dark-70'>
      {/* Social Media Icons */}
      <div className='mb-3 ml-22 flex w-full items-center justify-start'>
        <SocialLinks />
      </div>
      <div className='container mx-auto flex flex-wrap justify-between'>
        {/* Company Links */}
        <div className='mb-4 w-full sm:w-1/2 md:w-1/4 lg:w-1/6'>
          <h3 className='mb-2 text-lg font-bold'>DocuBot</h3>
          <ul>
            {/* <li>
              <Link href='/desktop-app'>Desktop app</Link>
            </li>
            <li>
              <Link href='/mobile-app'>Mobile app</Link>
            </li>
            <li>
              <Link href='/integrations'>Integrations</Link>
            </li> */}
          </ul>
        </div>

        {/* Support Links */}
        <div className='mb-4 w-full sm:w-1/2 md:w-1/4 lg:w-1/6'>
          <h3 className='mb-2 text-lg font-bold'>Support</h3>
          <ul>
            <li>
              <Link href='/about/help-center'>Help center</Link>
            </li>
            <li>
              <Link href='/about/privacy'>Privacy Policy</Link>
            </li>
            <li>
              <Link href='/about/cookies'>Cookie policy</Link>
            </li>
            <li>
              <Link href='/about/terms'>Terms of service</Link>
            </li>
          </ul>
        </div>

        {/* Company Links */}
        <div className='mb-4 w-full sm:w-1/2 md:w-1/4 lg:w-1/6'>
          <h3 className='mb-2 text-lg font-bold'>Company</h3>
          <ul>
            <li>
              <Link href='/about'>About us</Link>
            </li>
            <li>
              <Link href='/about/contact'>Contact Us</Link>
            </li>
            {/* <li>
              <Link href='/jobs'>Jobs</Link>
            </li>
            <li>
              <Link href='/investor-relations'>Investor relations</Link>
            </li> */}
          </ul>
        </div>
      </div>

      {/* Newsletter Subscription Component */}
      <NewsletterSubscribe />
    </footer>
  );
};

export default Footer;
