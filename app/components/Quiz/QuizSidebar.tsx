import React from 'react';

type Props = {
  currentQuestionIndex: number;
  answers: Array<{
    questionId: string;
    selectedAnswer: any;
  }>;
  quiz: {
    questions: Array<{
      questionId: string;
      question: string;
    }>;
  };
  onQuestionSelect: (index: number) => void;
  handleSubmit: () => void;
};

const QuizSidebar = ({ currentQuestionIndex, answers, quiz, onQuestionSelect, handleSubmit }: Props) => {
  // Create a mapping of questionId to its corresponding answer
  const answerMap = answers.reduce((map, answer) => {
    map[answer.questionId] = answer;
    return map;
  }, {} as Record<string, { selectedAnswer: any }>);

  return (
    <div className="p-4 py-8 pt-12 border border-gray-700 rounded h-full bg-gray-800 text-gray-200 flex flex-col justify-between">
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
  );
};

export default QuizSidebar;
