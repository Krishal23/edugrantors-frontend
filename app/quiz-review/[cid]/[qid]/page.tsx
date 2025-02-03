'use client'

import Header from '@/app/components/Header';
import Loader from '@/app/components/Loader/Loader';
import dynamic from 'next/dynamic';
import React, { useState } from 'react'

const QuizReview = dynamic(() => import("@/app/components/Quiz/QuizReview"), {
  loading: () => <Loader message="Profile Review" />, // Loader to show while Profile component is being loaded
});


type Props = {}

const Page = ({params}: any) => {
    const { cid, qid } = params;
    const [route, setRoute] = useState("Login");
    const [open, setOpen] = useState(false);
    return (
      <>
      <Header
        open={open}
        setOpen={setOpen}
        activeItem={2}
        setRoute={setRoute}
        route={route}
      />
    <QuizReview courseId={cid}  quizId={qid}/>
    <footer className="text-center mt-8">
          <p className="text-gray-600 dark:text-gray-400">&copy; {new Date().getFullYear()} EDU GRANTORS Platform. All rights reserved.</p>
        </footer>
    </>
  )
}

export default Page