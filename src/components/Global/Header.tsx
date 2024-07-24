import { SignedOut, UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import DLToggle from '@/c/Global/DLToggle'
import { dark } from '@clerk/themes';

const Header = () => {
  return (
    <header className='flex items-center justify-between bg-light-600 dark:bg-dark-800 px-5 py-3'>
      <Link href='/' className='flex items-center space-x-4'>
        <Image src='/logo.png' alt='logo' width={45} height={45}  />
        <h1 className='text-4xl font-bold'>DocuBot!</h1>
      </Link>
      <div className='flex space-x-4 items-center'>
        {/* User Button / Login Functions  */}
        <UserButton
          showName={true}         
          appearance={{
            baseTheme: dark,
            elements: {
              avatarBox: 'h-10 w-10'
            }
          }}
        />
        <SignedOut>
          <Link className='px-3 py-2 dark:bg-dark-400 bg-light-700 dark:text-light-400 text-dark-800 rounded-md neon-lime border border-accent' href='/sign-up'>  
          <button>
            Sign Up
          </button>
          </Link>
          <Link className='px-3 py-2 dark:bg-dark-400 bg-light-700 dark:text-light-400 text-dark-800 rounded-md neon-violet border border-accent2' href='/sign-in'>  
          <button>
            Sign In
          </button>
          </Link>
        </SignedOut>
          {/* Theme Toggle  */}
          <DLToggle />
      </div>
    </header>
  );
}

export default Header