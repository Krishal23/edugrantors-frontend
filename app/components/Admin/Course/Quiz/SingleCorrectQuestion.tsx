import React, { useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlinePlusCircle } from "react-icons/ai";
// import { QuestionType } from "./QuestionForm";



const SingleCorrectQuestion = ({ question, setQuestions, index }:any) => {
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    if (question.options.length === 0) {
      setQuestions((prevQuestions:any) => {
        const updatedQuestions = [...prevQuestions];
        updatedQuestions[index] = {
          ...updatedQuestions[index],
          options: [{ text: "Default Option", isCorrect: true }],
          correctAnswer: "Default Option",
        };
        return updatedQuestions;
      });
    } else if (!question.options.some((opt:any) => opt.isCorrect)) {
      setQuestions((prevQuestions:any) => {
        const updatedQuestions = [...prevQuestions];
        updatedQuestions[index] = {
          ...updatedQuestions[index],
          options: updatedQuestions[index].options.map((opt:any, idx:any) =>
            idx === 0 ? { ...opt, isCorrect: true } : opt
          ),
          correctAnswer: updatedQuestions[index].options[0].text,
        };
        return updatedQuestions;
      });
    }
  }, [question.options, index, setQuestions]);

  const handleOptionChange = (optionIndex: number, value: string) => {
    setQuestions((prevQuestions:any) => {
      const updatedQuestions = [...prevQuestions];
      updatedQuestions[index] = {
        ...updatedQuestions[index],
        options: updatedQuestions[index].options.map((opt:any, idx:any) =>
          idx === optionIndex ? { ...opt, text: value } : opt
        ),
      };
      return updatedQuestions;
    });
  };

  const handleCorrectChange = (optionIndex: number) => {
    setQuestions((prevQuestions:any) => {
      const updatedQuestions = [...prevQuestions];
      updatedQuestions[index] = {
        ...updatedQuestions[index],
        options: updatedQuestions[index].options.map((opt:any, idx:any) => ({
          ...opt,
          isCorrect: idx === optionIndex,
        })),
        correctAnswer: updatedQuestions[index].options[optionIndex].text,
      };
      return updatedQuestions;
    });
  };

  const handleAddOption = () => {
    setQuestions((prevQuestions:any) => {
      const updatedQuestions = [...prevQuestions];
      updatedQuestions[index] = {
        ...updatedQuestions[index],
        options: [
          ...updatedQuestions[index].options,
          { text: "", isCorrect: false },
        ],
      };
      return updatedQuestions;
    });
  };

  const handleRemoveOption = (optionIndex: number) => {
    setQuestions((prevQuestions:any) => {
      const updatedQuestions = [...prevQuestions];
      if (
        updatedQuestions[index].options[optionIndex].isCorrect &&
        updatedQuestions[index].options.filter((opt:any) => opt.isCorrect)
          .length === 1
      ) {
        alert("At least one option must be marked as correct.");
        return prevQuestions;
      }
      updatedQuestions[index] = {
        ...updatedQuestions[index],
        options: updatedQuestions[index].options.filter(
          (_:any, idx:any) => idx !== optionIndex
        ),
      };
      return updatedQuestions;
    });
  };

  const handleFieldChange = (
    field: "question" | "explanation" | "marks",
    value: string | number
  ) => {
    setQuestions((prevQuestions:any) => {
      const updatedQuestions = [...prevQuestions];
      updatedQuestions[index] = { ...updatedQuestions[index], [field]: value };
      return updatedQuestions;
    });
  };

  const handleFileChange = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setQuestions((prevQuestions:any) => {
          const updatedQuestions = [...prevQuestions];
          updatedQuestions[index] = {
            ...updatedQuestions[index],
            image: reader.result as string,
          };
          return updatedQuestions;
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e: any) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setQuestions((prevQuestions:any) => {
          const updatedQuestions = [...prevQuestions];
          updatedQuestions[index] = {
            ...updatedQuestions[index],
            image: reader.result as string,
          };
          return updatedQuestions;
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="mt-4">
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Question
        </label>
        <input
          type="text"
          value={question.question}
          onChange={(e) => handleFieldChange("question", e.target.value)}
          placeholder="Enter the question"
          className="mt-1 block w-full px-3 py-2 border rounded-md text-gray-900 dark:text-gray-300 dark:bg-gray-700"
        />
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Explanation
        </label>
        <textarea
          value={question.explanation}
          onChange={(e) => handleFieldChange("explanation", e.target.value)}
          placeholder="Provide an explanation for the answer"
          className="mt-1 block w-full px-3 py-2 border rounded-md text-gray-900 dark:text-gray-300 dark:bg-gray-700"
          rows={4}
        ></textarea>
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Marks
        </label>
        <input
          type="number"
          value={question.marks}
          onChange={(e) =>
            handleFieldChange("marks", parseInt(e.target.value, 10))
          }
          placeholder="Enter the marks for this question"
          className="mt-1 block w-full px-3 py-2 border rounded-md text-gray-900 dark:text-gray-300 dark:bg-gray-700"
        />
      </div>

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
            {question.image ? (
              <div className="flex flex-col gap-4">
                <img
                  src={question.image}
                  alt="Uploaded"
                  height={1200}
                  width={1800}
                  className="max-w-full max-h-40 rounded-lg shadow-sm"
                />
              </div>
            ) : (
              <label
                htmlFor={`file-input-${index}`}
                className="text-gray-500 dark:text-gray-300 cursor-pointer"
              >
                Drag and drop or click to upload an image
              </label>
            )}
            <input
              id={`file-input-${index}`}
              type="file"
              accept="image/*"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={handleFileChange}
            />
          </div>
        </div>

        {question.image && (
          <button
            type="button"
            className="mt-3 text-sm bg-red-700 p-2 rounded-md text-gray-100 hover:bg-red-600"
            onClick={(e) => {
              e.stopPropagation();
              setQuestions((prevQuestions:any) => {
                const updatedQuestions = [...prevQuestions];
                updatedQuestions[index] = {
                  ...updatedQuestions[index],
                  image: "",
                };
                return updatedQuestions;
              });
            }}
          >
            Remove Image
          </button>
        )}
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Options (Select one correct option)
        </label>
        {question.options.map((option:any, optionIndex:any) => (
          <div key={optionIndex} className="flex items-center mt-2 space-x-2">
            <input
              type="text"
              value={option.text}
              onChange={(e) => handleOptionChange(optionIndex, e.target.value)}
              placeholder="Option text"
              className="flex-1 px-3 py-2 border rounded-md dark:bg-gray-700"
            />
            <input
              type="radio"
              checked={option.isCorrect}
              onChange={() => handleCorrectChange(optionIndex)}
            />
            <span className="text-sm">Correct</span>
            <AiOutlineDelete
              className="cursor-pointer text-xl text-red-600"
              onClick={() => handleRemoveOption(optionIndex)}
            />
          </div>
        ))}
        <button
          type="button"
          className="mt-2 flex items-center text-sm text-indigo-500"
          onClick={handleAddOption}
        >
          <AiOutlinePlusCircle className="mr-1" /> Add Option
        </button>
      </div>
    </div>
  );
};

export default SingleCorrectQuestion;
