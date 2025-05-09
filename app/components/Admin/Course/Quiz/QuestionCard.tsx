import React from "react";
import { FaCheckCircle, FaTrashAlt } from "react-icons/fa";

const QuestionCard = ({
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
  imageExplain
}: any) => {
  // console.log(imageExplain);
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
        {options.map((option: any, optionIndex: any) => {
          return (
            <div key={optionIndex} className="flex items-center space-x-3">
              <div
                className={`text-lg ${option.isCorrect
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

      <div className="flex flex-col  justify-between items-start">
        <div className="mt-6 text-sm text-gray-300 space-y-3">
          <p className="font-semibold text-gray-200">Explanation:</p>
          <p className="italic text-gray-400">{explanation}</p>

        </div>
        <div>

          {imageExplain && (
            <div >
              <a
                href={imageExplain?.url}
                download
                className="text-blue-500 underline mt-2 block text-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5 mr-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 16.5v-13m0 13l-3.75-3.75M12 16.5l3.75-3.75M4.5 19.5h15"
                  />
                </svg>
              </a>
              <img
                src={imageExplain?.url}
                alt="img loading..."
                height={600}
                width={800}
                className="max-w-[80vw] sm:h-72 xxs:h-16 object-contain rounded-lg m-4"
              />
              
            </div>
          )}
        </div>
        <button
          onClick={() => handleRemove(courseId, quizId, questionId)}
          className="h-8 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-500 flex items-center"
        >
          <FaTrashAlt className="mr-2" />
          Remove
        </button>
      </div>


    </div>
  );
};

export default QuestionCard;
