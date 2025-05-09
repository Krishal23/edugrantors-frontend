const avatar = "/assets/6.png"

type Props = {
  user: any
  question: string
  setQuestion: (question: string) => void
  handleQuestion: () => void
  questionCreationLoading: boolean
}

const QuestionForm = ({ user, question, setQuestion, handleQuestion, questionCreationLoading }: Props) => {
  return (
    <>
      <div className="flex w-full items-center">
        <img
          src={user.avatar ? user.avatar.url : avatar}
          width={50}
          height={50}
          alt="User Avatar"
          className="w-[50px] h-[50px] object-cover rounded-full"
        />
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          cols={40}
          rows={3}
          placeholder="Write Your Question..."
          className="outline-none bg-transparent ml-3 border border-[#39404e] dark:border-[#c0c0c0] text-gray-800 dark:text-gray-200 w-[90%] p-2 rounded-lg focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400"
        />
      </div>
      <div className="w-full flex justify-end mt-1">
        <button
          onClick={questionCreationLoading ? () => {} : handleQuestion}
          className={`bg-zinc-900 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-all focus:ring-2 focus:ring-blue-500 ${
            questionCreationLoading && "cursor-not-allowed"
          }`}
        >
          Submit
        </button>
      </div>
    </>
  )
}

export default QuestionForm

