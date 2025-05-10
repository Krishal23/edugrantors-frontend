import { FaCheckCircle, FaDownload, FaTimesCircle } from "react-icons/fa";
import { MdOutlineDoNotDisturb } from "react-icons/md";

type Option = {
  text: string;
};

type Answer = {
  type: string;
  question: string;
  options: Option[];
  selectedAnswer: string | string[];
  correctAnswer: string | string[];
  isCorrect: boolean;
  explanation: string;
  marks: number;
  negativeMarks: number;
  image: any;
  imageExplain: any;
  isAttempted: boolean;
};

type CardProps = {
  question: Answer;
  index: any;
};

const ReviewCard = ({ question: answer, index }: CardProps) => {
  console.log(answer);
  if (!answer?.isAttempted) {
    return (
      <div className="p-6 bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl shadow-lg mb-6 hover:shadow-2xl transition-all duration-300">
        <h3 className="text-xl font-semibold text-white">
          Q{index + 1}: {answer.question}
        </h3>

        <div className="mt-4 text-gray-300">
          <p className="text-indigo-400 text-md font-semibold">
            This question was not attempted.
          </p>
        </div>
        {/* Image */}
        {/* {answer?.image?.url && (
          <img
            src={answer?.image?.url}
            alt="img loading..."
            height={300}
            width={500}
            className="max-w-[80vw] h md:h-80 xxs:h-60 object-cover rounded-lg m-4"
          />
        )} */}

        {answer?.image?.url && (
          <div className="mb-3 sm:mb-4">
            <img
              src={answer.image.url || "/placeholder.svg"}
              alt="Question"
              width={500}
              height={300}
              className="max-w-full h-auto rounded"
            />
          </div>
        )}


        {/* Correct Answer and Explanation */}
        <div className="mt-6 text-sm text-gray-300">
          <p className="font-semibold text-gray-200">Correct Answer:</p>
          <p className="font-semibold text-green-400">
            {Array.isArray(answer.correctAnswer)
              ? answer.correctAnswer.join(", ")
              : answer.correctAnswer}
          </p>
          {answer.explanation && (
            <p className="italic text-gray-400">
              Explanation: {answer.explanation}
            </p>
            
          )}
           {answer?.imageExplain?.url && (
          <div className="mb-3 sm:mb-4">
            <img
              src={answer.imageExplain.url || "/placeholder.svg"}
              alt="Question"
              width={500}
              height={300}
              className="max-w-full h-auto rounded"
            />
          </div>
        )}
          
        </div>

        {/* Marks */}
        <p className="mt-6 text-sm font-semibold text-red-400">
          Marks: 0 (Unattempted)
        </p>
        <div className="mt-6 flex justify-between items-center">
          {/* Conditional rendering of check/cross icon */}
          <div className="text-4xl transform transition-transform hover:scale-110">
            <MdOutlineDoNotDisturb className="text-gray-500" />
          </div>
          <div className="text-sm text-gray-500 italic">UnAttempted</div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl shadow-lg mb-6 hover:shadow-2xl transition-all duration-300">
      {/* Question Text */}
      <h3 className="text-xl font-semibold text-white">
        Q{index + 1}: {answer.question}
      </h3>

      {/* Image */}
      {answer?.image?.url && (
        <>
        <div className="max-w-[80vw] md:h-80 xxs:h-60 overflow-x-scroll">

          <img
            src={answer?.image?.url}
            alt="img loading..."
            width={600}
            height={900}
            className=" object-scale-down rounded-lg m-4"
          />
        </div>
      <a href={answer.image.url}><FaDownload size={20}/></a>
        </>

      )}

      {/* Options */}
      <div className="mt-4 space-y-3">
        {answer.options.map((option, optionIndex) => {
          const isSelected = Array.isArray(answer.selectedAnswer)
            ? answer.selectedAnswer.includes(option.text)
            : answer.selectedAnswer === option.text;

          const isCorrect = Array.isArray(answer.correctAnswer)
            ? answer.correctAnswer.includes(option.text)
            : answer.correctAnswer === option.text;

          return (
            <div key={optionIndex} className="flex items-center space-x-3">
              <input
                type="radio"
                name={`question-${index}`}
                disabled
                checked={isSelected}
                className={`h-6 w-6 text-blue-500 border-gray-600 focus:ring-2 transition-all duration-200 ${
                  isCorrect ? "bg-green-500" : ""
                }`}
              />
              <label
                className={`text-lg ${
                  isSelected
                    ? isCorrect
                      ? "font-semibold text-green-400"
                      : "text-red-600 font-semibold"
                    : "text-white"
                }`}
              >
                {option.text}
              </label>
            </div>
          );
        })}
      </div>

      {/* Display selected answer */}
      <div className="mt-4 text-sm text-gray-300">
        <p className="font-semibold">Your Answer:</p>
        <p className="font-normal">
          {Array.isArray(answer.selectedAnswer)
            ? answer.selectedAnswer.join(", ")
            : answer.selectedAnswer}
        </p>
      </div>

      {/* Review Section */}
      <div className="mt-6 text-sm text-gray-300 space-y-3">
        <p className="font-semibold text-gray-200">Correct Answer:</p>
        <p className="font-semibold text-green-400">
          {Array.isArray(answer.correctAnswer)
            ? answer.correctAnswer.join(", ")
            : answer.correctAnswer}
        </p>
        <p className="italic text-gray-400">
          Explanation: {answer.explanation}
        </p>
        
           {answer?.imageExplain?.url && (
          <div className="mb-3 sm:mb-4 flex flex-col items-start">
            <a href={answer.imageExplain.url}><FaDownload size={20}/></a>
            <img
              src={answer.imageExplain.url || "/placeholder.svg"}
              alt="Question"
              width={500}
              height={300}
              className="max-w-full h-auto rounded mt-4"
            />
          </div>
        )}

        {/* Marks */}
        <p
          className={`text-sm font-semibold ${
            answer.isCorrect ? "text-green-400" : "text-red-400"
          }`}
        >
          Marks: {answer.isCorrect ? answer.marks : -answer.negativeMarks}
        </p>
      </div>

      {/* Icon Section */}
      <div className="mt-6 flex justify-between items-center">
        {/* Conditional rendering of check/cross icon */}
        <div className="text-4xl transform transition-transform hover:scale-110">
          {answer.isCorrect ? (
            <FaCheckCircle className="text-green-500" />
          ) : (
            <FaTimesCircle className="text-red-500" />
          )}
        </div>
        <div className="text-sm text-gray-500 italic">
          {answer.isCorrect ? "Correct" : "Incorrect"}
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
