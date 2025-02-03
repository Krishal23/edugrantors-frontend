import React, { useState } from "react";
import dynamic from "next/dynamic";
import Loader from "@/app/components/Loader/Loader";


const QuestionCard = dynamic(() => import('./QuestionCard'), {
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

interface Props {
  data: Question[];
  courseId: string;
  topic: string;
  subTopic: string;
  type: string;
}

const QuestionsList: React.FC<Props> = ({ data, courseId, topic, subTopic, type }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const questionsPerPage = 5;
  console.log(data)

  const filteredQuestions = data.filter(
    (question) =>
      (!courseId || question.courseId === courseId) &&
      (!topic || question.topic === topic) &&
      (!subTopic || question.subTopic === subTopic) &&
      (!type || question.type === type)
  );

  const totalPages = Math.ceil(filteredQuestions.length / questionsPerPage);
  const paginatedQuestions = filteredQuestions.slice(
    (currentPage - 1) * questionsPerPage,
    currentPage * questionsPerPage
  );
console.log(paginatedQuestions)
  

  return (
    <div className=" dark:bg-gray-900 dark:text-gray-100 p-6">
      <QuestionCard
        // key={question._id}
        questions={paginatedQuestions}
      />
    

      <div className="flex justify-between items-center mt-6">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded ${currentPage === 1 ? "bg-gray-600 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-500"} text-white`}
        >
          Previous
        </button>
        <span className="text-lg text-black dark:text-gray-300">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded ${currentPage === totalPages ? "bg-gray-600 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-500"} text-white`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default QuestionsList;
