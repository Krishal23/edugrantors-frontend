import { useGetUsersMarksAdminQuery } from "@/app/redux/features/courses/coursesApi";
import React from "react";
import { FaTimes, FaDownload } from "react-icons/fa";
import * as XLSX from "xlsx";

const AttemptsPopup = ({ courseId, quizId, onClose }: any) => {
  const { data, isLoading, isError } = useGetUsersMarksAdminQuery({ courseId, quizId });
  // console.log(courseId, quizId);

  // console.log(data)

  // Function to Download Data as Excel
  const downloadExcel = () => {
    if (!data?.results?.length) return;

    const worksheet = XLSX.utils.json_to_sheet(
      data.results.map((attempt: any, index: number) => ({
        "S.No": index + 1,
        "User ID": attempt.userId,
        Name: attempt.name,
        "Total Questions Attempted": attempt.totalQuestionsAttempted,
        "total Correct Answers": attempt.totalCorrectQuestions,
        "Marks Scored": attempt.marksScored,
      }))
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Quiz Attempts");
    XLSX.writeFile(workbook, `Quiz_Attempts_${quizId}.xlsx`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="p-6 bg-gray-800 text-white rounded-lg shadow-lg w-[500px]">
        <div className="flex justify-between max-h-[70vh] items-center mb-4">
          <h3 className="text-lg font-semibold">Quiz Attempts</h3>
          <button onClick={onClose} className="text-red-400 hover:text-red-500">
            <FaTimes size={20} />
          </button>
        </div>

        {isLoading && <p>Loading attempts...</p>}
        {isError && <p className="text-red-500">Failed to fetch attempts.</p>}

        {data?.results?.length ? (
          <>
            <ul className="space-y-3">
              {data.results.map((attempt: any, index: number) => (
                <li
                  key={index}
                  className="flex justify-between p-3 border border-gray-700 rounded-lg bg-gray-900"
                >
                  <span className="font-medium">{attempt.name}</span>
                  {/* <span className="text-gray-400">{attempt.userId}</span> */}
                  {/* <span className="text-gray-400">
                    {attempt.totalQuestionsAttempted} / {attempt.totalQuestions}
                  </span> */}
                  <span className="text-green-400">
                    Correct: {attempt.totalCorrectQuestions}
                  </span>

                  <span className="text-gay-400">
                    Attempted: {attempt.totalQuestionsAttempted} 
                  </span>
                  <span className="font-bold text-indigo-400">{attempt.marksScored} Marks</span>
                </li>
              ))}
            </ul>

            {/* Download Button */}
            <button
              onClick={downloadExcel}
              className="mt-4 w-full flex gap-2 items-center justify-center bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg shadow-md transition-all"
            >
              <FaDownload size={18} />
              Download Excel
            </button>
          </>
        ) : (
          <p className="text-gray-400">No attempts found.</p>
        )}
      </div>
    </div>
  );
};

export default AttemptsPopup;
