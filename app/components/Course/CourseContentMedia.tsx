import CoursePlayer from "@/app/utils/CoursePlayer";

import React, { useEffect, useState } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { FaChalkboardTeacher, FaFileDownload, FaLink } from "react-icons/fa";
import toast from "react-hot-toast";
import {
  useAddAnswerInQuestionMutation,
  useAddNewQuestionMutation,
} from "@/app/redux/features/courses/coursesApi";
import { MdOutlineQuestionAnswer, MdVerifiedUser } from "react-icons/md"; // Icon for questions
import { format } from "timeago.js";
import { BiMessage } from "react-icons/bi";
import dynamic from "next/dynamic";
import Loader from "../Loader/Loader";

const avatar = "/assets/6.png";
const Quizzes = dynamic(() => import("../Quiz/Quizzes"), {
  loading: () => <Loader message="Loading Quizzes..." />,
});

type Props = {
  data: any;
  id: string;
  activeVideo: number;
  setActiveVideo: (activeVideo: number) => void;
  user: any;
  refetch?: any;
};

const CourseContentMedia = ({
  data,
  id,
  activeVideo,
  setActiveVideo,
  user,
  refetch,
}: Props) => {
  const [activeBar, setActiveBar] = useState(0);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [questionId, setQuestionId] = useState("");

  const [
    addNewQuestion,
    { isSuccess, error, isLoading: questionCreationLoading },
  ] = useAddNewQuestionMutation();
  const [
    addAnswerInQuestion,
    {
      isSuccess: answerSuccess,
      error: answerError,
      isLoading: answerCreationLoading,
    },
  ] = useAddAnswerInQuestionMutation();
  const handleQuestion = () => {
    if (question.length === 0) {
      toast.error("Question can't be empty.");
    } else {
      addNewQuestion({
        question,
        courseId: id,
        contentId: data[activeVideo]._id,
      });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setQuestion("");
      refetch();
      toast.success("Qustion added successfully");
    }
    if (answerSuccess) {
      setAnswer("");
      refetch();
      toast.success("Answer added successfully");
    }
    if (error) {
      if ("data" in error) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
    if (answerError) {
      if ("data" in answerError) {
        const errorMessage = error as any;
        toast.error("error");
      }
    }
  }, [isSuccess, error, answerSuccess, answerError, refetch]);

  const handleAnswerSubmit = (reply: string) => {
    setAnswer(reply);

    addAnswerInQuestion({
      answer: reply,
      courseId: id,
      contentId: data[activeVideo],
      questionId: questionId,
    });
  };

  return (
    <div className="w-[95%] 800px:w-[86%] py-8 m-auto">
      <CoursePlayer
        videoUrl={data[activeVideo]?.videoUrl}
        title={data[activeVideo]?.title}
      />
      <div className="w-full flex items-center justify-between my-3">
        <div
          className={`!min-h-[40px] !py-2 px-4 bg-blue-500 text-white rounded-md flex items-center justify-center cursor-pointer 
                ${activeVideo === 0 && "!cursor-not-allowed opacity-80"} 
                ${
                  activeVideo !== 0 &&
                  "hover:bg-blue-600 transition duration-200 ease-in-out"
                }`}
          onClick={() =>
            setActiveVideo(activeVideo === 0 ? 0 : activeVideo - 1)
          }
        >
          <AiOutlineArrowLeft className="mr-2" />
          Prev Lesson
        </div>

        {/* Next Lesson Button */}
        <div
          className={`!min-h-[40px] !py-2 px-4 bg-blue-500 text-white rounded-md flex items-center justify-center cursor-pointer 
                    ${
                      activeVideo === data.length - 1 &&
                      "!cursor-not-allowed opacity-80"
                    } 
                    ${
                      activeVideo < data.length - 1 &&
                      "hover:bg-blue-600 transition duration-200 ease-in-out"
                    }`}
          onClick={() =>
            setActiveVideo(
              activeVideo < data.length - 1 ? activeVideo + 1 : activeVideo
            )
          }
        >
          Next Lesson
          <AiOutlineArrowRight className="ml-2" />
        </div>
      </div>
      <h1 className="pt-2 text-zinc-800 dark:text-white text-[25px] font-[600] ">
        {data[activeVideo].title}
      </h1>
      <br />
      <div className="w-full p-4 flex  text-zinc-800 dark:text-white items-center justify-between bg-slate-500 bg-opacity-20 backdrop-blur shadow-[bg-slate-700] rounded-lg shadow-inner ">
        {["Overview", "Resources", "Q&A", "Quiz"].map((text, index) => (
          <h5
            key={index}
            className={`800px:text-[20px]  cursor-pointer ${
              activeBar === index && "text-red-500"
            }`}
            onClick={() => setActiveBar(index)}
          >
            {text}
          </h5>
        ))}
      </div>
      <br />
      {activeBar === 0 && (
        <p className="text-[18px] min-h-[10vh]  text-zinc-800 dark:text-white whitespace-pre-line mb-auto ">
          {data[activeVideo]?.description}
        </p>
      )}

      {activeBar === 1 && (
        <div className=" pb-6 min-h-[10vh] rounded-lg shadow-lg space-y-6 ">
          {data[activeVideo]?.links?.map((item: any, index: number) => {
            // Determine styles and properties dynamically
            const linkIcon =
              item.title === "Live Class" ? (
                <FaChalkboardTeacher className="text-blue-400" size={20} />
              ) : item.title === "DPP" ? (
                <FaFileDownload className="text-yellow-400" size={20} />
              ) : (
                <FaLink className="text-gray-400" size={20} />
              );

            const linkText =
              item.title === "Live Class"
                ? "Join Live Class"
                : item.title === "DPP"
                ? "Download DPP"
                : "Access Resource";

            const buttonStyle =
              item.title === "Live Class"
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : item.title === "DPP"
                ? "bg-yellow-500 hover:bg-yellow-600 text-black"
                : "bg-gray-600 hover:bg-gray-700 text-gray-100";

            return (
              <div
                key={index}
                className="relative p-4 bg-gray-900 rounded-md shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Top Border Divider */}
                {index !== 0 && (
                  <hr className="absolute top-0 left-0 w-full border-gray-700" />
                )}

                <div className="flex items-center gap-4">
                  {/* Icon */}
                  <div className="flex-shrink-0">{linkIcon}</div>

                  {/* Content */}
                  <div className="flex-1">
                    <h2 className="text-lg font-medium text-white">
                      {item.title || "Resource"}
                    </h2>
                    <p className="text-sm text-gray-400">
                      {item.title === "Live Class"
                        ? "Interactive sessions with instructors."
                        : item.title === "DPP"
                        ? "Practice and test your knowledge."
                        : "Explore additional materials."}
                    </p>
                  </div>

                  <a
                    href={item.url}
                    className={`inline-flex items-center px-4 py-2 text-sm font-semibold rounded-md transition-all ${buttonStyle}`}
                  >
                    {linkText}
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {activeBar === 2 && (
        <div className="min-h-[10vh] text-zinc-800 dark:text-white">
          <div className="flex  w-full items-center ">
            <img
              src={user.avatar ? user.avatar.url : avatar}
              width={50}
              height={50}
              alt="User Avatar"
              className="w-[50px] h-[50px] object-cover rounded-full"
            />
            <textarea
              name=""
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              id=""
              cols={40}
              rows={3}
              placeholder="Write Your Question..."
              className="outline-none bg-transparent ml-3 border border-[#39404e] dark:border-[#c0c0c0] text-gray-800 dark:text-gray-200 w-[90%] p-2 rounded-lg focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400"
            ></textarea>
          </div>
          <div className="w-full flex justify-end mt-1">
            <button
              onClick={questionCreationLoading ? () => {} : handleQuestion}
              className={`bg-zinc-900 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-all focus:ring-2 focus:ring-blue-500 ${
                questionCreationLoading && "cursor-not-allowed"
              } `}
            >
              Submit
            </button>
          </div>
          <br />
          <br />
          <div className="w-full ">
            <div>
              <CommentReply
                data={data}
                activeVideo={activeVideo}
                answer={answer}
                setAnswer={setAnswer}
                handleAnswerSubmit={handleAnswerSubmit}
                user={user}
                setQuestionId={setQuestionId}
                answerCreationLoading={answerCreationLoading}
              />
            </div>
          </div>
        </div>
      )}

      {activeBar === 3 && <Quizzes id={id} user={user} />}
    </div>
  );
};

const CommentReply = ({
  data,
  activeVideo,
  answer,
  setAnswer,
  handleAnswerSubmit,
  user,
  setQuestionId,
  answerCreationLoading,
}: any) => {
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});

  const handleAnswerChange = (id: string, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  return (
    <div className="w-full mb-auto p-4 rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 flex items-center gap-2">
        <MdOutlineQuestionAnswer className="text-blue-500" />
        Comments
      </h3>
      <div className="w-full my-3">
        {[...data[activeVideo].questions]
          .reverse()
          .map((item: any, index: any) => (
            <CommentItem
              key={index}
              data={data}
              activeVideo={activeVideo}
              item={item}
              index={index}
              answer={answers[item._id] || ""} // Pass the specific answer for each question
              setAnswer={(value: string) => handleAnswerChange(item._id, value)} // Update specific answer
              setQuestionId={setQuestionId}
              handleAnswerSubmit={() =>
                handleAnswerSubmit(answers[item._id], item._id)
              }
              answerCreationLoading={answerCreationLoading}
            />
          ))}
      </div>
    </div>
  );
};

const CommentItem = ({
  data,
  activeVideo,
  item,
  index,
  answer,
  setAnswer,
  handleAnswerSubmit,
  setQuestionId,
  answerCreationLoading,
}: any) => {
  const [replyActive, setreplyActive] = useState(false);
  const handleReplySubmit = () => {
    handleAnswerSubmit(answer);
    setAnswer("");
  };

  return (
    <>
      <div className="my-4">
        <div className="flex mb-2">
          <img
            src={item?.user.avatar ? item?.user.avatar.url : avatar}
            width={50}
            height={50}
            alt="Reviewer Avatar"
            className="w-[40px] h-[40px] object-cover rounded-full"
          />
          <div className="pl-3">
            <div className=" flex align items-center gap-2">
              <h5 className="sm:text-[20px] text-[15px]">{item?.user.name}</h5>
              {item?.user.role === "admin" && <MdVerifiedUser />}
            </div>
            <p>{item?.question}</p>
            <small className="text-[#ffffff83] ">
              {format(item?.createdAt)} •
            </small>
          </div>
        </div>
        <div className="w-full flex justify-between">
          <span
            className="800px:pl-12 text-black dark:text-[#ffffff83] cursor-pointer mr-2 text-sm "
            onClick={() => {
              setreplyActive(!replyActive);
              setQuestionId(item._id);
            }}
          >
            {!replyActive
              ? item.questionReplies.length !== 0
                ? "All Replies"
                : "Add Reply"
              : "Hide Reply"}
          </span>
          <div className="flex">
            <BiMessage size={20} className="cursor-pointer " fill="#ffffff83" />
            <span className="pl-1 mt-[-4px] cursor-pointer text-[#ffffff83]  ">
              {item.questionReplies.length}
            </span>
          </div>
        </div>
        {replyActive && (
          <div>
            {item.questionReplies.map((item: any, index: number) => (
              <div
                key={index}
                className="w-full flex 800px:ml-16 my-5 text-black dark:text-white"
              >
                <div>
                  <img
                    src={item?.user?.avatar ? item.user.avatar.url : avatar}
                    width={50}
                    height={50}
                    alt="Reviewer Avatar"
                    className="w-[40px] h-[40px] object-cover rounded-full"
                  />
                </div>
                <div className="pl-2">
                  <div className=" flex align items-center gap-2">
                    <h5 className="sm:text-[20px] text-[15px]">
                      {item.user.name}
                    </h5>
                    {item?.user.role === "admin" && <MdVerifiedUser />}
                  </div>
                  <p>{item.answer}</p>
                  <small className="text-[#ffffff83] ">
                    {format(item.createdAt)} •
                  </small>
                </div>
              </div>
            ))}

            <>
              <div className="w-full flex relative">
                <input
                  type="text"
                  placeholder="Enter your reply..."
                  value={answer}
                  onChange={(e: any) => setAnswer(e.target.value)}
                  className="block 800px:ml-12 outline-none bg-transparent border-b border-white p-2 w-[95%]"
                />
                <button
                  type="button" // Changed to "button" to avoid submitting forms unintentionally
                  className={`absolute right-0 bottom-2 sm:text-[20px] text-[12px] bg-blue-500 text-white sm:px-4 px-2 py-1 rounded-md hover:bg-blue-600 ${
                    answer === "" ||
                    (answerCreationLoading && "cursor-not-allowed")
                  } `}
                  onClick={handleReplySubmit}
                  disabled={answer === "" || answerCreationLoading}
                >
                  Submit
                </button>
              </div>
              <br />
            </>
          </div>
        )}
      </div>
      <div className="w-full h-[1px]  bg-slate-900 "></div>
    </>
  );
};

export default CourseContentMedia;
