'use client'

import React from 'react'
import dynamic from 'next/dynamic'
import AdminProtected from '../../../hooks/adminProtected'
import Heading from "../../../utils/Heading"
import Loader from '../../../components/Loader/Loader'

const AdminSidebar = dynamic(() => import("../../../components/Admin/sidebar/AdminSidebar"), {
  ssr: false,
  loading: () => <Loader message='Loading Sidebar'/>,
});

const DashboardHeader = dynamic(() => import('@/app/components/Admin/DashboardHeader'), {
  ssr: false,
  loading: () => <Loader message='Loading Dashboard'/>,
});

const EditCourse = dynamic(() => import("../../../components/Admin/Course/EditCourse"), {
  ssr: false,
  loading: () => <Loader message='Loading, please wait...'/>,
});


interface PageProps {
  params: {
    id: string;
  };
}

const Page = ({ params }: PageProps) => {
  const id = params.id;

  return (
    <div>
      <AdminProtected>
        <Heading
          title="EDU GRANTORS - Admin"
          description="EDU GRANTORS is a platform for learning and development"
          keywords="Programming , Learning, Development"
        />
        <div className="flex">
          {/* Sidebar */}
          <div className="1500px:w-[14%] w-1/5">
            <AdminSidebar />
          </div>
          {/* Main Content */}
          <div className="w-[85%]">
            <DashboardHeader />
            <EditCourse id={id} />
          </div>
        </div>
      </AdminProtected>
    </div>
  )
}

export default Page
