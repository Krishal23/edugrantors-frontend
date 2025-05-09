import React from 'react';
import { AiOutlineDelete, AiOutlinePlusCircle } from 'react-icons/ai';



const SingleCorrectQuestion = ({ questionData, setQuestionData }: any) => {
  const handleOptionChange = (index: number, text: string) => {
    const updatedOptions = [...questionData.options];
    updatedOptions[index] = { text, isCorrect: updatedOptions[index].isCorrect };
    setQuestionData((prev:any) => ({ ...prev, options: updatedOptions }));
  };

  const handleCorrectAnswerChange = (index: number) => {
    const updatedOptions = [...questionData.options];
    updatedOptions.forEach((opt, i) => (opt.isCorrect = i === index));
    setQuestionData((prev:any) => ({
      ...prev,
      options: updatedOptions,
      correctAnswer: updatedOptions[index].text,
    }));
  };

  const handleAddOption = () => {
    setQuestionData((prev:any) => ({
      ...prev,
      options: [...prev.options, { text: '', isCorrect: false }],
    }));
  };

  const handleRemoveOption = (index: number) => {
    const updatedOptions = questionData.options.filter((_:any, i:any) => i !== index);
    setQuestionData((prev:any) => ({ ...prev, options: updatedOptions }));
  };

  return (
    <div className="p-4 bg-gray-800 shadow-md rounded-lg mt-4">
      <div className="mb-4">
        <label className="text-sm font-semibold text-gray-400">Question</label>
        <input
          type="text"
          value={questionData.question}
          onChange={(e) => setQuestionData((prev:any) => ({ ...prev, question: e.target.value }))}
          className="w-full p-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          placeholder="Enter the question here"
        />
      </div>

      
      <div className="mb-4">
        <label className="text-sm font-semibold text-gray-400">Options (Choose one correct)</label>
        {questionData.options.map((option:any, index:any) => (
          <div key={index} className="flex items-center justify-between mt-2">
            <input
              type="text"
              value={option.text}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              className="w-3/4 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder={`Option ${index + 1}`}
            />
            <div className="flex items-center">
              <input
                type="radio"
                checked={option.isCorrect}
                onChange={() => handleCorrectAnswerChange(index)}
                className="mr-2"
              />
              <span className="text-sm text-gray-700">Correct</span>
              <AiOutlineDelete
                onClick={() => handleRemoveOption(index)}
                className="ml-2 text-red-600 cursor-pointer"
              />
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddOption}
          className="mt-4 px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700 transition-all"
        >
          <AiOutlinePlusCircle className="inline-block mr-2" />
          Add Option
        </button>
      </div>
    </div>
  );
};

export default SingleCorrectQuestion;
