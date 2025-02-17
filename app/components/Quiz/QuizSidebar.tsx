import React, { useState } from 'react';

type Props = {
  currentQuestionIndex: number;
  answers: Array<{
    questionId: string;
    selectedAnswer: any;
  }> ;
  quiz: {
    questions: Array<{
      questionId: string;
      question: string;
    }> ;
  };
  onQuestionSelect: (index: number) => void;
  handleSubmit: () => void;
};

const QuizSidebar = ({ currentQuestionIndex, answers, quiz, onQuestionSelect, handleSubmit }: Props) => {
  // State to manage sidebar visibility
  const [isOpen, setIsOpen] = useState(false);

  // Create a mapping of questionId to its corresponding answer
  const answerMap = answers.reduce((map, answer) => {
    map[answer.questionId] = answer;
    return map;
  }, {} as Record<string, { selectedAnswer: any }>);

  // Toggle the sidebar visibility
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* Arrow Button to open/close the sidebar */}
      <button
        onClick={toggleSidebar}
        className="fixed top-1/2 right-0 z-50 p-4 bg-gray-600 text-white rounded-l-full transform -translate-y-1/2 shadow-lg transition-all duration-300"
        style={{
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
        }}
      >
        {/* Left arrow using < symbol */}
        <span
          className={`text-2xl transform transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        >
          &lt; {/* Left-facing < symbol for both states */}
        </span>
      </button>


      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-gray-800 text-gray-200 p-4 transition-transform transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{
          boxShadow: '4px 0 10px rgba(0, 0, 0, 0.4)',
        }}
      >
        <div className="flex flex-col justify-between h-full">
          <div>
            <h3 className="mb-4 text-lg font-bold">QUIZ OVERVIEW</h3>
            <div
              className="grid grid-cols-auto-fit gap-2"
              style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(40px, 1fr))' }}
            >
              {quiz.questions.map((question, index) => {
                const isAnswered = !!answerMap[question.questionId]?.selectedAnswer;
                const isSelected = currentQuestionIndex === index;

                let classNames =
                  'flex justify-center items-center w-10 h-10 border rounded cursor-pointer transition-colors ';
                classNames += isAnswered ? 'bg-green-700 border-green-500 ' : 'bg-gray-700 border-gray-500 ';
                classNames += isSelected ? 'bg-blue-700 border-blue-500' : '';

                return (
                  <div
                    key={question.questionId}
                    className={classNames}
                    onClick={() => onQuestionSelect(index)}
                  >
                    {index + 1}
                  </div>
                );
              })}
            </div>
          </div>
          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="my-4 w-full py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded transition"
          >
            Submit Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizSidebar;
