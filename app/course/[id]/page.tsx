'use client'
import React from 'react'
import dynamic from 'next/dynamic'
import Loader from '@/app/components/Loader/Loader';


const CourseDetailsPage = dynamic(() => import('../../components/Course/CourseDetailsPage'), {
  loading: () => <Loader message='Loading Course...'/>,
})

const Page = ({ params }: any) => {
  return (
    <div>
        <CourseDetailsPage id={params?.id} />
    </div>
  )
}

export default Page
