"use client"

import { useEffect, useState } from "react"
import { useAddAnswerInQuestionMutation, useAddNewQuestionMutation } from "@/app/redux/features/courses/coursesApi"
import dynamic from "next/dynamic"
import toast from "react-hot-toast"
import CoursePlayer from "@/app/utils/CoursePlayer"
import NavigationButtons from "./NavigationButtons"
import ContentTabs from "./ContentTabs"
import OverviewTab from "./tabs/OverviewTab"
import ResourcesTab from "./tabs/ResourcesTab"
import QATab from "./tabs/QATab"
import Loader from "../Loader/Loader"

const Quizzes = dynamic(() => import("../Quiz/Quizzes"), {
  loading: () => <Loader message="Loading Quizzes..." />,
})

type Props = {
  data: any
  id: string
  activeVideo: number
  setActiveVideo: (activeVideo: number) => void
  user: any
  refetch?: any
}

const CourseContentMedia = ({ data, id, activeVideo, setActiveVideo, user, refetch }: Props) => {
  const [activeTab, setActiveTab] = useState(0)
  const [question, setQuestion] = useState("")
  const [questionId, setQuestionId] = useState("")


  const [addNewQuestion, { isSuccess, error, isLoading: questionCreationLoading }] = useAddNewQuestionMutation()

  const [addAnswerInQuestion, { isSuccess: answerSuccess, error: answerError, isLoading: answerCreationLoading }] =
    useAddAnswerInQuestionMutation()

  const handleQuestion = () => {
    if (question.length === 0) {
      toast.error("Question can't be empty.")
      return
    }

    addNewQuestion({
      question,
      courseId: id,
      contentId: data[activeVideo]._id,
    })
  }

  const handleAnswerSubmit = (reply: string, questionId: string) => {
    addAnswerInQuestion({
      answer: reply,
      courseId: id,
      contentId: data[activeVideo],
      questionId: questionId,
    })
  }

  useEffect(() => {
    if (isSuccess) {
      setQuestion("")
      refetch()
      // toast.success("Question added successfully")
    }
    if (answerSuccess) {
      refetch()
      // toast.success("Answer added successfully")
    }
    if (error && "data" in error) {
      const errorMessage = error as any
      toast.error(errorMessage.data.message)
    }
    if (answerError && "data" in answerError) {
      toast.error("Error adding answer")
    }
  }, [isSuccess, error, answerSuccess, answerError, refetch])

  const currentContent = data[activeVideo]

  return (
    <div className="w-[95%] 800px:w-[86%] py-8 m-auto">
      <CoursePlayer videoUrl={currentContent?.videoUrl} title={currentContent?.title} />

      <NavigationButtons activeVideo={activeVideo} setActiveVideo={setActiveVideo} totalVideos={data.length} />

      <h1 className="pt-2 text-zinc-800 dark:text-white text-[25px] font-[600]">{currentContent.title}</h1>
      <br />

      <ContentTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <br />

      {activeTab === 0 && <OverviewTab description={currentContent?.description} />}

      {activeTab === 1 && <ResourcesTab links={currentContent?.links} />}

      {activeTab === 2 && (
        <QATab
          user={user}
          question={question}
          setQuestion={setQuestion}
          handleQuestion={handleQuestion}
          questionCreationLoading={questionCreationLoading}
          data={data}
          activeVideo={activeVideo}
          handleAnswerSubmit={handleAnswerSubmit}
          setQuestionId={setQuestionId}
          courseId={id}
          contentId={currentContent._id}
          answerCreationLoading={answerCreationLoading}
          refetch={refetch}
        />
      )}

      {activeTab === 3 && <Quizzes id={id} user={user} />}
    </div>
  )
}

export default CourseContentMedia

