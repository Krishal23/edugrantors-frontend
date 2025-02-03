"use client";

import { useDeleteQuestionMutation } from "@/app/redux/features/question-bank/questionBankApi";
import React, { useState } from "react";
import toast from "react-hot-toast";
import {
  FaCheckCircle,
  FaEdit,
  FaTrashAlt,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import dynamic from "next/dynamic";
import Loader from "../../Loader/Loader";

const AddQuestionPopup = dynamic(() => import("./AddQuestionPopup"), {
  ssr: false,
  loading: () => <Loader message="Loading ..." />,
});

type Question = {
  _id: string;
  courseId: string;
  topic: string;
  subTopic: string;
  type: string;
  question: string;
  image?: any;
  options: { text: string; isCorrect: boolean }[];
  correctAnswer: string | number | string[];
  marks: number;
  negativeMarks: number;
  explanation: string;
  createdBy: { _id: string; name: string; email: string };
  createdAt: string;
};

type Props = {
  isQuiz?: boolean;
  question: Question;
  courseId?: string;
  topic?: string;
  subTopic?: string;
  type?: string;
  refetch?: any;
  mappedData: any;
  queId?: string;
  isSelected: boolean; // Add selection prop
  isResource?: boolean;
  onSelectQuestion: (question: any, isSelected: boolean) => void; // Callback for selection
};

const QuestionBank: React.FC<Props> = ({
  isQuiz,
  question: q,
  isResource,
  courseId,
  topic,
  subTopic,
  type,
  refetch,
  mappedData,
  queId,
  isSelected,
  onSelectQuestion,
}) => {
  const [confirmDeletePop, setConfirmDeletePop] = useState(false);
  const [editPop, setEditPop] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true); // State for collapsing
  const [deleteQuestion] = useDeleteQuestionMutation();

  if (courseId && q.courseId !== courseId) return null;
  if (topic && q.topic !== topic) return null;
  if (subTopic && q.subTopic !== subTopic) return null;
  if (type && q.type !== type) return null;

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSelectQuestion(q._id, e.target.checked); // Trigger parent callback
  };

  const handleDelete = async () => {
    const queId = q?._id;
    deleteQuestion(queId);
    refetch();
    toast.success("Question Deleted Successfully");
    setConfirmDeletePop(false);
  };

  const onClose = () => {
    setEditPop(false);
    refetch();
  };

  return (
    <div className="p-6 bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl shadow-lg mb-6 hover:shadow-2xl transition-all duration-300">
      {/* Header */}
      <div className="flex justify-between items-center  my-2">
        <h3 className="text-lg font-semibold text-white">Q: {q.question}</h3>
        <div className="flex gap-2">
          {(isQuiz || isResource) && (
            <input
              type="checkbox"
              checked={isSelected} // Bind to state
              onChange={handleCheckboxChange} // Handle change
              className="form-checkbox h-5 w-5 text-indigo-600"
            />
          )}

          <button
            onClick={() => setIsCollapsed(!isCollapsed)} // Toggle collapse
            className="text-white hover:text-gray-400 transition"
          >
            {isCollapsed ? (
              <FaChevronDown size={20} />
            ) : (
              <FaChevronUp size={20} />
            )}
          </button>
        </div>
      </div>

      {!isCollapsed && (
        <>
          {/* Question Details */}
          <div className="mt-4">
            {q?.image?.url && (
              <div className="mb-3 sm:mb-4">
                <img
                  src={q?.image?.url || "/placeholder.svg"}
                  alt="Question"
                  width={500}
                  height={300}
                  className="max-w-full h-auto rounded"
                />
              </div>
            )}
            <hr />

            {/* Options */}
            <div className="mt-4 space-y-3">
              {q.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div
                    className={`text-lg ${
                      option.isCorrect
                        ? "text-green-400 font-semibold"
                        : "text-white"
                    }`}
                  >
                    {index + 1}: {option.text}{" "}
                    {option.isCorrect && (
                      <FaCheckCircle className="inline-block ml-2 text-green-500" />
                    )}
                  </div>
                </div>
              ))}
            </div>
            <br />

            {/* Correct Answer */}
            <strong>Correct Answer:</strong>
            <div className="text-green-300">
              {Array.isArray(q.correctAnswer)
                ? q.correctAnswer.join(", ")
                : typeof q.correctAnswer === "string"
                ? q.correctAnswer
                : q.correctAnswer.toString()}
            </div>
            {/* Marks and Negative Marks */}
            <div className="text-sm text-gray-400 my-4 flex">
              <div className="max-w-[240px]">
                <p>
                  <strong>Marks:</strong> {q.marks}
                </p>
                <p>
                  <strong>Negative Marks:</strong> {q.negativeMarks}
                </p>
              </div>
            </div>

            {/* Explanation */}
            <div className="mt-6 text-sm text-gray-300 space-y-3 mb-2">
              <p className="font-semibold text-gray-200">Explanation:</p>
              <p className="italic text-gray-400">{q.explanation}</p>
            </div>

            <hr />
            {/* Topic and Sub-topic */}
            <div className="text-sm text-gray-400 my-4 flex">
              <div className="max-w-[240px]">
                <p>
                  <strong>Question ID:</strong> {q._id}
                </p>
                <p>
                  <strong>Course ID:</strong> {q.courseId}
                </p>
              </div>
              <div className="max-w-[160px]">
                <p>
                  <strong>Topic:</strong> {q.topic}
                </p>
                <p>
                  <strong>Sub-Topic:</strong> {q.subTopic}
                </p>
              </div>
            </div>

            {/* Edit and Delete Buttons */}
            {!isResource && (
              <>
                {/* Created By */}
                <div className="mt-4 text-sm text-gray-300">
                  <p>
                    <strong>Created By:</strong> {q.createdBy.name} (
                    {q.createdBy.email})
                  </p>
                  <p>
                    <strong>Created At:</strong>{" "}
                    {new Date(q.createdAt).toLocaleString()}
                  </p>
                </div>

                <div className="mt-4 flex justify-between">
                  {/* EDIT FEATURE */}
                  {/* <button
                onClick={() => setEditPop(true)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500 flex items-center"
              >
                <FaEdit className="mr-2" />
                Edit
              </button> */}

                  <button
                    onClick={() => setConfirmDeletePop(true)}
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-500 flex items-center"
                  >
                    <FaTrashAlt className="mr-2" />
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        </>
      )}

      {/* Confirmation Pop-ups */}
      {editPop && (
        <AddQuestionPopup
          onClose={onClose}
          mappedData={mappedData}
          isEdit={true}
          courseId={courseId}
          topic={topic}
          subTopic={subTopic}
          question={q}
          type={type}
          queId={queId}
        />
      )}
      {confirmDeletePop && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-[300px]">
            <p className="text-white text-lg">
              Are you sure you want to delete this question?
            </p>
            <div className="mt-4 flex justify-between">
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-500"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setConfirmDeletePop(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionBank;
