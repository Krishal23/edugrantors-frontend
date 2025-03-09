import React from "react";
import { FaCheckCircle, FaTimesCircle, FaTrashAlt } from "react-icons/fa";

type Option = {
  text: string;
  isCorrect: boolean;
};

type QuestionProps = {
  courseId: any;
  quizId: any;
  questionId: string;
  question: string;
  options: Option[];
  marks: number;
  negativeMarks?: number;
  explanation: string;
  index: number;
  type: string;
  correctAnswer: any;
  image: any;
  isEdit?: boolean;
  handleRemove?: (courseId: string, quizId: string, questionId: string) => void;
};

const QuestionCard: React.FC<QuestionProps> = ({
  courseId,
  quizId,
  correctAnswer,
  negativeMarks,
  questionId,
  question,
  handleRemove,
  type,
  options,
  marks,
  explanation,
  index,
  image,
}) => {
  return (
    <div className="p-6 bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl shadow-lg mb-6 hover:shadow-2xl transition-all duration-300">
      {/* Question Text */}
      <div className="flex justify-between items-center my-2 ">
        <h3 className="text-xl font-semibold text-white">
          Q{index + 1}: {question}
        </h3>
        <div className="text-sm text-gray-300">
          <p className="font-semibold">Question Type: {type}</p>
          <p className="font-semibold">Marks: {marks}</p>
          <p className="font-semibold">Negative Marks: {negativeMarks}</p>
        </div>
      </div>
      <hr />
      {image && (
        <div className="overflow-scroll">

        <img
          src={image?.url}
          alt="img loading..."
          height={1200}
          width={1800}
          className="max-w-[80vw] sm:h-48 xxs:h-16 object-cover rounded-lg m-4"
          />
          </div>
      )}

      {/* Options */}
      <div className="mt-4 space-y-3">
        {options.map((option, optionIndex) => {
          return (
            <div key={optionIndex} className="flex items-center space-x-3">
              <div
                className={`text-lg ${
                  option.isCorrect
                    ? "text-green-400 font-semibold"
                    : "text-white"
                }`}
              >
                {/* {optionIndex} */}
                {optionIndex + 1}: {option.text}{" "}
                {option.isCorrect && (
                  <FaCheckCircle className="inline-block mr-2 text-green-500" />
                )}
              </div>
            </div>
          );
        })}
      </div>
      <br />
      <strong>Correct Answer:</strong>
      <div className="text-green-300">{correctAnswer}</div>

      {/* Marks */}

      <div className="flex justify-between items-end">
        <div className="mt-6 text-sm text-gray-300 space-y-3">
          <p className="font-semibold text-gray-200">Explanation:</p>
          <p className="italic text-gray-400">{explanation}</p>
        </div>
        <button
          onClick={() => handleRemove(courseId, quizId, questionId)}
          className="h-8 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-500 flex items-center"
        >
          <FaTrashAlt className="mr-2" />
          Remove
        </button>
      </div>
      {/* Explanation */}
    </div>
  );
};

export default QuestionCard;
