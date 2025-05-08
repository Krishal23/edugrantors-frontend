'use client'
import React, { FC, useState } from "react";
import Protected from '../hooks/useProtected';
import Heading from "../utils/Heading";
import Header from "../components/Header";
import Loader from "../components/Loader/Loader";
import dynamic from 'next/dynamic';
import Footer from "../components/Footer";

interface QuestionBankProps {
  isEdit?: boolean;
  selectedQuestions?: string[];
  setSelectedQuestions?: (questions: string[]) => void;
  isQuiz?: boolean;
  isResource?: boolean;
}

const QuestionBank2 = dynamic<QuestionBankProps>(() => import("../components/Admin/QuestionBank/QuestionBank2"), {
  loading: () => <Loader message="Question Bank Loading" />,
});

interface PageProps {
  params: Record<string, never>;
}

const Page: FC<PageProps> = () => {
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
