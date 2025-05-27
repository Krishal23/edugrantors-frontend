import {  QuestionType } from '@/app/types/question';
import EvaluateAnswer from "@/app/utils/EvaluateAnswer";
import React from "react";


// QuestionModal Component
const QuestionModal= ({
  question,
  selectedOption,
  isSubmitted,
  handleOptionChange,
  handleSubmit,
  handlePrevious,
  handleNext,
  closeModal,
  currentQuestionIndex,
  totalQuestions,
}:any) => {

  console.log(question);
  if (!question) return null;

  const { isCorrect, userAnswer } = isSubmitted
    ? EvaluateAnswer(question, selectedOption)
    : { isCorrect: false, userAnswer: "" };

  const renderOptions = () => {
    console.log("hello")
    switch (question.type) {
      case QuestionType.Single:
        return question.options?.map((option:any, index:any) => (
          <div key={index} className="flex items-center space-x-2 mb-2">
            <input
              type="radio"
              name="option"
              value={index}
              checked={selectedOption === index}
              onChange={() => handleOptionChange(index)}
              className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-gray-300 text-sm sm:text-base">
              {option.text}
            </span>
          </div>
        ));

      case QuestionType.Multiple:
        return question.options?.map((option:any, index:any) => (
          <div key={index} className="flex items-center space-x-2 mb-2">
            <input
              type="checkbox"
              name={`option-${index}`}
              value={index}
              checked={Array.isArray(selectedOption) && selectedOption.includes(index)}
              onChange={() => {
                const updatedSelection = Array.isArray(selectedOption) ? [...selectedOption] : [];
                const indexPosition = updatedSelection.indexOf(index);
                if (indexPosition === -1) {
                  updatedSelection.push(index);
                } else {
                  updatedSelection.splice(indexPosition, 1);
                }
                handleOptionChange(updatedSelection);
              }}
              className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-gray-300 text-sm sm:text-base">
              {option.text}
            </span>
          </div>
        ));

      case QuestionType.Numerical:
        return (
          <input
            type="number"
            value={typeof selectedOption === 'number' ? selectedOption : ''}
            onChange={(e) => handleOptionChange(Number(e.target.value) || 0)}
            className="w-full p-2 bg-gray-700 text-gray-300 rounded text-sm sm:text-base"
            placeholder="Enter your answer"
          />
        );

      case QuestionType.Phrase:
        return (
          <textarea
            value={typeof selectedOption === 'string' ? selectedOption : ''}
            onChange={(e) => handleOptionChange(e.target.value)}
            className="w-full p-2 bg-gray-700 text-gray-300 rounded text-sm sm:text-base"
            placeholder="Type your answer"
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-95 flex justify-center items-center p-4 sm:p-6">
      <div className="bg-gray-900 max-h-[90vh] overflow-y-auto p-4 sm:p-6 rounded-lg shadow-lg w-full max-w-xl relative">
        <button
          onClick={closeModal}
          className="absolute top-2 right-2 sm:top-3 sm:right-3 text-gray-400 hover:text-gray-200 transition-all text-lg sm:text-xl"
          aria-label="Close modal"
        >
          ✖
        </button>
        <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-300">
          {question.question}
        </h2>
        {question.image?.url && (
          <div className="mb-3 sm:mb-4">
            <img
              src={question.image.url || "/placeholder.svg"}
              alt="Question"
              width={500}
              height={300}
              className="max-w-full h-auto rounded"
            />
          </div>
        )}
        {!isSubmitted ? (
          <div className="space-y-3 sm:space-y-4">
            {renderOptions()}
            <button
              onClick={handleSubmit}
              disabled={selectedOption === null}
              className="mt-3 sm:mt-4 px-4 sm:px-6 py-2 bg-green-600 hover:bg-green-500 text-white rounded disabled:bg-gray-600 text-sm sm:text-base w-full"
            >
              Submit Answer
            </button>
          </div>
        ) : (
          <div className="mt-3 sm:mt-4 text-gray-300 text-sm sm:text-base">
            <p>
              <strong>Correct Answer:</strong>{" "}
              {Array.isArray(question.correctAnswer)
                ? question.correctAnswer.join(", ")
                : question.correctAnswer}
            </p>
            <p
              className={`mt-2 ${
                isCorrect ? "text-green-500" : "text-red-500"
              }`}
            >
              {isCorrect
                ? "Your answer is correct!"
                : "Your answer is incorrect."}
            </p>
            <p className="mt-2">
              <strong>Your Answer:</strong>{" "}
              {userAnswer || "No answer selected."}
            </p>
            <p className="mt-2">
              <strong>Explanation:</strong> {question.explanation}
              {
                question.imageExplain?.url && (
                  <img
                    src={question.imageExplain.url}
                    alt="Explanation"
                    className="mt-2 rounded"
                  />
                )
              }
            </p>
          </div>
        )}
        <div className="mt-4 sm:mt-6 flex justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className={`px-4 sm:px-6 py-2 rounded text-sm sm:text-base w-full sm:w-auto ${
              currentQuestionIndex === 0
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-500 text-white"
            }`}
          >
            PREV
          </button>
          <button
            onClick={handleNext}
            disabled={currentQuestionIndex === totalQuestions - 1}
            className={`px-4 sm:px-6 py-2 rounded text-sm sm:text-base w-full sm:w-auto ${
              currentQuestionIndex === totalQuestions - 1
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-500 text-white"
            }`}
          >
            NEXT
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(QuestionModal);
