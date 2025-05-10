'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import AdminProtected from '@/app/hooks/adminProtected';
import Heading from '@/app/utils/Heading';
import Loader from '@/app/components/Loader/Loader';
import { useGetCourseDetailsAdminQuery } from '@/app/redux/features/courses/coursesApi';

// Dynamic imports
const AdminSidebar = dynamic(() => import('@/app/components/Admin/sidebar/AdminSidebar'), {
  ssr: false,
  loading: () => <Loader message='Loading Sidebar'/>,
});
const DashboardHero = dynamic(() => import('@/app/components/Admin/DashboardHero'), {
  ssr: false,
  loading: () => <Loader message='Loading Dashboard' />,
});
const CourseDetails = dynamic(() => import('@/app/components/Admin/Course/CourseDetails'), {
  ssr: false,
  loading: () => <Loader message='Loading Course' />,
});

type Props = { };

const Page: React.FC<Props> = ({ params}: any) => {
  const { data, isLoading, isError,refetch } = useGetCourseDetailsAdminQuery(params.id); // Pass id to the query
  
  // Handle error case
  if (isError) {
      return <div>Error loading course details. Please try again.</div>;
  }
  return (
    <>
      {
        isLoading?(
          <Loader />
        ):(
          <div>
          <AdminProtected>
            <Heading
              title="EDU GRANTORS - Admin"
              description="EDU GRANTORS is a platform for learning and development"
              keywords="Programming, Learning, Development"
            />
            <div className="flex h-full">
              {/* Sidebar */}
              <div className="1500px:w-[15%] w-1/5">
                <AdminSidebar />
              </div>
              {/* Main Content */}
              <div className="1500px:w-[85%]">
                <DashboardHero />
                <CourseDetails courseData={data?.course} teacher={data?.teacher} refetch={refetch}/>
              </div>
            </div>
          </AdminProtected>
        </div>
        )
      }
    </>
  );
};

export default Page;
