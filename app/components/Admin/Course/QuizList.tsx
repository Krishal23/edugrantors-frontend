import React, { useState } from "react";
import AttemptsPopup from "./AttemptsPopup";
import { SiQuizlet } from "react-icons/si";
import { MdOnlinePrediction, MdEditSquare } from "react-icons/md";
import { GrSend } from "react-icons/gr";
import { FaArchive, FaUsers } from "react-icons/fa";
import Link from "next/link";

const QuizList = ({ courseData,setQuizLive }:  any ) => {
  const [showAttemptsPopup, setShowAttemptsPopup] = useState<{ courseId: string; quizId: string } | null>(null);

  return (
    <div className="mt-8">
      <h2 className={`text-2xl font-semibold mb-6 text-white`}>Quizzes</h2>
      <div className="flex-row">
        {courseData?.quizzes?.map((quiz: any, index: number) => (
          <div
            key={index}
            className="relative p-3 mb-2 border border-gray-700 rounded-lg shadow-xl bg-gradient-to-br from-transparent to-indigo-950 text-white transform hover:scale-105 transition-transform duration-300"
          >
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold">{`Quiz ${index + 1}: ${quiz.title || "Unnamed"}`}</h3>
              {quiz?.isLive && <MdOnlinePrediction color="green" size={30} />}
            </div>

            <div className="flex gap-3 justify-between">
              <p className="text-sm text-gray-200 w-[480px] h-[40px] overflow-hidden">
                {quiz.description}
              </p>

              <div className="flex gap-2">
                <Link
                  href={`/admin/quiz/${courseData._id}/${quiz._id}`}
                  className="flex gap-2 border px-6 py-3 text-sm font-semibold text-center from-indigo-700 to-indigo-800 text-white rounded-full shadow-lg hover:bg-indigo-400 transition-all"
                >
                  <SiQuizlet className="text-gray-400" size={20} />
                  Open Quiz
                </Link>

                {/* View Attempts Button */}
                <button
                  onClick={() => setShowAttemptsPopup({ courseId: courseData._id, quizId: quiz._id })}
                  className="flex gap-2 border px-6 py-3 text-sm font-semibold text-center from-indigo-700 to-indigo-800 text-white rounded-full shadow-lg hover:bg-indigo-400 transition-all"
                >
                  <FaUsers className="text-gray-400" size={20} />
                  View Attempts
                </button>

                {!quiz?.isLive ? (
                  <>
                    <Link
                      href={`/admin/edit-quiz/${courseData._id}/${quiz._id}`}
                      className="flex gap-2 border px-6 py-3 text-sm font-semibold text-center from-indigo-700 to-indigo-800 text-white rounded-full shadow-lg hover:bg-indigo-400 transition-all"
                    >
                      <MdEditSquare className="text-gray-400" size={20} />
                      Edit Quiz
                    </Link>
                    <button
                      onClick={() => setQuizLive(courseData._id, quiz._id, true)}
                      className="flex gap-2 border px-6 py-3 text-sm font-semibold text-center from-indigo-700 to-indigo-800 text-white rounded-full shadow-lg hover:bg-indigo-400 transition-all"
                    >
                      <GrSend className="text-gray-400" size={20} />
                      Live Quiz
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setQuizLive(courseData._id, quiz._id, false)}
                    className="flex gap-2 border px-6 py-3 text-sm font-semibold text-center from-red-700 to-red-800 text-white rounded-full shadow-lg hover:bg-red-500 transition-all"
                  >
                    <FaArchive className="text-gray-400" size={20} />
                    Archive Quiz
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Show Attempts Popup */}
      {showAttemptsPopup && (
        <AttemptsPopup
          courseId={showAttemptsPopup.courseId}
          quizId={showAttemptsPopup.quizId}
          onClose={() => setShowAttemptsPopup(null)}
        />
      )}
    </div>
  );
};

export default QuizList;
