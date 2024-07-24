import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ErrorBoundary } from '@sentry/nextjs';
import Header from '@/components/Global/Header';
import { ClerkProvider } from '@clerk/nextjs';
import { ThemeProvider } from '@/providers/ThemeProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Docubot',
  description: 'Chat with your documents and code repositories',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <ClerkProvider>
        <body
          className={`${inter.className} flex h-screen min-h-screen flex-col overflow-hidden bg-light-500 dark:bg-dark-600`}
        >
          {/* <Header /> */}
          <ErrorBoundary>
            <ThemeProvider
              attribute='class'
              defaultTheme='system'
              enableSystem
              disableTransitionOnChange
            >
              <Header />
              {children}
            </ThemeProvider>
          </ErrorBoundary>
        </body>
      </ClerkProvider>
    </html>
  );
}
