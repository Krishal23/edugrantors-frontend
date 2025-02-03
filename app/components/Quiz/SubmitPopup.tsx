import React from 'react';

type SubmitPopupProps = {
  answers: any[];
  onClose: () => void;
  onConfirm: () => void;
};

const SubmitPopup = ({ answers, onClose, onConfirm }: SubmitPopupProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-4/5 max-w-md rounded-lg shadow-lg p-6 space-y-4">
        <h3 className="text-xl font-semibold text-gray-800">Review Your Answers</h3>
        <ul className="space-y-3">
          {answers.map((answer, index) => (
            <li key={index} className="bg-gray-100 p-3 rounded-lg">
              <p className="font-medium text-gray-900 ">Question {index + 1}:</p>
              <p className="text-gray-700">{JSON.stringify(answer.selectedAnswer)}</p>
            </li>
          ))}
        </ul>
        <h3 className="text-xl font-semibold text-gray-800 ">Are You Sure To Submit!</h3>
        <div className="flex justify-end sm:text-lg text-sm space-x-3 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 sm:text-lg text-sm bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
          >
            Back to Quiz
          </button>
          <button
            onClick={onConfirm}
            className="sm:px-4 sm:py-2 px-2 py-1 sm:text-lg text-xs bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Confirm Submit
          </button>
        </div>
      </div>
      
    </div>
  );
};

export default SubmitPopup;
