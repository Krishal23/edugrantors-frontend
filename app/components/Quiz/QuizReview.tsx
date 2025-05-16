import { useGetTestReviewQuery } from '@/app/redux/features/courses/coursesApi';
import React from 'react';
import dynamic from 'next/dynamic';
import Loader from '../Loader/Loader';
import { useRouter } from 'next/navigation';

const ReviewHeader = dynamic(() => import('./ReviewHeader'), {
  loading: () => <Loader message="Loading Header..." />
});
const ReviewCard = dynamic(() => import('./ReviewCard'), {
  loading: () => <Loader message="Loading Questions..." />
});


type Props = {
  quizId: string;
  courseId: string;
  userId?: any;
};


const QuizReview = ({ quizId, courseId, userId }: Props) => {
  const { data, error, isLoading } = useGetTestReviewQuery({ courseId, quizId, userId });
  console.log(userId)

  const router = useRouter();

  if (isLoading) return <Loader message='Loading' />;
  if (
    error &&
    typeof error === "object" &&
    "data" in error &&
    error.data &&
    typeof error.data === "object" &&
    "message" in error.data
  ) {
    router.push("/unauthorized");
    return <Loader message={(error.data as { message: string }).message} />;
  }

  if (error) return <Loader message="Something went wrong." />;

  if (!data) return <div>No review data found</div>;

  // console.log("Quiz Review Data", data);
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
          title={title}
          description={description}
          duration={duration}
          marksScored={marksScored}
          maxMarks={maxMarks}
          totalQuestions={questions.length}
          totalCorrectQuestions={totalCorrectQuestions}
          totalQuestionsAttempted={totalQuestionsAttempted}
          startTime={startTime}
        />

        {questions.map((question: any, index: any) => (
          <ReviewCard key={index} index={index} question={question} />
        ))}
      </div>
    </div>
  );
};

export default QuizReview;
