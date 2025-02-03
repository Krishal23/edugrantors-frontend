import Link from "next/link";
import { IoChevronBackCircle } from "react-icons/io5";
import { FaQuestionCircle, FaStar } from "react-icons/fa";

type HeaderProps = {
  totalQuestions: number;
  courseId: any;
  title: string;
  description: string;
  duration: number;
  marksScored: number;
  maxMarks: number;
  totalCorrectQuestions: number;
  totalQuestionsAttempted: number;
  startTime: string;
};

const ReviewHeader = ({
  totalQuestions,
  courseId,
  title,
  description,
  duration,
  marksScored,
  maxMarks,
  totalCorrectQuestions,
  totalQuestionsAttempted,
  startTime,
}: HeaderProps) => {
  return (
    <div className="mb-8 relative p-4 dark:bg-gray-800 rounded-lg shadow-lg">
      {/* Back Button */}
      <Link
        href={`/course-access/${courseId}`}
        className="absolute top-4 left-4 flex items-center gap-2 text-white hover:text-gray-200 transition"
      >
        <IoChevronBackCircle size={32} />
        <span className="text-sm md:text-base xxs:text-xs font-medium">
          Back to Course
        </span>
      </Link>

      {/* Header Title */}
      <div className="mt-8 text-center">
        <h2 className="text-3xl md:text-2xl xxs:text-lg font-bold text-white tracking-wide">
          Quiz Review: {title}
        </h2>
        <p className="text-sm md:text-base xxs:text-xs text-gray-200 italic mt-1">
          {description}
        </p>
      </div>

      {/* Stats Section */}
      <div className="flex justify-around mt-6 space-x-6">
        {/* Total Questions */}
        <div className="flex items-center space-x-3">
          <FaQuestionCircle size={28} className="text-yellow-300" />
          <div className="text-white">
            <p className="text-sm md:text-base xxs:text-xs font-medium">
              Total Questions
            </p>
            <p className="text-lg md:text-xl xxs:text-sm font-bold">
              {totalQuestions}
            </p>
          </div>
        </div>

        {/* Total Score */}
        <div className="flex items-center space-x-3">
          <FaStar size={28} className="text-yellow-400" />
          <div className="text-white">
            <p className="text-sm md:text-base xxs:text-xs font-medium">
              Total Score
            </p>
            <p className="text-lg md:text-xl xxs:text-sm font-bold">
              {marksScored} / {maxMarks}
            </p>
          </div>
        </div>

        {/* Correct Answers */}
        <div className="flex items-center space-x-3">
          <FaStar size={28} className="text-green-400" />
          <div className="text-white">
            <p className="text-sm md:text-base xxs:text-xs font-medium">
              Correct Answers
            </p>
            <p className="text-lg md:text-xl xxs:text-sm font-bold">
              {totalCorrectQuestions} / {totalQuestionsAttempted}
            </p>
          </div>
        </div>
      </div>

      {/* Duration and Start Time */}
      <div className="mt-6 text-center text-white">
        <p className="text-sm md:text-base xxs:text-xs font-medium">
          Duration: {duration} minutes
        </p>
        <p className="text-sm md:text-base xxs:text-xs font-medium">
          Start Time: {new Date(startTime).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default ReviewHeader;
