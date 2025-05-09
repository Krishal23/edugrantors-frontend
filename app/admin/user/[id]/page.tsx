'use client'
import Loader from '@/app/components/Loader/Loader';
import AdminProtected from '@/app/hooks/adminProtected';
import { useGetUserDataQuery } from '@/app/redux/features/user/userApi';
import Heading from '@/app/utils/Heading';
import dynamic from 'next/dynamic';
import React from 'react';


const AdminSidebar = dynamic(() => import('@/app/components/Admin/sidebar/AdminSidebar'), {
    ssr: false,
    loading: () => <Loader message='Loading Sidebar'/>,
  });
  const DashboardHero = dynamic(() => import('@/app/components/Admin/DashboardHero'), {
    ssr: false,
    loading: () => <Loader message='Loading Dashboard' />,
  });
  const LoadUser = dynamic(() => import('@/app/components/Admin/USER/LoadUser'), {
    ssr: false,
    loading: () => <Loader message='Loading Course' />,
  });

type Props = {
  params: {
    id: string;
  };
};

const Page = ({ params }: Props) => {
  const { id } = params;
  const { data, isLoading, isError } = useGetUserDataQuery({ id });

  if (isError) {
    return <div>Error fetching user data. Please try again later.</div>;
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
            <div className="flex min-h-screen">
              {/* Sidebar */}
              <div className="1500px:w-[15%] w-1/5">
                <AdminSidebar />
              </div>
              {/* Main Content */}
              <div className="1500px:w-[85%]">
                <DashboardHero />
                <LoadUser user={data?.user}/>
                {/* <CourseDetails courseData={data.course} refetch={refetch}/> */}
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
