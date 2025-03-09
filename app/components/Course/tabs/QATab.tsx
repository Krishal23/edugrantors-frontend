import QuestionForm from "../questions/QuestionForm"
import QuestionList from "../questions/QuestionList"

type Props = {
  user: any
  question: string
  setQuestion: (question: string) => void
  handleQuestion: () => void
  questionCreationLoading: boolean
  data: any
  activeVideo: number
  handleAnswerSubmit: (answer: string, questionId: string) => void
  setQuestionId: (id: string) => void
  answerCreationLoading: boolean
}

const QATab = ({
  user,
  question,
  setQuestion,
  handleQuestion,
  questionCreationLoading,
  data,
  activeVideo,
  handleAnswerSubmit,
  setQuestionId,
  answerCreationLoading,
}: Props) => {
  return (
    <div className="min-h-[10vh] text-zinc-800 dark:text-white">
      <QuestionForm
        user={user}
        question={question}
        setQuestion={setQuestion}
        handleQuestion={handleQuestion}
        questionCreationLoading={questionCreationLoading}
      />
      <br />
      <br />
      <div className="w-full">
        <QuestionList
          data={data}
          activeVideo={activeVideo}
          handleAnswerSubmit={handleAnswerSubmit}
          user={user}
          setQuestionId={setQuestionId}
          answerCreationLoading={answerCreationLoading}
        />
      </div>
    </div>
  )
}

export default QATab

