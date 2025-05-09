import { useGetTestReviewQuery } from '@/app/redux/features/courses/coursesApi';
import React from 'react';
import dynamic from 'next/dynamic';
import Loader from '../Loader/Loader';

const ReviewHeader = dynamic(() => import('./ReviewHeader'), { 
  loading: () => <Loader message="Loading Header..." /> 
});
const ReviewCard = dynamic(() => import('./ReviewCard'), { 
  loading: () => <Loader message="Loading Questions..." /> 
});


type Props = {
  quizId: string;
  courseId: string;
};

const QuizReview = ({ quizId, courseId }: Props) => {
  const { data, error, isLoading } = useGetTestReviewQuery({ courseId, quizId });

  if (isLoading) return <Loader message='Loading'/>;
  if (error) return <Loader message='Some Error Occured'/>;

  if (!data ) return <div>No review data found</div>;

  const {
    title,
    description,
    duration,
    marksScored,
    maxMarks,
    questions,
    totalCorrectQuestions,
    totalQuestionsAttempted,
    startTime,

  } = data.quiz;
  
  return (
    <div className="flex">
      <div className="flex-1 p-6 min-w-screen overflow-x-scroll space-y-6">
        <ReviewHeader 
        courseId={courseId} 
        title= {title}
        description={description}
        duration={duration}
        marksScored={marksScored}
        maxMarks={maxMarks}
        totalQuestions={questions.length}
        totalCorrectQuestions={totalCorrectQuestions}
        totalQuestionsAttempted={totalQuestionsAttempted}
        startTime={startTime}
        />

        {questions.map((question:any, index:any) => (
          <ReviewCard key={index} index={index}  question={question} />
        ))}
      </div>
    </div>
  );
};

export default QuizReview;
