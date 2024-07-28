// import SubHeader from '@/components/Global/SubHeader';
import { ClerkLoaded } from '@clerk/nextjs';

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkLoaded>
      {/* <div className=''> */}
      {/* <SubHeader /> */}
      <main className='flex h-screen flex-1 flex-col overflow-y-auto bg-gradient-to-bl from-accent3/30 to-accent2/30'>
        {children}
      </main>
      {/* </div> */}
    </ClerkLoaded>
  );
}

export default DashboardLayout;
