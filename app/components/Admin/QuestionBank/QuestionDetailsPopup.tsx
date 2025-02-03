
import React, { useState } from "react";

type QuestionDetailsPopupProps = {
  question: any;
  onClose: () => void;
};

const QuestionDetailsPopup = ({ question, onClose }: QuestionDetailsPopupProps) => {
  const [userAnswer, setUserAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
    setIsCorrect(userAnswer === question.correctAnswer); // Assuming the question has a `correctAnswer` field
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-lg space-y-4">
        <h2 className="text-xl font-bold">Question Details</h2>
        <p>{question.text}</p>
        {submitted ? (
          <div>
            <p className="mt-4">
              {isCorrect ? "Your answer is correct!" : "Your answer is incorrect."}
            </p>
            <p className="text-gray-600">Correct Answer: {question.correctAnswer}</p>
          </div>
        ) : (
          <>
            <input
              type="text"
              placeholder="Enter your answer"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              className="w-full p-2 border rounded-lg"
            />
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              Submit
            </button>
          </>
        )}
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-gray-500 text-white rounded-lg"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default QuestionDetailsPopup;
