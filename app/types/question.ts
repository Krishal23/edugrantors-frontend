export enum QuestionType {
  Single = "single",
  Multiple = "multiple",
  Phrase = "phrase",
  Numerical = "numerical",
}

export type QuestionOptionValue = number | number[] | string;

interface QuestionImage {
  url: string;
}

interface BaseQuestion {
  question: string;
  type: QuestionType;
  explanation: string;
  image?: QuestionImage;
  options?: { text: string; isCorrect: boolean }[];
}

interface SingleChoiceQuestion extends Omit<BaseQuestion, 'options'> {
  type: QuestionType.Single;
  options: { text: string; isCorrect: boolean }[];
  correctAnswer: number;
}

interface MultipleChoiceQuestion extends Omit<BaseQuestion, 'options'> {
  type: QuestionType.Multiple;
  options: { text: string; isCorrect: boolean }[];
  correctAnswer: number[];
}

interface PhraseQuestion extends BaseQuestion {
  type: QuestionType.Phrase;
  correctAnswer: string;
}

interface NumericalQuestion extends BaseQuestion {
  type: QuestionType.Numerical;
  correctAnswer: number;
}

export type Question = SingleChoiceQuestion | MultipleChoiceQuestion | PhraseQuestion | NumericalQuestion;