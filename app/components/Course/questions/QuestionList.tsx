import QuestionItem from "./QuestionItem"
import { MdOutlineQuestionAnswer } from "react-icons/md"

type Props = {
  data: any
  activeVideo: number
  handleAnswerSubmit: (answer: string, questionId: string) => void
  user: any
  setQuestionId: (id: string) => void
  answerCreationLoading: boolean
  courseId:any
  contentId:any
  refetch?:any
}


const QuestionList = ({ data,refetch, activeVideo, handleAnswerSubmit, setQuestionId, answerCreationLoading,courseId,contentId }: Props) => {
  return (
    <div className="w-full mb-auto p-4 rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 flex items-center gap-2">
        <MdOutlineQuestionAnswer className="text-blue-500" />
        Comments
      </h3>
      <div className="w-full my-3">
        {[...data[activeVideo].questions].reverse().map((item: any, index: number) => (
          <QuestionItem
            key={index}
            item={item}
            handleAnswerSubmit={handleAnswerSubmit}
            setQuestionId={setQuestionId}
            answerCreationLoading={answerCreationLoading}
            courseId={courseId}
            contentId={contentId}
            refetch={refetch}
          />
        ))}
      </div>
    </div>
  )
}

export default QuestionList

