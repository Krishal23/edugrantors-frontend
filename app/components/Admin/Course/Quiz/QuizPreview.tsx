import React from 'react';
// import { useTheme } from 'next-themes';
import dynamic from 'next/dynamic';
import Loader from '@/app/components/Loader/Loader';

const QuestionCard = dynamic(() => import('@/app/components/Admin/Course/Quiz/QuestionCard'), { 
  loading: () => <Loader message='Loading Question...'/>,
});

const QuizDetailsPreview = dynamic(() => import('@/app/components/Admin/Course/Quiz/QuizDetailsPreview'), { 
  loading: () => <Loader message='Loading Quiz Details...'/>,

});



interface QuizPreviewProps {
  quizDetails: {
    title: string;
    description: string;
    startTime: string;
    duration: number;
    courseId: string;
    quizId: string;
    totalQuestion: number;
    maxMarks: number;
    attemptedBy: { userId: string; name: string; }[];
  };
  questions: {
    question: string;
    options: { text: string; isCorrect: boolean }[];
    marks: number;
    explanation: string;
    type:string;
    correctAnswer: any;
  }[];
  handleSubmit: () => void;
  setActiveStep: (step: number) => void;
  isLoading:any;
}

const QuizPreview: React.FC<QuizPreviewProps> = ({
  quizDetails,
  questions,
  handleSubmit,
  setActiveStep,
  isLoading,
}) => {
  // const { theme } = useTheme();
  
  // const containerClass = theme === 'dark' ? 'text-white' : 'text-gray-900';

  return (
    <div>
      <h2 className={`text-2xl font-bold mx-8 mt-6`}>Quiz Preview</h2>

      {/* Quiz Details */}
      <QuizDetailsPreview quizDetails={quizDetails} />

      {/* Questions */}
      <div className="mt-6 mx-8">
        <h3 className="text-lg font-semibold">Questions</h3>
        {questions.length === 0 ? (
          <p>No questions added yet.</p>
        ) : (
          questions.map((question, index) => (
            <QuestionCard
              key={index}
              index={index}
              question={question.question}
              correctAnswer={question.correctAnswer}
              type={question.type}
              options={question.options}
              marks={question.marks}
              explanation={question.explanation}
            />
          ))
        )}
      </div>




      <div className="flex justify-between mx-8 mt-6">
        <button
          onClick={() => setActiveStep(1)}
          className="px-4 py-2 bg-gray-400 text-white font-bold rounded-lg shadow-md transform transition duration-300 hover:bg-gray-500 focus:outline-none"
        >
          Back
        </button>
        <button
          onClick={handleSubmit}
          className={`px-8 py-2 bg-purple-600 text-white font-bold rounded-lg shadow-md transform transition duration-300 hover:bg-purple-700 hover:scale-105 focus:outline-none
              ${isLoading && 'cursor-wait'}
            `}
            disabled={isLoading}
        >
          {
            isLoading ? (
              <>Uploading</>
            ):(
              <>Submit Quiz</>
            )
          }
          
        </button>
      </div>


    </div>
  );
};

export default QuizPreview;
