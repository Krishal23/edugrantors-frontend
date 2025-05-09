'use client'

import React from 'react'
import AdminProtected from '@/app/hooks/adminProtected';
import Heading from '@/app/utils/Heading';
import dynamic from 'next/dynamic';
import Loader from '@/app/components/Loader/Loader';

const AdminSidebar = dynamic(() => import("../../components/Admin/sidebar/AdminSidebar"), {
  ssr: false,
  loading: () => <Loader message='Loading Sidebar'/>,
});

const DashboardHeader = dynamic(() => import('@/app/components/Admin/DashboardHeader'), {
  ssr: false,
  loading: () => <Loader message='Loading Dashboard'/>,
});
const QuestionBank = dynamic(() => import("@/app/components/Admin/QuestionBank/QuestionBank"), {
    ssr: false,
    loading: () => <Loader message='Loading, please wait...'/>,
  });
  

const page = () => {
  return (
    <div>
      <AdminProtected>
        <Heading
          title="EDU GRANTORS - Admin"
          description="EDU GRANTORS is a platform for learning and development"
          keywords="Programming, Learning, Development"
        />
        <div className="flex min-h-screen">
          <div className="1500px:w-[16%] w-1/5">
            <AdminSidebar />
          </div>
          <div className="1500px:w-[85%] ">
            <DashboardHeader />
            <QuestionBank/>
          </div>
        </div>
      </AdminProtected >
    </div>
  )
}

export default page