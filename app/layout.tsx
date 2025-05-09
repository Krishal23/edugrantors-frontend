'use client';

import './globals.css';
import { Poppins, Josefin_Sans } from 'next/font/google';
import { ThemeProvider } from './utils/theme-provider';
import { Toaster } from 'react-hot-toast';
import { Providers } from '../app/Provider';
import { SessionProvider } from 'next-auth/react';
import React from 'react';
// import dynamic from 'next/dynamic';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import CustomLoader from './CustomLoader';

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
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
