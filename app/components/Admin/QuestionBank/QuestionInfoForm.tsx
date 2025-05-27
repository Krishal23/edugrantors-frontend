import React, { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
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
  image?: any;
  imageExplain?: any;
}

interface Props {
  courseId: string;
  topic: string;
  subTopic: string;
  onClose: () => void;
  type?: "single" | "multiple" | "numerical" | "phrase";
  question?: any;
  isEdit?: boolean;
  queId?: string;
  refetch: () => void;
}

const QuestionInfoForm: React.FC<Props> = ({
  refetch,
  courseId,
  topic,
  subTopic,
  onClose,
  type,
  question,
  isEdit = false,
}) => {
  console.log(courseId);
  const [dragging, setDragging] = useState(false);
  const [draggingExplain, setDraggingExplain] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const mapQuestionTypeToBackend = (frontendType: string) => {
    const typeMap: { [key: string]: string } = {
      single: "single",
      multiple: "multiple",
      numerical: "numerical",
      phrase: "phrase",
    };
    return typeMap[frontendType] || frontendType;
  };

  const mapQuestionTypeToFrontend = (backendType: string) => {
    const typeMap: { [key: string]: string } = {
      SCQ: "single",
      MCQ: "multiple",
      numerical: "numerical",
      phrase: "phrase",
    };
    return typeMap[backendType] || backendType;
  };

  // Initialize question data with proper deep copying for edit mode
  const [questionData, setQuestionData] = useState<QuestionType>(() => {
    if (isEdit && question) {
      // Create deep copies to avoid read-only issues
      const mappedOptions = question.options ? 
        question.options.map((opt: any) => ({
          text: opt.text || "",
          isCorrect: opt.isCorrect || false
        })) : [
          { text: "", isCorrect: false },
          { text: "", isCorrect: false },
          { text: "", isCorrect: false },
          { text: "", isCorrect: false },
        ];

      return {
        type: mapQuestionTypeToFrontend(question.type) as QuestionType["type"],
        question: question.question || "",
        options: mappedOptions,
        correctAnswer: question.correctAnswer || "",
        marks: question.marks || 0,
        negativeMarks: question.negativeMarks || 0,
        explanation: question.explanation || "",
        image: question.image || "",
        imageExplain: question.imageExplain || "",
      };
    }

    return {
      type: type || "single",
      question: "",
      options: [
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
      ],
      correctAnswer: "",
      marks: 0,
      negativeMarks: 0,
      explanation: "",
      image: "",
      imageExplain: "",
    };
  });

  const [
    uploadQuestion,
    { isSuccess: isUploadSuccess, isError: isUploadError, isLoading: isUploadLoading },
  ] = useUploadQuestionMutation();
  const [editQuestion, { isSuccess: isEditSuccess, isError: isEditError, isLoading: isEditLoading }] =
    useEditQuestionMutation();

  // Track the uploading state based on the mutation loading states
  useEffect(() => {
    setIsUploading(isUploadLoading || isEditLoading);
  }, [isUploadLoading, isEditLoading]);

  // Handle success and error states
  useEffect(() => {
    if (isEditSuccess) {
      toast.success("Question Updated Successfully");
      setIsUploading(false);
      // refetch();
      onClose();
    }
    if (isUploadSuccess) {
      toast.success("Question Uploaded Successfully");
      setIsUploading(false);
      // refetch();
    }
    if (isEditError) {
      toast.error("Failed to Update Question");
      setIsUploading(false);
    }
    if (isUploadError) {
      toast.error("Failed to Upload Question");
      setIsUploading(false);
    }
  }, [isEditSuccess, isUploadSuccess, isEditError, isUploadError, refetch, onClose]);

  const handleFieldChange = (field: string, value: any) => {
    setQuestionData((prev) => ({ ...prev, [field]: value }));
  };

  const validateForm = (questionData: QuestionType) => {
    const missingFields: string[] = [];

    if (!questionData.question.trim()) {
      missingFields.push("Question");
    }
    if (!questionData.explanation.trim()) {
      missingFields.push("Explanation");
    }
    if (
      !questionData.correctAnswer ||
      (Array.isArray(questionData.correctAnswer) && questionData.correctAnswer.length === 0) ||
      (typeof questionData.correctAnswer === 'string' && !questionData.correctAnswer.trim())
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
      setIsUploading(true);

      // Validate required IDs before sending
      if (isEdit && !question?._id) {
        toast.error("Question ID is missing for edit operation");
        setIsUploading(false);
        return;
      }

      if (!courseId || courseId.trim() === "") {
        toast.error("Course ID is required");
        setIsUploading(false);
        return;
      }

      const data = {
        ...(isEdit && { questionId: question._id }),
        ...questionData,
        type: mapQuestionTypeToBackend(questionData.type),
        courseId: courseId.trim(),
        topic: topic.trim(),
        subTopic: subTopic.trim(),
      };

      // Log data for debugging
      console.log("Submitting data:", data);

      try {
        if (isEdit) {
          const response: any = await editQuestion(data);
          if (response?.data?.success) {
            toast.success("Question updated successfully");
            // refetch();
            onClose();
          } else if (response?.error) {
            console.error("Edit error:", response.error);
            toast.error(response.error.data?.message || "Failed to update question");
          }
        } else {
          const response: any = await uploadQuestion(data);
          if (response?.data?.success) {
            toast.success("Question uploaded successfully");
            // refetch();
            // Reset form for new question
            setQuestionData({
              type: "single",
              question: "",
              options: [
                { text: "", isCorrect: false },
                { text: "", isCorrect: false },
                { text: "", isCorrect: false },
                { text: "", isCorrect: false },
              ],
              correctAnswer: "",
              marks: 0,
              negativeMarks: 0,
              explanation: "",
              image: "",
              imageExplain: "",
            });
          } else if (response?.error) {
            console.error("Upload error:", response.error);
            toast.error(response.error.data?.message || "Failed to upload question");
          }
        }
      } catch (error: any) {
        console.error("Error:", error);
        toast.error("An error occurred during the operation");
      } finally {
        setIsUploading(false);
      }
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
        resetData = { ...resetData, options: [], correctAnswer: "" };
      }

      return { ...prev, ...resetData };
    });
  };

  // File handling for question image
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setQuestionData((prevData) => ({
          ...prevData,
          image: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // File handling for explanation image
  const handleExplainFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setQuestionData((prevData) => ({
          ...prevData,
          imageExplain: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Drag and drop handlers for question image
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setQuestionData((prevData) => ({
          ...prevData,
          image: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Explanation image drag and drop handlers
  const handleExplainDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDraggingExplain(true);
  };

  const handleExplainDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDraggingExplain(false);
  };

  const handleExplainDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDraggingExplain(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setQuestionData((prevData) => ({
          ...prevData,
          imageExplain: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-[46vw] max-h-[35vw] overflow-scroll p-6 bg-gradient-to-r from-gray-800 to-zinc-900 rounded-xl shadow-lg mb-6 hover:shadow-2xl transition-all duration-300">
      <h2 className="text-2xl text-white font-semibold mb-4">
        {isEdit ? "Edit Question" : "Create New Question"}
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
          disabled={isUploading}
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

      {/* Question Image Upload Section */}
      <div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Question Image (optional)
          </label>
          <div
            className={`relative mt-2 border-dashed border-2 p-4 flex items-center justify-center rounded-lg cursor-pointer transition-all ${
              dragging
                ? "bg-blue-100 dark:bg-blue-800"
                : "bg-gray-100 dark:bg-gray-700"
            } hover:border-indigo-500 focus-within:border-indigo-500 ${
              isUploading ? "opacity-50 pointer-events-none" : ""
            }`}
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
                htmlFor="file-input"
                className="text-gray-500 dark:text-gray-300 cursor-pointer"
              >
                Drag and drop or click to upload a question image
              </label>
            )}
            <input
              id="file-input"
              type="file"
              accept="image/*"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={handleFileChange}
              disabled={isUploading}
            />
          </div>
        </div>

        {questionData?.image && (
          <button
            type="button"
            className={`mt-3 text-sm bg-red-700 p-2 rounded-md text-gray-100 hover:bg-red-600 ${
              isUploading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={(e) => {
              e.stopPropagation();
              setQuestionData((prev) => ({ ...prev, image: "" }));
            }}
            disabled={isUploading}
          >
            Remove Question Image
          </button>
        )}
      </div>

      {/* Explanation Image Upload Section */}
      <div>
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Explanation Image (optional)
          </label>
          <div
            className={`relative mt-2 border-dashed border-2 p-4 flex items-center justify-center rounded-lg cursor-pointer transition-all ${
              draggingExplain
                ? "bg-blue-100 dark:bg-blue-800"
                : "bg-gray-100 dark:bg-gray-700"
            } hover:border-indigo-500 focus-within:border-indigo-500 ${
              isUploading ? "opacity-50 pointer-events-none" : ""
            }`}
            onDragOver={handleExplainDragOver}
            onDragLeave={handleExplainDragLeave}
            onDrop={handleExplainDrop}
          >
            {questionData.imageExplain ? (
              <div className="flex flex-col gap-4">
                <img
                  src={questionData.imageExplain.url || questionData.imageExplain}
                  alt="Explanation"
                  height={1200}
                  width={1800}
                  className="max-w-full max-h-40 rounded-lg shadow-sm"
                />
              </div>
            ) : (
              <label
                htmlFor="explain-file-input"
                className="text-gray-500 dark:text-gray-300 cursor-pointer"
              >
                Drag and drop or click to upload an explanation image
              </label>
            )}
            <input
              id="explain-file-input"
              type="file"
              accept="image/*"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={handleExplainFileChange}
              disabled={isUploading}
            />
          </div>
        </div>

        {questionData?.imageExplain && (
          <button
            type="button"
            className={`mt-3 text-sm bg-red-700 p-2 rounded-md text-gray-100 hover:bg-red-600 ${
              isUploading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={(e) => {
              e.stopPropagation();
              setQuestionData((prev) => ({ ...prev, imageExplain: "" }));
            }}
            disabled={isUploading}
          >
            Remove Explanation Image
          </button>
        )}
      </div>

      {/* Marks */}
      <div className="mb-4 mt-6">
        <label className="text-white text-sm">Marks</label>
        <input
          type="number"
          value={questionData.marks}
          onChange={(e) => handleFieldChange("marks", parseInt(e.target.value) || 0)}
          className="w-full p-2 mt-2 rounded-md text-gray-400"
          placeholder="Enter the marks"
          disabled={isUploading}
          min="0"
        />
      </div>

      {/* Negative Marks */}
      <div className="mb-4">
        <label className="text-white text-sm">Negative Marks</label>
        <input
          type="number"
          value={questionData.negativeMarks}
          onChange={(e) =>
            handleFieldChange("negativeMarks", parseInt(e.target.value) || 0)
          }
          className="w-full p-2 mt-2 rounded-md text-gray-400"
          placeholder="Enter the negative marks (0 for none)"
          disabled={isUploading}
          min="0"
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
          disabled={isUploading}
        />
      </div>

      <div className="flex justify-between mt-4">
        <button
          type="button"
          onClick={onClose}
          className={`px-4 py-2 bg-gray-500 text-white rounded-md ${
            isUploading ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-600"
          }`}
          disabled={isUploading}
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          className={`px-4 py-2 bg-blue-600 text-white rounded-md flex items-center justify-center ${
            isUploading ? "opacity-80" : "hover:bg-blue-700"
          }`}
          disabled={isUploading}
        >
          {isUploading ? (
            <>
              <FaSpinner className="animate-spin mr-2" />
              {isEdit ? "Updating..." : "Uploading..."}
            </>
          ) : (
            <>{isEdit ? "Update" : "Submit"}</>
          )}
        </button>
      </div>
    </div>
  );
};

export default QuestionInfoForm;
