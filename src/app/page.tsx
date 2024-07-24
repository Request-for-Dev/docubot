import ThemeColors from '@/components/Global/ThemeColors';
import Image from 'next/image';

export default function Home() {
  return (
    <div className=''>
      <main className='flex min-h-screen flex-col items-center gap-y-5 p-12'>
        <div className='flex flex-col items-center justify-center gap-y-5'>
          <h1 className='text-3xl font-bold'>Welcome to DocuBot</h1>
          <h2 className='text-xl font-semibold'>Chat with your Documents & Code Repositories</h2>
          <Image src='/logo.png' alt='logo' width={124} height={124} />
        </div>
        <ThemeColors />
      </main>
    </div>
  );
}
