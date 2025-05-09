'use client';

import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import AdminProtected from '@/app/hooks/adminProtected';
import Heading from '@/app/utils/Heading';
import Loader from '@/app/components/Loader/Loader';

// Dynamic imports
const AdminSidebar = dynamic(() => import('@/app/components/Admin/sidebar/AdminSidebar'), {
  ssr: false,
  loading: () => <Loader message='Loading Sidebar'/>,
});
const DashboardHero = dynamic(() => import('@/app/components/Admin/DashboardHero'), {
  ssr: false,
  loading: () => <Loader message='Loading Dashboard'/>,
});
const AllCourses = dynamic(() => import('@/app/components/Admin/Course/AllCourses'), {
  ssr: false,
  loading: () => <Loader message='Loading Courses'/>,
});

type Props = {};

const Page: React.FC<Props> = () => {
  return (
    <div>
      <Suspense fallback={<Loader message="Loading Admin Protected Content" />}>
        <AdminProtected>
          <Heading
            title="EDU GRANTORS - Admin"
            description="EDU GRANTORS is a platform for learning and development"
            keywords="Programming, Learning, Development"
          />
          <div className="flex min-h-screen">
            {/* Sidebar */}
            <div className="1500px:w-[16%] w-1/5">
              <AdminSidebar />
            </div>
            {/* Main Content */}
            <div className="1500px:w-[85%]">
              <DashboardHero />
              <AllCourses />
            </div>
          </div>
        </AdminProtected>
      </Suspense>
    </div>
  );
};

export default Page;
