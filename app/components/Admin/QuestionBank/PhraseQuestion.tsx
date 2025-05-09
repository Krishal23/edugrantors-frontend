import React from 'react';
import { QuestionType } from './QuestionInfoForm';

type Props = {
  questionData: QuestionType;
  setQuestionData: React.Dispatch<React.SetStateAction<QuestionType>>;
};

const PhraseQuestion = ({ questionData, setQuestionData }: Props) => {
  return (
    <div className="p-4 bg-GRAY-800 shadow-md rounded-lg mt-4">
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
        <label className="text-sm font-semibold text-gray-400">Correct Phrase</label>
        <input
          type="text"
          value={questionData.correctAnswer}
          onChange={(e) => setQuestionData((prev) => ({ ...prev, correctAnswer: e.target.value }))}
          className="w-full p-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          placeholder="Enter the correct phrase"
        />
      </div>
    </div>
  );
};

export default PhraseQuestion;
