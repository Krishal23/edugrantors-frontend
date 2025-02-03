
// Types
enum QuestionType {
    Single = "single",
    Multiple = "multiple",
    Phrase = "phrase",
    Numerical = "numerical",
  }
  
  interface Question {
    type: QuestionType
    question: string
    options?: { text: string; isCorrect: boolean }[]
    correctAnswer: string | string[] | number
    explanation: string
    image?: {
      url: string
    }
  }
  

// Utility function
function EvaluateAnswer(question: Question, selectedOption: any): { isCorrect: boolean; userAnswer: string } {
  const { type, correctAnswer, options } = question
  let isCorrect = false
  let userAnswer = ""

  switch (type) {
    case QuestionType.Single:
      isCorrect = options?.[selectedOption as number]?.isCorrect ?? false
      userAnswer = options?.[selectedOption as number]?.text ?? ""
      break

    case QuestionType.Multiple:
      const selectedAnswers = ((selectedOption as number[]) || []).map((index) => options?.[index]?.text ?? "")
      isCorrect =
        selectedAnswers.length === (correctAnswer as string[]).length &&
        selectedAnswers.every((answer) => (correctAnswer as string[]).includes(answer))
      userAnswer = selectedAnswers.join(", ")
      break

    case QuestionType.Phrase:
      isCorrect = String(selectedOption).trim().toLowerCase() === String(correctAnswer).trim().toLowerCase()
      userAnswer = selectedOption as string
      break

    case QuestionType.Numerical:
      isCorrect = Number.parseFloat(selectedOption as string) === Number.parseFloat(correctAnswer as string)
      userAnswer = selectedOption as string
      break

    default:
      console.error("Unsupported question type")
  }

  return { isCorrect, userAnswer }
}

export default EvaluateAnswer;