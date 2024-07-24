import React from 'react'

const Footer = () => {
  return (
    <footer className='dark:bg-csdark-800 py-6 dark:text-cslight-600 bg-cslight-500 text-csdark-700 bottom-0 w-full'>
      <div className='container mx-auto flex flex-wrap justify-between'>
        <div className='mb-4 w-full sm:w-1/2 md:w-1/4 lg:w-1/6'>
          <h3 className='mb-2 text-lg font-bold'>Cloud Stash</h3>
          <ul>
            <li>Desktop app</li>
            <li>Mobile app</li>
            <li>Integrations</li>
          </ul>
        </div>

        <div className='mb-4 w-full sm:w-1/2 md:w-1/4 lg:w-1/6'>
          <h3 className='mb-2 text-lg font-bold'>Features</h3>
          <ul>
            <li>Solutions</li>
            <li>Do more than store</li>
            <li>Security</li>
          </ul>
        </div>

        <div className='mb-4 w-full sm:w-1/2 md:w-1/4 lg:w-1/6'>
          <h3 className='mb-2 text-lg font-bold'>Products</h3>
          <ul>
            <li>Plus</li>
            <li>Professional</li>
            <li>Business</li>
            <li>Enterprise</li>
            <li>Cloudstash E-Sign</li>
            <li>DocSend</li>
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
            <li>ESG</li>
            <li>Find a partner</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer