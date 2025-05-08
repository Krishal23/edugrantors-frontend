'use client'

import React, { useState } from 'react'
import dynamic from 'next/dynamic'
import Loader from '@/app/components/Loader/Loader' // Assuming you have a Loader component
import Header from '../components/Header'
import Heading from '../utils/Heading'
import Footer from '../components/Footer'

// Dynamically import the Courses component with a loader
const Courses = dynamic(() => import('../components/Routes/Courses'), {
  loading: () => <Loader message='Loading Courses' /> // Show the Loader while Courses is being loaded
});

const Page: React.FC = () => {
  const [route, setRoute] = useState("Login");
  const [open, setOpen] = useState(false);

  return (
    <>
    <Heading
          title={`Courses - EDU GRANTORS`}
          description="EDUGRANTORS is a platform for learning."
          keywords="Programming, MERN"
        />
      <Header
        open={open}
        setOpen={setOpen}
        activeItem={2}
        setRoute={setRoute}
        route={route}
      /> 
      
      <Courses /> {/* Lazy-loaded Courses component */}
      <Footer/>

      {/* <footer className="flex flex-col items-center py-2 bg-gradient-to-br from-[#9b88bc] to-[#a188d7] dark:from-gray-800 dark:to-gray-900 text-white">
        <p className="text-gray-500">&copy; {new Date().getFullYear()} EDU GRANTORS Platform. All rights reserved.</p>
      </footer> */}
    </>
  )
}

export default Page
