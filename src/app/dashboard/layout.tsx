import SubHeader from '@/components/Global/SubHeader';
import { ClerkLoaded } from '@clerk/nextjs';

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkLoaded>
      <div className='flex h-screen flex-1 flex-col bg-gradient-to-bl from-accent3/30 to-accent2/30'>
        <SubHeader />
        <main className='flex-1 overflow-y-auto'>{children}</main>
      </div>
    </ClerkLoaded>
  );
}

export default DashboardLayout;
