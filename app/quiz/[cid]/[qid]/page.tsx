'use client'
import Loader from '@/app/components/Loader/Loader';
import dynamic from 'next/dynamic';
import React from 'react'

const QuizStart = dynamic(() => import('@/app/components/Quiz/QuizStart'), {
  loading: () => <Loader message='Loading Quiz...' /> // Show the Loader while CourseContent is being loaded
});


type Props = {}

const page = ({params}: any) => {
    const { cid, qid } = params;
    return (
    <QuizStart courseId={cid}  quizId={qid}/>
  )
}

export default page