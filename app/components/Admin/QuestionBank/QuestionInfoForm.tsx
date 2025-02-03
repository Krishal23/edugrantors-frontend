import React, { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import dynamic from "next/dynamic";
import Loader from "@/app/components/Loader/Loader";
import toast from "react-hot-toast";
import {
  useEditQuestionMutation,
  useUploadQuestionMutation,
} from "@/app/redux/features/question-bank/questionBankApi";

const SingleCorrectQuestion = dynamic(() => import("./SingleCorrectQuestion"), {
  loading: () => <Loader message="Loading Single Correct Question..." />,
});
const MultipleCorrectQuestion = dynamic(
  () => import("./MultipleCorrectQuestion"),
  {
    loading: () => <Loader message="Loading Multiple Correct Question..." />,
  }
);
const NumericalQuestion = dynamic(() => import("./NumericalQuestion"), {
  loading: () => <Loader message="Loading Numerical Question..." />,
});
const PhraseQuestion = dynamic(() => import("./PhraseQuestion"), {
  loading: () => <Loader message="Loading Phrase Question..." />,
});

// Define the type for the question
export interface QuestionType {
  type: "single" | "multiple" | "numerical" | "phrase";
  question: string;
  options: { text: string; isCorrect: boolean }[];
  marks: number;
  negativeMarks: number;
  correctAnswer: any;
  explanation: string;
  image: any;
}

type Props = {
  courseId: string;
  topic: string;
  subTopic: string;
  onClose: () => void;
  type?: any;
  question?: any;
  isEdit?: boolean;
  queId?: string;
  refetch: () => void;
};

const QuestionInfoForm: React.FC<Props> = ({
  refetch,
  courseId,
  topic,
  subTopic,
  onClose,
  type,
  question,
  isEdit,
}) => {
  const [dragging, setDragging] = useState(false);

  const [questionData, setQuestionData] = useState<QuestionType>({
    type: type || "single", // Default to 'single' if no type is provided
    question: question?.question || "",
    options: question?.options || [
      { text: "", isCorrect: false },
      { text: "", isCorrect: false },
      { text: "", isCorrect: false },
      { text: "", isCorrect: false },
    ],
    correctAnswer: question?.correctAnswer || "",
    marks: question?.marks || 0,
    negativeMarks: question?.negativeMarks || 0,
    explanation: question?.explanation || "",
    image: question?.image || "",
  });
  const [
    uploadQuestion,
    { isSuccess: isUploadSuccess, isError: isUploadError },
  ] = useUploadQuestionMutation();
  const [editQuestion, { isSuccess: isEditSuccess, isError: isEditError }] =
    useEditQuestionMutation();

  useEffect(() => {
    if (isEditSuccess) {
      toast.success("Question Updated");
    }
    if (isUploadSuccess) {
      toast.success("Question Uploaded");
    }
    if (isEditError) {
      toast.error("Failed to Update.");
    }
    if (isUploadError) {
      toast.error("Failed to Upload.");
    }
  }, [isEditSuccess, isUploadSuccess, isEditError, isUploadError, refetch]);

  const handleFieldChange = (field: string, value: any) => {
    setQuestionData((prev) => ({ ...prev, [field]: value }));
  };

  const validateForm = (questionData: any) => {
    const missingFields: string[] = [];

    if (!questionData.question) {
      missingFields.push("Question");
    }
    if (!questionData.explanation) {
      missingFields.push("Explanation");
    }
    if (
      !questionData.correctAnswer ||
      questionData.correctAnswer.length === 0
    ) {
      missingFields.push("Correct Answer");
    }
    if (questionData.marks <= 0) {
      missingFields.push("Marks");
    }

    if (missingFields.length > 0) {
      toast.error(
        `Please fill out the following fields: ${missingFields.join(", ")}`
      );
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (validateForm(questionData)) {
      const data = {
        questionId: question?._id,
        ...questionData,
        courseId,
        topic,
        subTopic,
      };
      if (isEdit) {
        await editQuestion(data);
      } else {
        const response: any = await uploadQuestion(data);
        if (response?.success) {
          toast.success("Question Uploaded");
        }
      }
      onClose();
    }
  };

  const handleQuestionTypeChange = (type: QuestionType["type"]) => {
    setQuestionData((prev) => {
      let resetData: Partial<QuestionType> = { type };

      // Reset options and other fields based on question type
      if (type === "single" || type === "multiple") {
        resetData = {
          ...resetData,
          options: [
            { text: "", isCorrect: false },
            { text: "", isCorrect: false },
            { text: "", isCorrect: false },
            { text: "", isCorrect: false },
          ],
          correctAnswer: "",
        };
      } else if (type === "numerical" || type === "phrase") {
        resetData = { ...resetData, options: [], correctAnswer: "" }; // Reset options and correctAnswer for non-multiple types
      }

      return { ...prev, ...resetData };
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setQuestionData((prevData) => ({
          ...prevData,
          image: reader.result as string, // Store the base64 result of the image
        }));
      };
      reader.readAsDataURL(file); // Read file as base64
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true); // Set dragging state to true on drag over
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false); // Reset dragging state when leaving the drop area
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false); // Reset dragging state when a file is dropped

    const file = e.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setQuestionData((prevData) => ({
          ...prevData,
          image: reader.result as string, // Store the base64 result of the image
        }));
      };
      reader.readAsDataURL(file); // Read file as base64
    }
  };

  return (
    <div className=" w-[46vw] max-h-[35vw] overflow-scroll p-6 bg-gradient-to-r from-gray-800 to-zinc-900 rounded-xl shadow-lg mb-6 hover:shadow-2xl transition-all duration-300">
      <h2 className="text-2xl text-white font-semibold mb-4">
        Create New Question
      </h2>

      {/* Question Type Selection */}
      <div className="mb-4">
        <label className="text-white text-sm">Question Type</label>
        <select
          value={questionData.type}
          onChange={(e) =>
            handleQuestionTypeChange(e.target.value as QuestionType["type"])
          }
          className="w-full p-2 mt-2 rounded-md text-gray-400"
        >
          <option value="single">Single Correct</option>
          <option value="multiple">Multiple Correct</option>
          <option value="numerical">Numerical</option>
          <option value="phrase">Phrase</option>
        </select>
      </div>

      {/* Render different form based on the selected type */}
      {questionData.type === "single" && (
        <SingleCorrectQuestion
          questionData={questionData}
          setQuestionData={setQuestionData}
        />
      )}
      {questionData.type === "multiple" && (
        <MultipleCorrectQuestion
          questionData={questionData}
          setQuestionData={setQuestionData}
        />
      )}
      {questionData.type === "numerical" && (
        <NumericalQuestion
          questionData={questionData}
          setQuestionData={setQuestionData}
        />
      )}
      {questionData.type === "phrase" && (
        <PhraseQuestion
          questionData={questionData}
          setQuestionData={setQuestionData}
        />
      )}

      <div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Image (optional)
          </label>
          <div
            className={`relative mt-2 border-dashed border-2 p-4 flex items-center justify-center rounded-lg cursor-pointer transition-all ${
              dragging
                ? "bg-blue-100 dark:bg-blue-800"
                : "bg-gray-100 dark:bg-gray-700"
            } hover:border-indigo-500 focus-within:border-indigo-500`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {questionData.image ? (
              <div className="flex flex-col gap-4">
                <img
                  src={questionData.image.url || questionData.image}
                  alt="Uploaded"
                  height={1200}
                  width={1800}
                  className="max-w-full max-h-40 rounded-lg shadow-sm"
                />
              </div>
            ) : (
              <label
                htmlFor={`file-input`}
                className="text-gray-500 dark:text-gray-300 cursor-pointer"
              >
                Drag and drop or click to upload an image
              </label>
            )}
            <input
              id={`file-input`}
              type="file"
              accept="image/*"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={handleFileChange}
            />
          </div>
        </div>

        {questionData?.image && (
          <button
            type="button"
            className="mt-3 text-sm bg-red-700 p-2 rounded-md text-gray-100 hover:bg-red-600"
            onClick={(e) => {
              e.stopPropagation(); // Prevent the button from triggering the div's onClick
              setQuestionData((prev) => ({ ...prev, image: "" })); // Remove the image by resetting the image field
            }}
          >
            Remove Image
          </button>
        )}
      </div>

      {/* Marks */}
      <div className="mb-4">
        <label className="text-white text-sm">Marks</label>
        <input
          type="number"
          value={questionData.marks}
          onChange={(e) => handleFieldChange("marks", parseInt(e.target.value))}
          className="w-full p-2 mt-2 rounded-md text-gray-400"
          placeholder="Enter the marks"
        />
      </div>
      {/* Negative Marks */}
      <div className="mb-4">
        <label className="text-white text-sm">Negative Marks</label>
        <input
          type="number"
          value={questionData.negativeMarks}
          onChange={(e) =>
            handleFieldChange("negativeMarks", parseInt(e.target.value))
          }
          className="w-full p-2 mt-2 rounded-md text-gray-400"
          placeholder="Enter the negative marks (0 for none)"
        />
      </div>

      {/* Explanation */}
      <div className="mb-4">
        <label className="text-white text-sm">Explanation</label>
        <textarea
          value={questionData.explanation}
          onChange={(e) => handleFieldChange("explanation", e.target.value)}
          className="w-full p-2 mt-2 rounded-md text-gray-400"
          placeholder="Enter explanation"
          rows={4}
        />
      </div>

      <div className="flex justify-between mt-4">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 bg-gray-500 text-white rounded-md"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          className="px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          {isEdit ? <>Edit</> : <>Submit</>}
        </button>
      </div>
    </div>
  );
};

export default QuestionInfoForm;
