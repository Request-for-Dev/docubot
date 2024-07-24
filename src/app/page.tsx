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
        <div className='flex flex-col items-center justify-center gap-y-2 p-3 bg-black/40 rounded-md'>
          <p className='underline underline-offset-2'>Theme Colors</p>
          <div className='grid grid-cols-9 gap-1'>
            <p className=' text-center h-24 w-18 text-sm flex items-center justify-center text-red-800 font-semibold rounded-sm p-2 bg-dark-100'>dark 100</p>
            <p className=' text-center h-24 w-18 text-sm flex items-center justify-center text-red-800 font-semibold rounded-sm p-2 bg-dark-200'>dark 200</p>
            <p className=' text-center h-24 w-18 text-sm flex items-center justify-center text-red-800 font-semibold rounded-sm p-2 bg-dark-300'>dark 300</p>
            <p className=' text-center h-24 w-18 text-sm flex items-center justify-center text-red-800 font-semibold rounded-sm p-2 bg-dark-400'>dark 400</p>
            <p className=' text-center h-24 w-18 text-sm flex items-center justify-center text-red-800 font-semibold rounded-sm p-2 bg-dark-500'>dark 500</p>
            <p className=' text-center h-24 w-18 text-sm flex items-center justify-center text-red-800 font-semibold rounded-sm p-2 bg-dark-600'>dark 600</p>
            <p className=' text-center h-24 w-18 text-sm flex items-center justify-center text-red-800 font-semibold rounded-sm p-2 bg-dark-700'>dark 700</p>
            <p className=' text-center h-24 w-18 text-sm flex items-center justify-center text-red-800 font-semibold rounded-sm p-2 bg-dark-800'>dark 800</p>
            <p className=' text-center h-24 w-18 text-sm flex items-center justify-center text-red-800 font-semibold rounded-sm p-2 bg-dark-900'>dark 900</p>
            <p className=' text-center h-24 w-18 text-sm flex items-center justify-center text-red-800 font-semibold rounded-sm p-2 bg-light-100'>light 100</p>
            <p className=' text-center h-24 w-18 text-sm flex items-center justify-center text-red-800 font-semibold rounded-sm p-2 bg-light-200'>light 200</p>
            <p className=' text-center h-24 w-18 text-sm flex items-center justify-center text-red-800 font-semibold rounded-sm p-2 bg-light-300'>light 300</p>
            <p className=' text-center h-24 w-18 text-sm flex items-center justify-center text-red-800 font-semibold rounded-sm p-2 bg-light-400'>light 400</p>
            <p className=' text-center h-24 w-18 text-sm flex items-center justify-center text-red-800 font-semibold rounded-sm p-2 bg-light-500'>light 500</p>
            <p className=' text-center h-24 w-18 text-sm flex items-center justify-center text-red-800 font-semibold rounded-sm p-2 bg-light-600'>light 600</p>
            <p className=' text-center h-24 w-18 text-sm flex items-center justify-center text-red-800 font-semibold rounded-sm p-2 bg-light-700'>light 700</p>
            <p className=' text-center h-24 w-18 text-sm flex items-center justify-center text-red-800 font-semibold rounded-sm p-2 bg-light-800'>light 800</p>
            <p className=' text-center h-24 w-18 text-sm flex items-center justify-center text-red-800 font-semibold rounded-sm p-2 bg-light-900'>light 900</p>
            <p className=' text-center h-24 w-18 text-sm flex items-center justify-center text-red-800 font-semibold rounded-sm p-2 bg-accent'>accent</p>
            <p className=' text-center h-24 w-18 text-sm flex items-center justify-center text-red-800 font-semibold rounded-sm p-2 bg-accent2'>accent2</p>
            <p className=' text-center h-24 w-18 text-sm flex items-center justify-center text-red-800 font-semibold rounded-sm p-2 bg-accent3'>accent3</p>
            <p className=' text-center h-24 w-18 text-sm flex items-center justify-center text-red-800 font-semibold rounded-sm p-2 bg-accent4'>accent4</p>
          </div>
        </div>
      </main>
    </div>
  );
}
