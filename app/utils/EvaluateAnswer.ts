import { Question, QuestionType, QuestionOptionValue } from '../types/question';

interface EvaluationResult {
  isCorrect: boolean;
  userAnswer: string;
}

export default function EvaluateAnswer(
  question: Question,
  selectedOption: QuestionOptionValue | null
): EvaluationResult {
  if (!selectedOption) {
    return { isCorrect: false, userAnswer: "" };
  }

  let isCorrect = false;
  let userAnswer = "";

  switch (question.type) {
    case QuestionType.Single:
      if (typeof selectedOption === 'number') {
        isCorrect = selectedOption === question.correctAnswer;
        userAnswer = question.options?.[selectedOption]?.text || "";
      }
      break;

    case QuestionType.Multiple:
      if (Array.isArray(selectedOption)) {
        const selectedAnswers = selectedOption;
        const correctAnswers = question.correctAnswer;
        isCorrect = 
          selectedAnswers.length === correctAnswers.length &&
          selectedAnswers.every(ans => correctAnswers.includes(ans));
        userAnswer = selectedAnswers
          .map(index => question.options?.[index]?.text)
          .filter(Boolean)
          .join(", ");
      }
      break;

    case QuestionType.Phrase:
      if (typeof selectedOption === 'string' && typeof question.correctAnswer === 'string') {
        isCorrect = selectedOption.trim().toLowerCase() === question.correctAnswer.toLowerCase();
        userAnswer = selectedOption;
      }
      break;

    case QuestionType.Numerical:
      if (typeof selectedOption === 'number' && typeof question.correctAnswer === 'number') {
        isCorrect = selectedOption === question.correctAnswer;
        userAnswer = selectedOption.toString();
      }
      break;
  }

  return { isCorrect, userAnswer };
}