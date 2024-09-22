// import SubHeader from '@/components/Global/SubHeader';
import { ClerkLoaded } from '@clerk/nextjs';
import Header from '@/components/Global/Header';

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkLoaded>
      <div className=''>
        <Header />
        <main className='flex h-screen flex-1 flex-col overflow-y-auto bg-gradient-to-br from-accent2/40 to-accent/40 dark:from-accent3/30 dark:to-accent4/30'>
          {children}
        </main>
      </div>
    </ClerkLoaded>
  );
}

export default DashboardLayout;
