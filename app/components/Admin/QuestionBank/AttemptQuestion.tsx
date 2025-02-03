import React, { useState } from "react";
import toast from "react-hot-toast";

type Props = {
  onClose: () => void;
  attempts: any[]; // Accept an array of questions
};

const AttemptQuestion = ({ onClose, attempts }: Props) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const currentQuestion = attempts[currentQuestionIndex]; // Current question to display

  const handleSubmit = () => {
    if (selectedOption === currentQuestion.correctAnswer) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
    setShowExplanation(true);
  };

  const handleNext = () => {
    if (currentQuestionIndex < attempts.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOption(null); // Reset the selected option
      setShowExplanation(false); // Hide explanation until the next question
      setIsCorrect(null); // Reset correctness state
    } else {
      toast.error("No more questions!"); // Or handle differently
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
      setSelectedOption(null); // Reset the selected option
      setShowExplanation(false); // Hide explanation
      setIsCorrect(null); // Reset correctness state
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
      <div className="bg-gray-800 w-full h-full max-w-full max-h-full p-6 overflow-auto rounded-lg shadow-lg relative text-gray-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-200"
        >
          ✖
        </button>

        <div className="flex flex-col lg:flex-row w-full h-full">
          <div className="w-full lg:w-2/3 p-4 overflow-auto">
            <h2 className="text-lg font-bold mb-4">Attempt Question</h2>
            <div className="mb-4">
              {currentQuestion?.image?.url && (
                <img
                  src={currentQuestion?.image?.url}
                  alt="Question Illustration"
                  height={1200}
                  width={1800}
                  className="w-full h-auto max-h-40 object-contain mb-4 rounded-md border border-gray-600"
                />
              )}
              <p className="text-gray-300 font-medium">
                {currentQuestion.question}
              </p>
            </div>

            <div className="space-y-3">
              {currentQuestion.options.map((option: any) => (
                <label
                  key={option.text}
                  className={`block p-3 border rounded-lg cursor-pointer ${
                    selectedOption === option.text
                      ? "bg-blue-700 border-blue-500 text-white"
                      : "border-gray-600 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  <input
                    type="radio"
                    name="options"
                    value={option.text}
                    className="hidden"
                    onChange={() => setSelectedOption(option.text)}
                  />
                  {option.text}
                </label>
              ))}
            </div>

            <div className="mt-6 flex justify-between">
              <button
                onClick={handleBack}
                disabled={currentQuestionIndex === 0}
                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 disabled:bg-gray-500"
              >
                Back
              </button>
              <div className="flex gap-2">
                <button
                  onClick={handleSubmit}
                  disabled={!selectedOption}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg disabled:bg-gray-500"
                >
                  Submit
                </button>
                <button
                  onClick={handleNext}
                  disabled={currentQuestionIndex === attempts.length - 1}
                  className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 disabled:bg-gray-500"
                >
                  Next
                </button>
              </div>
            </div>
          </div>

          {showExplanation && (
            <div className="w-full lg:w-1/3 p-4 mt-4 lg:mt-0 border bg-gray-700 rounded-lg">
              <h3 className="text-lg font-bold mb-2">Explanation</h3>
              <p
                className={`font-semibold ${
                  isCorrect ? "text-green-500" : "text-red-500"
                }`}
              >
                {isCorrect ? "Correct!" : "Incorrect!"}
              </p>
              <p className="text-gray-300 mt-2">
                {currentQuestion.explanation}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AttemptQuestion;
