'use client'
import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import AdminProtected from '@/app/hooks/adminProtected';
import Heading from '@/app/utils/Heading';
import Loader from '@/app/components/Loader/Loader';

const AdminSidebar = dynamic(() => import('@/app/components/Admin/sidebar/AdminSidebar'), {
  loading: () => <Loader />
});
const DashboardHero = dynamic(() => import('@/app/components/Admin/DashboardHero'), {
  loading: () => <Loader />
});
const AllUsers = dynamic(() => import('@/app/components/Admin/Course/AllUsers'), {
  loading: () => <Loader />
});



const page = () => {
  return (
    <div>
      <Suspense fallback={<Loader message="Loading..." />}>
        <AdminProtected>
          <Heading
            title="EDU GRANTORS - Admin"
            description="EDU GRANTORS is a platform for learning and development"
            keywords="Programming, Learning, Development"
          />
          <div className='flex min-h-screen'>
            <div className="1500px:w-[16%] w-1/5 ">
              <AdminSidebar />
            </div>
            <div className="1500px:w-[85%]">
              <DashboardHero />
              <AllUsers />
            </div>
          </div>
        </AdminProtected>
      </Suspense>
    </div>
  )
}

export default page;
