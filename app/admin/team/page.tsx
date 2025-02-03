'use client'

import React from 'react'
import dynamic from 'next/dynamic'
import AdminProtected from '@/app/hooks/adminProtected'
import Heading from '@/app/utils/Heading'
import Loader from '@/app/components/Loader/Loader'

const AdminSidebar = dynamic(() => import('@/app/components/Admin/sidebar/AdminSidebar'), {
  ssr: false,
  loading: () => <Loader message='Loading Sidebar' />,
});

const DashboardHero = dynamic(() => import('@/app/components/Admin/DashboardHero'), {
  ssr: false,
  loading: () => <Loader message='Loading Dashboard'/>,
});

const AllUsers = dynamic(() => import('@/app/components/Admin/Course/AllUsers'), {
  ssr: false,
  loading: () => <Loader message='Loading Users'/>,
});

type Props = {}

const Page = (props: Props) => {
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
          <div className="1500px:w-[85%]">
            <DashboardHero />
            <AllUsers isTeam={true} />
          </div>
        </div>
      </AdminProtected>
    </div>
  )
}

export default Page
