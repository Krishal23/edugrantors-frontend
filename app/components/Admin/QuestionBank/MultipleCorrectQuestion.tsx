import React from 'react';
import { AiOutlineDelete, AiOutlinePlusCircle } from 'react-icons/ai';
import { QuestionType } from './QuestionInfoForm';

type Props = {
  questionData: QuestionType;
  setQuestionData: React.Dispatch<React.SetStateAction<QuestionType>>;
};

const MultipleCorrectQuestion = ({ questionData, setQuestionData }: Props) => {
  const handleOptionChange = (index: number, text: string) => {
    const updatedOptions = [...questionData.options];
    updatedOptions[index] = { ...updatedOptions[index], text };
    setQuestionData((prev) => ({ ...prev, options: updatedOptions }));
  };

  const handleCorrectAnswerChange = (index: number) => {
    const updatedOptions = [...questionData.options];
    updatedOptions[index] = { ...updatedOptions[index], isCorrect: !updatedOptions[index].isCorrect };

    const correctAnswers = updatedOptions.filter((opt) => opt.isCorrect).map((opt) => opt.text);

    setQuestionData((prev) => ({
      ...prev,
      options: updatedOptions,
      correctAnswer: correctAnswers,
    }));
  };

  const handleAddOption = () => {
    setQuestionData((prev) => ({
      ...prev,
      options: [...prev.options, { text: '', isCorrect: false }],
    }));
  };

  const handleRemoveOption = (index: number) => {
    const updatedOptions = questionData.options.filter((_, i) => i !== index);
    setQuestionData((prev) => ({ ...prev, options: updatedOptions }));
  };

  return (
    <div className="p-4 bg-gray-800 shadow-md rounded-lg mt-4">
      <div className="mb-4">
        <label className="text-sm font-semibold text-gray-400">Question</label>
        <input
          type="text"
          value={questionData.question}
          onChange={(e) => setQuestionData((prev) => ({ ...prev, question: e.target.value }))}
          className="w-full p-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          placeholder="Enter the question here"
        />
      </div>

      <div className="mb-4">
        <label className="text-sm font-semibold text-gray-400">Options (Select multiple correct options)</label>
        {questionData.options.map((option, index) => (
          <div key={index} className="flex items-center space-x-3 mt-2">
            <input
              type="text"
              value={option.text}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Option text"
            />
            <div className="flex items-center space-x-1">
              <input
                type="checkbox"
                checked={option.isCorrect}
                onChange={() => handleCorrectAnswerChange(index)}
                className="h-5 w-5"
              />
              <span className="text-sm text-gray-400">Correct</span>
              <AiOutlineDelete
                onClick={() => handleRemoveOption(index)}
                className="cursor-pointer text-red-500"
              />
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddOption}
          className="mt-4 flex items-center text-blue-600 hover:underline"
        >
          <AiOutlinePlusCircle className="mr-2" />
          Add Option
        </button>
      </div>
    </div>
  );
};

export default MultipleCorrectQuestion;
