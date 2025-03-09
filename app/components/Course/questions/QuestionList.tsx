import QuestionItem from "./QuestionItem"
import { MdOutlineQuestionAnswer } from "react-icons/md"

type Props = {
  data: any
  activeVideo: number
  handleAnswerSubmit: (answer: string, questionId: string) => void
  user: any
  setQuestionId: (id: string) => void
  answerCreationLoading: boolean
}

const QuestionList = ({ data, activeVideo, handleAnswerSubmit, user, setQuestionId, answerCreationLoading }: Props) => {
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
          />
        ))}
      </div>
    </div>
  )
}

export default QuestionList

