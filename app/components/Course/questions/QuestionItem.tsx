"use client"

import { useState } from "react"
import { MdVerifiedUser } from "react-icons/md"
import { BiMessage } from "react-icons/bi"
import { format } from "timeago.js"

const avatar = "/assets/6.png"

type Props = {
  item: any
  handleAnswerSubmit: (answer: string, questionId: string) => void
  setQuestionId: (id: string) => void
  answerCreationLoading: boolean
}

const QuestionItem = ({ item, handleAnswerSubmit, setQuestionId, answerCreationLoading }: Props) => {
  const [replyActive, setReplyActive] = useState(false)
  const [answer, setAnswer] = useState("")

  const handleReplySubmit = () => {
    handleAnswerSubmit(answer, item._id)
    setAnswer("")
  }

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
            <div className="flex align items-center gap-2">
              <h5 className="sm:text-[20px] text-[15px]">{item?.user.name}</h5>
              {item?.user.role === "admin" && <MdVerifiedUser />}
            </div>
            <p>{item?.question}</p>
            <small className="text-[#ffffff83]">{format(item?.createdAt)} •</small>
          </div>
        </div>
        <div className="w-full flex justify-between">
          <span
            className="800px:pl-12 text-black dark:text-[#ffffff83] cursor-pointer mr-2 text-sm"
            onClick={() => {
              setReplyActive(!replyActive)
              setQuestionId(item._id)
            }}
          >
            {!replyActive ? (item.questionReplies.length !== 0 ? "All Replies" : "Add Reply") : "Hide Reply"}
          </span>
          <div className="flex">
            <BiMessage size={20} className="cursor-pointer" fill="#ffffff83" />
            <span className="pl-1 mt-[-4px] cursor-pointer text-[#ffffff83]">{item.questionReplies.length}</span>
          </div>
        </div>
        {replyActive && (
          <div>
            {item.questionReplies.map((reply: any, index: number) => (
              <div key={index} className="w-full flex 800px:ml-16 my-5 text-black dark:text-white">
                <div>
                  <img
                    src={reply?.user?.avatar ? reply.user.avatar.url : avatar}
                    width={50}
                    height={50}
                    alt="Reviewer Avatar"
                    className="w-[40px] h-[40px] object-cover rounded-full"
                  />
                </div>
                <div className="pl-2">
                  <div className="flex align items-center gap-2">
                    <h5 className="sm:text-[20px] text-[15px]">{reply.user.name}</h5>
                    {reply?.user.role === "admin" && <MdVerifiedUser />}
                  </div>
                  <p>{reply.answer}</p>
                  <small className="text-[#ffffff83]">{format(reply.createdAt)} •</small>
                </div>
              </div>
            ))}

            <div className="w-full flex relative">
              <input
                type="text"
                placeholder="Enter your reply..."
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                className="block 800px:ml-12 outline-none bg-transparent border-b border-white p-2 w-[95%]"
              />
              <button
                type="button"
                className={`absolute right-0 bottom-2 sm:text-[20px] text-[12px] bg-blue-500 text-white sm:px-4 px-2 py-1 rounded-md hover:bg-blue-600 ${
                  answer === "" || answerCreationLoading ? "cursor-not-allowed" : ""
                }`}
                onClick={handleReplySubmit}
                disabled={answer === "" || answerCreationLoading}
              >
                Submit
              </button>
            </div>
            <br />
          </div>
        )}
      </div>
      <div className="w-full h-[1px] bg-slate-900"></div>
    </>
  )
}

export default QuestionItem

