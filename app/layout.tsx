'use client';
import './globals.css';
import { Poppins, Josefin_Sans } from 'next/font/google';
import { ThemeProvider } from './utils/theme-provider';
import { Toaster } from 'react-hot-toast';
import { Providers } from '../app/Provider';
import { SessionProvider } from 'next-auth/react';
import { useLoadUserQuery } from './redux/features/api/apiSlice';
import Loader from './components/Loader/Loader';
import React from 'react';

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${josefin.variable} !bg-white bg-no-repeat dark:bg-gradient-to-b dark:from-gray-900 dark:to-black duration-300`}
      >
        <Providers>
          <SessionProvider>
            <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
              <Custom>{children}</Custom>
              <Toaster position="top-center" reverseOrder={false} />
            </ThemeProvider>
          </SessionProvider>
        </Providers>
      </body>
    </html>
  );
}

const Custom: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const {isLoading } = useLoadUserQuery({});

  return(
    <>
      {
        isLoading ? <Loader/> : <>{children} </>
      }
    </>
  )
};
