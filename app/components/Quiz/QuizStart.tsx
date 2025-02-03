'use client';
import React, { useState } from 'react';
import { useGetQuizQuery } from '../../redux/features/courses/coursesApi';
import dynamic from 'next/dynamic';
import Loader from '../Loader/Loader';


const QuizQuestion = dynamic(() => import('./QuizQuestion'), {
  loading: () => <Loader message='Loading Quiz' />, // Customize loading message as needed
});

type Props = {
  quizId: string;
  courseId: string;
};

const QuizStart = ({ quizId, courseId }: Props) => {

  const { data, error, isLoading } = useGetQuizQuery({ courseId, quizId });
  const quiz = data?.result;
  const [startQuiz, setStartQuiz] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

 
  if (isLoading) return <div>Loading quiz details...</div>;
  if (error) return <div>Error loading quiz details.</div>;

  const handleStartQuiz = () => setStartQuiz(true);


  return (
    <>
      {!startQuiz ? (
        <div className="flex min-h-screen border-2 border-red-950 text-black dark:text-white flex-col items-center justify-center space-y-4 py-8">
          <div className="max-w-md sm:w-full w-[80vw] flex flex-col justify-center items-center bg-white text-black p-6 rounded-lg shadow-md">
            <h1 className="text-2xl font-semibold text-center mb-4">{quiz?.title}</h1>
            <p className="text-lg text-center mb-4">{quiz?.description}</p>
            <p className="text-gray-600 text-center mb-4">Duration: {quiz?.duration} minutes</p>
            <p className="text-gray-600 text-center mb-4">Max Marks: {quiz?.maxMarks}</p>
            <button
              className="px-6 py-2  bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200"
              onClick={handleStartQuiz}
            >
              Start Quiz
            </button>
          </div>
        </div>
      ) : (
        
        <QuizQuestion
          quiz={quiz}
          currentQuestionIndex={currentQuestionIndex}
          setCurrentQuestionIndex={setCurrentQuestionIndex}
          quizId={quizId}
          courseId={courseId}
        />
      )}
    </>
  );
};

export default QuizStart;
