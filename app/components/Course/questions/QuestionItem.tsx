"use client"

import { useState } from "react"
import { format } from "timeago.js"
import { useSelector } from "react-redux"
import { toast } from "react-hot-toast"
import { MessageCircle, Trash2, CheckCircle } from "lucide-react"
import { useDeleteCommentMutation, useDeleteAnswerMutation } from "@/app/redux/features/courses/coursesApi"

interface User {
  _id: string
  id?: string
  name: string
  role: string
  avatar?: {
    url: string
  }
}

interface Reply {
  _id: string
  answer: string
  user: User
  createdAt: string
}

interface QuestionItemProps {
  item: {
    _id: string
    question: string
    user: User
    questionReplies: Reply[]
    createdAt: string
  }
  courseId: string  // Add courseId prop
  contentId: string // Add contentId prop
  handleAnswerSubmit: (answer: string, questionId: string) => void
  setQuestionId: (id: string) => void
  answerCreationLoading: boolean
  refetch?: any
}

export default function QuestionItem({
  item,
  courseId,
  contentId,
  handleAnswerSubmit,
  setQuestionId,
  answerCreationLoading,
  refetch
}: QuestionItemProps) {
  const [replyActive, setReplyActive] = useState(false)
  const [answer, setAnswer] = useState("")

  const { user: currentUser } = useSelector((state: any) => state.auth)

  const [deleteComment, { isLoading: deletingQuestion }] = useDeleteCommentMutation()
  const [deleteAnswer, { isLoading: deletingAnswer }] = useDeleteAnswerMutation()

  const handleReplySubmit = () => {
    if (answer.trim()) {
      handleAnswerSubmit(answer, item._id)
      setAnswer("")
    }
  }

  const handleDeleteQuestion = () => {
    if (window.confirm("Are you sure you want to delete this question?")) {
      deleteComment({
        courseId,
        contentId,
        questionId: item._id,
      })
        .unwrap()
        .then(() => {
          toast.success("Question deleted successfully")
          refetch() 
        })
        .catch((error) => {
          toast.error(error?.data?.message || "Failed to delete question")
        })
    }
  }
  

  const handleDeleteReply = (answerId: string) => {
    if (window.confirm("Are you sure you want to delete this reply?")) {
      deleteAnswer({
        courseId,
        contentId,
        questionId: item._id,
        answerId
      }).unwrap()
        .then(() => {
          toast.success("Reply deleted successfully")
          refetch() 

        })
        .catch((error) => {
          toast.error(error?.data?.message || "Failed to delete reply")
        })
    }
  }

  const isAuthorOrAdmin = (userId: string) => {
    return currentUser?._id === userId || currentUser?.role === "admin" ||currentUser?.role === "teacher" 
  }

  return (
    <>
      <div className="my-4 space-y-3">
        <div className="flex justify-between items-start">
          <div className="flex">
            <div className="h-10 w-10 rounded-full overflow-hidden">
              <img
                src={item?.user.avatar ? item.user.avatar.url : "/assets/6.png"}
                alt={`${item?.user.name}'s avatar`}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="pl-3 space-y-1">
              <div className="flex items-center gap-1.5">
                <h5 className="font-medium">{item?.user.name}</h5>
                {item?.user.role === "admin" && (
                  <span className="inline-flex items-center text-xs border border-gray-300 dark:border-gray-700 rounded-full px-1.5 py-0.5">
                    <CheckCircle className="h-3 w-3 mr-1 text-blue-500" />
                    <span>Admin</span>
                  </span>
                )}
              </div>
              <p className="text-sm">{item?.question}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{format(item?.createdAt)}</p>
            </div>
          </div>

          {isAuthorOrAdmin(item.user._id) && (
            <button
              type="button"
              className="p-1.5 rounded-full text-red-500 hover:text-red-700 hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors"
              onClick={handleDeleteQuestion}
              disabled={deletingQuestion}
              aria-label="Delete question"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="flex justify-between items-center pl-12">
          <button
            type="button"
            className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 py-1 px-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            onClick={() => {
              setReplyActive(!replyActive)
              setQuestionId(item._id)
            }}
          >
            {!replyActive ? (item.questionReplies.length !== 0 ? "View all replies" : "Add reply") : "Hide replies"}
          </button>

          <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
            <MessageCircle className="h-4 w-4" />
            <span className="text-xs">{item.questionReplies.length}</span>
          </div>
        </div>

        {replyActive && (
          <div className="space-y-4 pl-12 mt-2">
            {item.questionReplies.length > 0 && (
              <div className="space-y-4">
                {item.questionReplies.map((reply) => (
                  <div key={reply._id} className="flex justify-between items-start">
                    <div className="flex">
                      <div className="h-8 w-8 rounded-full overflow-hidden">
                        <img
                          src={reply?.user?.avatar ? reply.user.avatar.url : "/assets/6.png"}
                          alt={`${reply.user.name}'s avatar`}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="pl-2 space-y-1">
                        <div className="flex items-center gap-1.5">
                          <h5 className="text-sm font-medium">{reply.user.name}</h5>
                          {reply?.user.role === "admin" && (
                            <span className="inline-flex items-center text-[10px] border border-gray-300 dark:border-gray-700 rounded-full px-1 py-0.5">
                              <CheckCircle className="h-2.5 w-2.5 mr-0.5 text-blue-500" />
                              <span>Admin</span>
                            </span>
                          )}
                        </div>
                        <p className="text-sm">{reply.answer}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{format(reply.createdAt)}</p>
                      </div>
                    </div>

                    {isAuthorOrAdmin(reply.user._id) && (
                      <button
                        type="button"
                        className="p-1 rounded-full text-red-500 hover:text-red-700 hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors"
                        onClick={() => handleDeleteReply(reply._id)}
                        disabled={deletingAnswer}
                        aria-label="Delete reply"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}

            <div className="relative mt-3">
              <input
                type="text"
                placeholder="Write your reply..."
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                className="w-full px-3 py-2 pr-20 border border-gray-300 dark:border-gray-700 rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="button"
                className={`absolute right-1 top-1 px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors ${
                  answer.trim() === "" || answerCreationLoading ? "opacity-70 cursor-not-allowed" : ""
                }`}
                onClick={handleReplySubmit}
                disabled={answer.trim() === "" || answerCreationLoading}
              >
                Submit
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="w-full h-[1px] bg-gray-200 dark:bg-gray-800 my-2"></div>
    </>
  )
}