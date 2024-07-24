import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import DLToggle from '@/c/Global/DLToggle';
import { dark } from '@clerk/themes';

const Header = () => {
  return (
    <header className='flex items-center justify-between bg-light-600 px-5 py-3 shadow-xl shadow-dark-800/30 dark:bg-dark-800'>
      <SignedOut>
        <Link href='/' className='flex items-center space-x-4'>
          <Image src='/logo.png' alt='logo' width={45} height={45} />
          <h1 className='text-4xl font-bold'>DocuBot</h1>
        </Link>
      </SignedOut>
      <SignedIn>
        <Link href='/dashboard' className='flex items-center space-x-4'>
          <Image src='/logo.png' alt='logo' width={45} height={45} />
          <h1 className='text-4xl font-bold'>DocuBot</h1>
        </Link>
      </SignedIn>
      <div className='flex items-center space-x-4'>
        {/* User Button / Login Functions  */}
        <UserButton
          showName={true}
          appearance={{
            baseTheme: dark,
            elements: {
              avatarBox: 'h-10 w-10',
            },
          }}
        />
        <SignedOut>
          <Link
            className='rounded-md border border-accent bg-light-700 px-3 py-2 text-dark-800 neon-lime dark:bg-dark-400 dark:text-light-400'
            href='/sign-up'
          >
            <button>Sign Up</button>
          </Link>
          <Link
            className='rounded-md border border-accent2 bg-light-700 px-3 py-2 text-dark-800 neon-violet dark:bg-dark-400 dark:text-light-400'
            href='/sign-in'
          >
            <button>Sign In</button>
          </Link>
        </SignedOut>
        {/* Theme Toggle  */}
        <DLToggle />
      </div>
    </header>
  );
};

export default Header;
