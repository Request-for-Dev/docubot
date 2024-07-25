import Documents from '@/components/Dashboard/Documents';

export const dynamic = 'force-dynamic' as never;
function Dashboard() {
  return (
    <div className='mx-auto h-full max-w-7xl'>
      <h1 className='bg-dark-700/60 p-5 text-3xl font-extralight text-light-700'>My Documents</h1>

      {/* Documents Folder  */}
      <Documents />
    </div>
  );
}

export default Dashboard;
