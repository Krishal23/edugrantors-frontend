'use client';
import './globals.css';
import { Poppins, Josefin_Sans } from 'next/font/google';
import { ThemeProvider } from './utils/theme-provider';
import { Toaster } from 'react-hot-toast';
import { Providers } from '../app/Provider';
import { SessionProvider } from 'next-auth/react';
import { useLoadUserQuery } from './redux/features/api/apiSlice';
import Loader from './components/Loader/Loader';
import React, { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

const TopLoader = dynamic(() => import('./components/Loader/TopLoader'), {
  ssr: false,
});

const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  weight: ['400', '500', '600', '700'],
});

const josefin = Josefin_Sans({
  subsets: ['latin'],
  variable: '--font-Josefin',
  weight: ['400', '500', '600', '700'],
});

const CustomLoader: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isLoading: isUserLoading, isFetching: isUserFetching } = useLoadUserQuery({});
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isNavigating, setIsNavigating] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    setIsNavigating(true);
    const timeout = setTimeout(() => {
      setIsNavigating(false);
      setIsInitialLoad(false);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [pathname, searchParams]);

  // Determine if any data is being loaded
  const isDataLoading = isUserLoading || isUserFetching || isNavigating;

  // Show full-screen loader only on initial load
  if (isUserLoading || (isInitialLoad && isNavigating)) {
    return <Loader />;
  }

  return (
    <>
      <TopLoader isLoading={isDataLoading} />
      {children}
    </>
  );
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${josefin.variable} !bg-white bg-no-repeat dark:bg-gradient-to-b dark:from-gray-900 dark:to-black duration-300`}
      >
        <ErrorBoundary>
          <Providers>
            <SessionProvider>
              <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
                <CustomLoader>{children}</CustomLoader>
                <Toaster position="top-center" reverseOrder={false} />
              </ThemeProvider>
            </SessionProvider>
          </Providers>
        </ErrorBoundary>
      </body>
    </html>
  );
}
