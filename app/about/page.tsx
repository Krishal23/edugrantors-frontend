'use client';
import React from 'react';
import dynamic from 'next/dynamic';
import Loader from '../components/Loader/Loader';


const About = dynamic(() => import('../components/About'), {
  loading: () => <Loader message="Loading Privacy Policy..." />,
});


const AboutUs = () => {

  return (
    <About/>
  );
};

export default AboutUs;
