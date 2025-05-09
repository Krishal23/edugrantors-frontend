import React, { useEffect, useState } from "react";
import { useAttemptTestMutation } from "@/app/redux/features/courses/coursesApi";
import dynamic from "next/dynamic";
import Loader from "../Loader/Loader";
import { BiSolidTimer } from "react-icons/bi";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";
import usePreventBackNavigation from "@/app/utils/usePreventBackNavigation";
import { reorganizeQuizData } from "@/app/utils/ReorganizeQuiz";

const QuizSidebar = dynamic(() => import("./QuizSidebar"), {
  loading: () => <Loader message="Loading Sidebar..." />, // Show the Loader while SubmitPopup is being loaded
});
const SubmitPopup = dynamic(() => import("./SubmitPopup"), {
  loading: () => <Loader message="Submitting, please wait..." />, // Show the Loader while SubmitPopup is being loaded
});

type QuestionProps = {
  quiz: any;
  currentQuestionIndex: number;
  setCurrentQuestionIndex: (index: number) => void;
  quizId: string;
  courseId: string;
};

const QuizQuestion = ({
  quiz,
  currentQuestionIndex,
  setCurrentQuestionIndex,
  quizId,
  courseId,
}: QuestionProps) => {
  const [answers, setAnswers] = useState<any[]>([]); // Stores all answers
  const question = quiz.questions[currentQuestionIndex];
  const isFirstQuestion = currentQuestionIndex === 0;
  const [submitPop, setSubmitPop] = useState(false);

  const [attemptTest] = useAttemptTestMutation();

  const [selectedAnswer, setSelectedAnswer] = useState<any>(
    question.type === "multiple" ? [] : null
  );

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  usePreventBackNavigation();
  useEffect(() => {
    const currentAnswer = answers.find(
      (answer) => answer.questionId === question.questionId
    );
    if (currentAnswer) {
      setSelectedAnswer(currentAnswer.selectedAnswer);
    } else {
      setSelectedAnswer(question.type === "multiple" ? [] : null);
    }
  }, [currentQuestionIndex]);

  const handleOptionSelect = (option: string) => {
    if (question.type === "multiple") {
      setSelectedAnswer((prev: string[]) => {
        return prev && prev.includes(option)
          ? prev.filter((item) => item !== option) // Remove if already selected
          : [...(prev || []), option]; // Add if not selected
      });
    } else {
      setSelectedAnswer(option);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    let value: any = e.target.value;
    if (value !== "") {
      if (question.type === "numerical") {
        value = value ? Number(value) : value; // Convert to number or null if empty
      } else if (question.type === "phrase") {
        value = value.toLowerCase();
      }
    } else {
      value = null;
    }
    setSelectedAnswer(value);
  };

  const handleSaveAndNext = () => {
    const answer = {
      questionId: question.questionId,
      selectedAnswer,
    };

    setAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      const answerIndex = updatedAnswers.findIndex(
        (item) => item.questionId === answer.questionId
      );

      if (answerIndex !== -1) {
        updatedAnswers[answerIndex] = answer;
      } else {
        updatedAnswers.push(answer);
      }

      return updatedAnswers;
    });

    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleSubmit();
    }
  };
  const handleNext = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleSubmit(); // Submit the quiz if it's the last question
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {
    setSubmitPop(true);
  };

  const isOptionSelected = (option: string) => {
    if (question.type === "multiple") {
      return Array.isArray(selectedAnswer) && selectedAnswer.includes(option);
    } else {
      return selectedAnswer === option;
    }
  };

  const handleClosePopup = () => {
    setSubmitPop(false);
  };

  const handleConfirmSubmit = async () => {
    const result = reorganizeQuizData(quizId, courseId, quiz, answers);
    await attemptTest({ result });
    setSubmitPop(false);
    toast.success("Test submitted successfully!");
    setAnswers([]);
    window.location.href = `/quiz-review/${courseId}/${quizId}`;
  };

  const [timeLeft, setTimeLeft] = useState(quiz.duration * 60); // 300 seconds = 5 minutes

  useEffect(() => {
    if (timeLeft <= 0) {
      alert("Time's up!");
      handleConfirmSubmit();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer); // Cleanup interval on component unmount
  }, [timeLeft, redirect]);

  return (
    <div className="flex justify-between min-h-screen">
      <div className="min-h-screen w-full md:w-4/5 bg-gray-900 text-white flex items-center justify-center">
        <div className="w-full md:w-4/5 h-[90vh] overflow-y-auto bg-gray-800 p-6 my-4 rounded-lg shadow-lg space-y-6">
          <h2 className="text-2xl text-gray-400 font-semibold flex gap-2 justify-between">
            <div className="text-sm text-gray-400 font-semibold flex-col gap-2 justify-start">
              <p className="text-sm ">Marks: {question.marks} </p>
              <p className="text-sm ">
                Negative Marks: {question.negativeMarks}{" "}
              </p>
            </div>
            <div className="text-2xl text-gray-400 font-semibold flex gap-2 justify-end">
              {formatTime(timeLeft)}
              <BiSolidTimer size={30} />
            </div>
          </h2>
          <p className="text-xl mb-2">
            Q{currentQuestionIndex + 1}: {question.question}
          </p>
          {question?.image?.url && (
            <div className="mb-3 sm:mb-4">
              <img
                src={question?.image?.url}
                alt="img loading..."
                width={900}
                height={900}
                className="max-w-full h-auto rounded"
              />
            </div>
          )}

          <div>
            {["single", "multiple"].includes(question.type) && (
              <ul className="space-y-2">
                {question.options.map((option: any, index: number) => (
                  <li
                    key={index}
                    className={`p-2 border rounded-lg cursor-pointer transition-all duration-200 ${
                      isOptionSelected(option.text)
                        ? "bg-blue-600 text-white border-blue-700"
                        : "bg-gray-700 hover:bg-gray-600 border-gray-600"
                    }`}
                    onClick={() => handleOptionSelect(option.text)}
                  >
                    {option.text}
                  </li>
                ))}
              </ul>
            )}

            {question.type === "numerical" && (
              <input
                type="number"
                value={selectedAnswer || ""}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white placeholder-gray-400"
                placeholder="Enter your answer"
              />
            )}

            {question.type === "phrase" && (
              <textarea
                value={selectedAnswer || ""}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white placeholder-gray-400"
                placeholder="Type your answer here"
                rows={3}
              />
            )}
          </div>

          <div className="flex justify-between mt-6">
            {!isFirstQuestion && (
              <button
                className="px-6 py-2 bg-gray-600 text-gray-200 rounded-lg hover:bg-gray-500 transition duration-200"
                onClick={handleBack}
              >
                Back
              </button>
            )}

            <button
              className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition duration-200"
              onClick={() => {
                // Clear the response for the current question
                setSelectedAnswer(question.type === "multiple" ? [] : null);

                // Remove the answer from the answers array
                setAnswers((prevAnswers) =>
                  prevAnswers.filter(
                    (answer) => answer.questionId !== question.questionId
                  )
                );
              }}
            >
              Clear
            </button>

            <button
              className={`px-6 py-2 rounded-lg transition duration-200 ${
                selectedAnswer !== null &&
                (question.type !== "multiple" || selectedAnswer.length > 0)
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-600 text-gray-400 hover:bg-gray-500"
              }`}
              onClick={() => {
                if (
                  selectedAnswer !== null &&
                  (question.type !== "multiple" || selectedAnswer.length > 0)
                ) {
                  handleSaveAndNext(); // Save the answer and move to the next question
                } else {
                  handleNext(); // Just move to the next question
                }
              }}
            >
              {selectedAnswer !== null &&
              (question.type !== "multiple" || selectedAnswer.length > 0)
                ? "Save & Next"
                : "Next"}
            </button>
          </div>
        </div>

        {submitPop && (
          <SubmitPopup
            answers={answers}
            onClose={handleClosePopup}
            onConfirm={handleConfirmSubmit}
          />
        )}
      </div>
      <div className=" min-w-1/5  ">
        <QuizSidebar
          currentQuestionIndex={currentQuestionIndex}
          answers={answers}
          quiz={quiz}
          onQuestionSelect={(index) => setCurrentQuestionIndex(index)}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default QuizQuestion;
