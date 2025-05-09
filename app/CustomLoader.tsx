'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import Loader from '../app/components/Loader/Loader';
import { useLoadUserQuery } from '../app/redux/features/api/apiSlice';

const TopLoader = dynamic(() => import('../app/components/Loader/TopLoader'), { ssr: false });

const ClientLoader: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { isLoading: isUserLoading, isFetching: isUserFetching } = useLoadUserQuery({});

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

  const isDataLoading = isUserLoading || isUserFetching || isNavigating;

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

const CustomLoader: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Suspense fallback={<Loader />}>
      <ClientLoader>{children}</ClientLoader>
    </Suspense>
  );
};

export default CustomLoader;
