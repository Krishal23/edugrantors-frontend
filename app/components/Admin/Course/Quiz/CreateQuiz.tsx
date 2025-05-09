'use client';

import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useCreateTestMutation } from '@/app/redux/features/courses/coursesApi';
import dynamic from 'next/dynamic';
import Loader from '@/app/components/Loader/Loader';

const QuizDetails = dynamic(() => import('./QuizDetails'), {
  loading: () => <Loader message='Loading Quiz Details...' />,
});
const QuestionForm = dynamic(() => import('./QuestionForm'), {
  loading: () => <Loader message='Loading Quiz Form...' />,
});
const QuizPreview = dynamic(() => import('./QuizPreview'), {
  loading: () => <Loader message='Loading Quiz Preview...' />,
});
const QuizOptions = dynamic(() => import('./QuizOptions'), {
  loading: () => <Loader message='Loading Quiz Options...' />,
});


export interface QuizDetailsType {
  courseId: string;
  title: string;
  description: string;
  startTime: string;
  duration: number;
}

export interface QuestionType {
  type: 'single' | 'multiple' | 'numerical' | 'phrase';
  question: string;
  options: { text: string; isCorrect: boolean }[];
  correctAnswer: any;
  marks: number;
  explanation: string;
  image: string;


}

const CreateQuiz: React.FC = () => {

  const [activeStep, setActiveStep] = useState<number>(0);
  const [quizDetails, setQuizDetails] = useState<any>({
    courseId: '',
    title: '',
    description: '',
    startTime: '',
    duration: 1,
  });
  const [questions, setQuestions] = useState<QuestionType[]>([]);


  const [createTest,{isLoading}] = useCreateTestMutation();
  
  const handleQuizDetailsChange = (details: QuizDetailsType) => {
    setQuizDetails(details);
  };

  const reformatQuizData = (data: any) => {
    const reformatted: {
      title: string;
      description: string;
      questions: {
        type: 'single' | 'multiple' | 'numerical' | 'phrase';
        question: string;
        options: { text: string; isCorrect: boolean }[];
        correctAnswer: any;
        marks: number;
        explanation: string;
        image: string;
      }[];
      duration: number;
      startTime: string;
      maxMarks: number;
      courseId: string;
    } = {

      title: data.title,
      description: data.description,
      questions: [],
      duration: data.duration, // Assuming default
      startTime: data.startTime, // Assuming default
      maxMarks: 0, // Calculated later
      courseId: data.courseId,
    };

    let maxMarks = 0;

    data.questions.forEach((question: QuestionType) => {
      const reformattedQuestion = {
        type: question.type,
        question: question.question,
        options: question.options || [],
        correctAnswer: question.type === "multiple"
          ? question.options.filter(opt => opt.isCorrect).map(opt => opt.text)
          : question.options.find(opt => opt.isCorrect)?.text || question.correctAnswer,
        marks: question.marks,
        explanation: question.explanation,
        image:question.image
      };

      reformatted.questions.push(reformattedQuestion);
      maxMarks += question.marks;
    });

    reformatted.maxMarks = maxMarks;
    return reformatted;
  }
  const handleSubmit = async () => {
    const quizData = { ...quizDetails, questions };
    if (!quizData.courseId) {
        toast.error("Course ID is required.");
        return;
    }


    const reformedData = reformatQuizData(quizData);


    try {
        await createTest(reformedData).unwrap();
        toast.success("Quiz created successfully.");
        window.location.href = `/admin/course/${quizData.courseId}`;
    } catch {
        toast.error("Failed to create quiz.");
    }
};



  return (

    
    <div className="text-gray-900 dark:text-white">

      {
        isLoading ?(
          <Loader/>
        ):(

          <div className="w-full flex min-h-screen">
            <div className="w-[80%]">
              {activeStep === 0 && (
                <QuizDetails
    
                  quizDetails={quizDetails}
                  setQuizDetails={handleQuizDetailsChange}
                  setActiveStep={setActiveStep}
                  handleSubmit={handleSubmit}
                />
              )}
              {activeStep === 1 && (
                <QuestionForm
                  setQuestions={setQuestions}
                  questions={questions}
                  setActiveStep={setActiveStep}
                />
              )}
              {activeStep === 2 && (
                <QuizPreview
                  quizDetails={quizDetails}
                  questions={questions}
                  handleSubmit={handleSubmit}
                  setActiveStep={setActiveStep}
                  isLoading={isLoading}
                />
              )}
            </div>
            <div className="w-[20%] mt-[100px] h-screen fixed z-[-1] top-18 right-0">
              <QuizOptions activeStep={activeStep} setActiveStep={setActiveStep} />
            </div>
          </div>
        )
      }
    </div>
  );
};

export default CreateQuiz;
