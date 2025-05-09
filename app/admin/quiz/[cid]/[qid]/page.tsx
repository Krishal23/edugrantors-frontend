'use client'
import React from 'react';

import dynamic from 'next/dynamic'
import AdminProtected from '../../../../hooks/adminProtected'
import Heading from "../../../../utils/Heading"
import Loader from '../../../../components/Loader/Loader'

const AdminSidebar = dynamic(() => import("../../../..//components/Admin/sidebar/AdminSidebar"), {
  ssr: false,
  loading: () => <Loader message='Loading Sidebar'/>,
});
const QuizDetailsAdmin = dynamic(() => import("@/app/components/Admin/Course/Quiz/QuizDetailsAdmin"), {
  ssr: false,
  loading: () => <Loader message='Loading Quiz'/>,
});

const DashboardHeader = dynamic(() => import('@/app/components/Admin/DashboardHeader'), {
  ssr: false,
  loading: () => <Loader message='Loading Dashboard'/>,
});



type Props = {
  params: {
    cid: string;
    qid: string;
  };
};

const page = ({ params }: Props) => {
  const courseId = params.cid;
  const quizId = params.qid;
  return (
    <div>
      <AdminProtected>
        <Heading
          title="EDU GRANTORS - Admin"
          description="EDU GRANTORS is a platform for learning and development"
          keywords="Programming , Learning, Development"
        />
        <div className="flex min-h-screen">
          {/* Sidebar */}
          <div className="1500px:w-[14%] w-1/5">
            <AdminSidebar />
          </div>
          {/* Main Content */}
          <div className="w-[85%]">
            <DashboardHeader />
            <QuizDetailsAdmin
              quizId={quizId}
              courseId={courseId}
              isEdit={false}
            />
          </div>
        </div>
      </AdminProtected>
    </div>
   
  );
};

export default page;
