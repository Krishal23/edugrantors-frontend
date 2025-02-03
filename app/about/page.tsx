'use client';

import React, { useState } from 'react';
import Header from '../components/Header';
import { FaHandsHelping, FaGlobe, FaGraduationCap, FaAward } from 'react-icons/fa';
import dynamic from 'next/dynamic';
import Loader from '../components/Loader/Loader';
import Heading from '../utils/Heading';
import Team from '../team/page';
import Footer from '../components/Footer';

// const PrivacyPolicy = dynamic(() => import('../components/PrivacyPolicy/PrivacyPolicy'), {
//   loading: () => <Loader message="Loading Privacy Policy..." />,
// });
// const TermsAndConditions = dynamic(() => import('../components/tnc/TermsAndCondition'), {
//   loading: () => <Loader message="Loading Terms and Conditions..." />,
// });

type Props = {};

const AboutUs: React.FC<Props> = () => {
  const [route, setRoute] = useState("Login");
  const [open, setOpen] = useState(false);

  return (
    <>
    <Heading
          title={`About Us- EDU GRANTORS`}
          description="EDUGRANTORS is a platform for learning."
          keywords="Programming, MERN"
        />
      <Header
      
        open={open}
        setOpen={setOpen}
        activeItem={1}
        setRoute={setRoute}
        route={route}
      />


      <div className="bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-300 p-4 sm:p-8 space-y-12">
        {/* Header Section */}
        <header className="text-center space-y-4 mb-16">
          <h1 className="text-3xl sm:text-5xl font-bold text-gray-900 dark:text-slate-300 mb-4">About Us</h1>
          <p className="text-base sm:text-lg max-w-2xl mx-auto text-gray-700 dark:text-gray-400">
            Empowering learners worldwide by making quality education accessible, affordable, and impactful.
          </p>
        </header>

        {/* Mission & Vision Section */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-12 mb-16">
          {/* Mission */}
          <div className="bg-gradient-to-br from-[#ece7f5] to-[#d9d4f1] dark:from-gray-800 dark:to-gray-700 text-gray-900 dark:text-gray-300 shadow-lg rounded-lg p-6 sm:p-10 space-y-4 hover:scale-105 transform transition duration-300">
            <div className="text-yellow-500 dark:text-yellow-400 text-3xl sm:text-4xl">
              <FaHandsHelping />
            </div>
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-gray-100">Our Mission</h2>
            <p className="text-gray-700 dark:text-gray-300">
            Our mission is to provide personalized mentorship and expert guidance for JEE and NEET preparation at an affordable cost, empowering every student to achieve their dream.
            </p>
          </div>

          {/* Vision */}
          <div className="bg-gradient-to-br from-[#ece7f5] to-[#d9d4f1] dark:from-gray-800 dark:to-gray-700 text-gray-900 dark:text-gray-300 shadow-lg rounded-lg p-6 sm:p-10 space-y-4 hover:scale-105 transform transition duration-300">
            <div className="text-yellow-500 dark:text-yellow-400 text-3xl sm:text-4xl">
              <FaGlobe />
            </div>
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-gray-100">Our Vision</h2>
            <p className="text-gray-700 dark:text-gray-300">
            Our vision is to revolutionize JEE and NEET preparation by creating a supportive and accessible learning ecosystem, where every student, regardless of their background, can realize their full potential and achieve academic excellence
            </p>
          </div>
        </section>

        {/* Offerings Section */}
        <section className="bg-gray-200 dark:bg-gray-800 rounded-lg shadow-lg p-6 sm:p-12 mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-yellow-400 text-center mb-8">What We Offer</h2>
          <div className="flex flex-col sm:flex-row justify-around space-y-6 sm:space-y-0">
            <div className="flex flex-col items-center text-center p-4">
              <FaGraduationCap className="text-yellow-400 text-4xl sm:text-5xl mb-4" />
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-gray-300 mb-2">Expert-Led Courses</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Comprehensive courses across competetive fields, crafted by JEE / NEET experts.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <FaAward className="text-yellow-400 text-4xl sm:text-5xl mb-4" />
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-gray-300 mb-2">Mentorship</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Personalised one-on-one mentorship tailored to help student succeed.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <FaHandsHelping className="text-yellow-400 text-4xl sm:text-5xl mb-4" />
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-gray-300 mb-2">24/7 Support</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Round-the-clock support to assist you at every step of your learning journey.
              </p>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="bg-gray-300 dark:bg-gray-700 rounded-lg shadow-lg p-6 sm:p-12 mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-yellow-400 text-center mb-8">Our Values</h2>
          <p className="text-center max-w-3xl mx-auto text-gray-700 dark:text-gray-400">
            We are committed to excellence, accessibility, and continuous improvement. We believe everyone deserves the chance to learn, grow, and make a positive impact on the world.
          </p>
        </section>

        {/* <PrivacyPolicy />
        <TermsAndConditions /> */}
        <Team/>
        <Footer/>

        {/* Footer */}
        {/* <footer className="text-center mt-8">
          <p className="text-gray-600 dark:text-gray-400">&copy; {new Date().getFullYear()} EDU GRANTORS Platform. All rights reserved.</p>
        </footer> */}
      </div>
    </>
  );
};

export default AboutUs;
