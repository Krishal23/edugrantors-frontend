import React, { useState } from "react";
import toast from "react-hot-toast";
import Loader from "@/app/components/Loader/Loader";
import dynamic from "next/dynamic";

const QuestionModal = dynamic(() => import("./QuestionModal"), {
  loading: () => <Loader message="Loading Terms and Conditions..." />,
});

interface Question {
  _id: string;
  question: string;
  courseId: string;
  topic: string;
  subTopic: string;
  type: string;
  marks: number;
  negativeMarks: number;
  explanation: string;
  options: { text: string; isCorrect: boolean }[];
  correctAnswer: string | string[];
  image?: { url: string };
}

interface QuestionCardProps {
  questions: Question[];
}

const QuestionCard: React.FC<QuestionCardProps> = ({ questions }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const questionsPerPage = 5;

  const indexOfLastQuestion = currentPage * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  const currentQuestions = questions.slice(indexOfFirstQuestion, indexOfLastQuestion);

  const currentQuestion = currentQuestionIndex !== null ? questions[currentQuestionIndex] : null;

  const handleAttempt = (index: number) => {
    setCurrentQuestionIndex(index);
    setSelectedOption(null);
    setIsSubmitted(false);
  };

  const handleSubmit = () => {
    toast.success(`Submitting`);
    setIsSubmitted(true);
  };

  const handleNext = () => {
    if (currentQuestionIndex !== null && currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => (prevIndex !== null ? prevIndex + 1 : null));
      setSelectedOption(null);
      setIsSubmitted(false);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex !== null && currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prevIndex) => (prevIndex !== null ? prevIndex - 1 : null));
      setSelectedOption(null);
      setIsSubmitted(false);
    }
  };

  const closeModal = () => {
    setCurrentQuestionIndex(null);
  };

  return (
    <div className="p-4 md:p-6 text-black dark:bg-gray-900 dark:text-gray-100">
      {/* Render a list of questions */}
      {currentQuestions.map((question, index) => (
        <div
          key={question._id}
          className="border border-gray-700 flex flex-col md:flex-row justify-between items-start md:items-center rounded-md mb-4 p-4 shadow-md dark:bg-gray-800 dark:hover:bg-gray-700 transition-all"
        >
          <div className="font-medium text-lg md:text-xl mb-2 md:mb-0 w-full md:w-auto">
            {question.question}
          </div>
          <button
            onClick={() => handleAttempt(index + indexOfFirstQuestion)}
            className="mt-3 md:mt-0 px-4 md:px-6 py-2 rounded bg-blue-600 hover:bg-blue-500 transition-all text-white"
          >
            Attempt Question
          </button>
        </div>
      ))}

      {currentQuestion && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-95 flex justify-center items-center p-4">
          <div className="bg-gray-900 max-h-[90vh] w-full md:max-w-xl overflow-y-scroll p-6 rounded-lg shadow-lg relative">
            <QuestionModal
              question={currentQuestion}
              selectedOption={selectedOption}
              isSubmitted={isSubmitted}
              handleOptionChange={setSelectedOption}
              handleSubmit={handleSubmit}
              handlePrevious={handlePrevious}
              handleNext={handleNext}
              closeModal={closeModal}
              currentQuestionIndex={currentQuestionIndex}
              totalQuestions={questions.length}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionCard;
