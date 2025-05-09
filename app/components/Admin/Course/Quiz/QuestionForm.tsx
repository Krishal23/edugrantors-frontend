import React, { useState, useEffect } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import toast from 'react-hot-toast';
import dynamic from 'next/dynamic';
import Loader from '@/app/components/Loader/Loader';

const SingleCorrectQuestion = dynamic(() => import('./SingleCorrectQuestion'), { 
  loading: () => <Loader message='Loading Single Correct Question...'/>,
});
const MultipleCorrectQuestion = dynamic(() => import('./MultipleCorrectQuestion'), {
  loading: () => <Loader message='Loading Multiple Correct Question...'/>,
});
const NumericalQuestion = dynamic(() => import('./NumericalQuestion'), { 
  loading: () => <Loader message='Loading Numerical Question...'/>,
});
const PhraseQuestion = dynamic(() => import('./PhraseQuestion'), { 
  loading: () => <Loader message='Loading Phrase Question...'/>,
});





const QuestionForm = ({ setActiveStep, questions, setQuestions }: any) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean[]>([]);

  useEffect(() => {
    setIsCollapsed(Array(questions.length).fill(false));
  }, [questions.length]);

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      {
        type: 'single', // Default type
        question: '',
        options: [{ text: '', isCorrect: false }],
        marks: 0,
       correctAnswer:"",
        explanation: '',
        image:'',
      },
    ]);
  };

  const handleRemoveQuestion = (index: number) => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(index, 1);
    setQuestions(updatedQuestions);

    const updatedCollapsed = [...isCollapsed];
    updatedCollapsed.splice(index, 1);
    setIsCollapsed(updatedCollapsed);
  };

  const handleCollapseToggle = (index: number) => {
    const updatedCollapsed = [...isCollapsed];
    updatedCollapsed[index] = !updatedCollapsed[index];
    setIsCollapsed(updatedCollapsed);
  };

  const handleSubmit = () => {
    if (questions.some((q: { question: any; explanation: any; type: string; options: any[]; marks: number; }) => !q.question || !q.explanation || (q.type !== 'phrase' && q.options.some(opt => !opt.text)) || q.marks <= 0)) {
      toast.error('Please ensure all fields are filled before submitting.');
      return;
    }
    setActiveStep(2);
  };

  const handleQuestionTypeChange = (index: number, type: any) => {
    setQuestions((prevQuestions: any) => {
      const updatedQuestions = [...prevQuestions];
      updatedQuestions[index] = { ...updatedQuestions[index], type, options: [] };
      return updatedQuestions;
    });
  };

  return (
    <div className="w-[80%] m-auto mt-4 p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg">
      <h1 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Question Form</h1>

      {questions.map((question:any, index:any) => (
        <div key={index} className="mb-6 border-b pb-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium text-gray-800 dark:text-white">
              Question {index + 1}
            </h2>
            <div className="flex items-center">
              <MdOutlineKeyboardArrowDown
                className="cursor-pointer text-xl dark:text-white text-black mr-2"
                style={{
                  transform: isCollapsed[index] ? 'rotate(180deg)' : 'rotate(0deg)',
                }}
                onClick={() => handleCollapseToggle(index)}
              />
              <AiOutlineDelete
                className="cursor-pointer text-xl text-red-600"
                onClick={() => handleRemoveQuestion(index)}
              />
            </div>
          </div>

          {!isCollapsed[index] && (
            <>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Question Type
                </label>
                <select
                  value={question.type}
                  onChange={(e) => handleQuestionTypeChange(index, e.target.value as any)}
                  className="mt-1 block w-full px-3 py-2 border rounded-md text-gray-900 dark:text-gray-300 dark:bg-gray-700"
                >
                  <option value="single">Single Correct</option>
                  <option value="multiple">Multiple Correct</option>
                  <option value="numerical">Numerical</option>
                  <option value="phrase">Phrase</option>
                </select>
              </div>

              {question.type === 'single' && (
                <SingleCorrectQuestion question={question} setQuestions={setQuestions} index={index} />
              )}
              {question.type === 'multiple' && (
                <MultipleCorrectQuestion question={question} setQuestions={setQuestions} index={index} />
              )}
              {question.type === 'numerical' && (
                <NumericalQuestion question={question} setQuestions={setQuestions} index={index} />
              )}
              {question.type === 'phrase' && (
                <PhraseQuestion question={question} setQuestions={setQuestions} index={index} />
              )}
            </>
          )}
        </div>
      ))}

      <div className="mt-6 flex justify-between">
        <button
          type="button"
          onClick={handleAddQuestion}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          Add New Question
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Submit Questions
        </button>
      </div>
      <button
          onClick={() => setActiveStep(0)}
          className="px-4 py-2 mt-4 bg-gray-400 text-white font-bold rounded-lg shadow-md transform transition duration-300 hover:bg-gray-500 focus:outline-none"
        >
          Back
        </button>
    </div>
  );
};

export default QuestionForm;
