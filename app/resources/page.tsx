'use client'
import React, { FC, useState } from "react";
import Protected from '../hooks/useProtected';
import Heading from "../utils/Heading";
import Header from "../components/Header";
import Loader from "../components/Loader/Loader";
import dynamic from 'next/dynamic';
import Footer from "../components/Footer";

const QuestionBank2 = dynamic(() => import("../components/Admin/QuestionBank/QuestionBank2"), {
  loading: () => <Loader message="Question Bank Loading" />, // Loader to show while Profile component is being loaded
});

type Props = {};

const Page: FC<Props> = () => {
  const [open, setOpen] = useState(false);
  const [activeItem] = useState(3);
  const [route, setRoute] = useState("Login");




  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Protected>
        <Heading
          title={`Resources - EDU GRANTORS`}
          description="EDUGRANTORS is a platform for learning."
          keywords="Programming, MERN"
        />
        <Header
          open={open}
          setOpen={setOpen}
          activeItem={activeItem}
          setRoute={setRoute}
          route={route}
        />
        <QuestionBank2 isQuiz={true} isEdit={false} isResource={true} />
        <Footer/>
      </Protected>
    </div>
  );
};

export default Page;
