'use client'
import React from 'react'
import dynamic from 'next/dynamic'
import Heading from "../utils/Heading"
import AdminProtected from '../hooks/adminProtected'
import Loader from '../components/Loader/Loader'

// Dynamic imports with lazy loading
const AdminSidebar = dynamic(() => import('../components/Admin/sidebar/AdminSidebar'), {
  ssr: false,
  loading: () => <Loader message='Loading Sidebar'/>, // You can customize the loader component here
});

const DashboardHero = dynamic(() => import('../components/Admin/DashboardHero'), {
  ssr: false,
  loading: () => <Loader message='Loading Dashboard'/>,
});
// const AllUsers = dynamic(() => import('@/app/components/Admin/Course/AllUsers'), {
//   ssr: false,
//   loading: () => <Loader />,
// });


const Page = () => {
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
            <DashboardHero />
          </div>
        </div>
      </AdminProtected>
    </div>
  )
}

export default Page
