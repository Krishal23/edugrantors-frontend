'use client'

import React from 'react'
import AdminProtected from '@/app/hooks/adminProtected';
import Heading from '@/app/utils/Heading';
import dynamic from 'next/dynamic';
import Loader from '../../../components/Loader/Loader'

const AdminSidebar = dynamic(() => import("../../../components/Admin/sidebar/AdminSidebar"), {
  ssr: false,
  loading: () => <Loader message='Loading Sidebar'/>,
});

const DashboardHeader = dynamic(() => import('@/app/components/Admin/DashboardHeader'), {
  ssr: false,
  loading: () => <Loader message='Loading Dashboard'/>,
});
const EnrolledUsers = dynamic(() => import('@/app/components/Admin/Course/EnrolledUsers'), {
  ssr: false,
  loading: () => <Loader message='Loading Users'/>,
});


interface PageProps {
  params: {
    id: string;
  };
}

const page = ({params}: PageProps) => {
    const id= params.id
    
  return (
    <div>
      <AdminProtected>
        <Heading
          title="EDU GRANTORS - Admin"
          description="EDU GRANTORS is a platform for learning and development"
          keywords="Programming, Learning, Development"
        />
        <div className="flex h-screen">
          <div className="1500px:w-[16%] w-1/5">
            <AdminSidebar />
          </div>
          <div className="1500px:w-[85%]">
            <DashboardHeader />
            <EnrolledUsers id={id}/>
            {/* You can add other components like <AllCourses /> here */}
          </div>
        </div>
      </AdminProtected >
    </div>
  )
}

export default page