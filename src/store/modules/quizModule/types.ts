export interface QuizModel {
  isQuiz: boolean,
  currentPage: number,
  currentQuiz: Quiz | null,
  allQuizzes: Quiz[] | null,
  quizResult: QuizResult | null
}

export interface Choice {
  choice: string,
  truthy: boolean
}

export type QuestionResult = 'right' | 'wrong';

export interface QuestionModel {
  name: string,
  question: string,
  picture?: string,
  audio?: string,
  video?: string,
  result?: QuestionResult,
  choices: Choice[],
}

export interface Quiz {
  name: string,
  description: string,
  questions: QuestionModel[]
}

export interface Answer {
  question: string,
  answer: string,
  result: string
}

export interface QuizResult {
  name: string,
  answers: Answer[]
}