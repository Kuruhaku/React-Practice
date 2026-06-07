export type TriviaQuestion = {
  category: string;
  correct_answer: string;
  difficulty: string;
  question: string;
  incorrect_answers: string[];
  type: string;
};

export type TriviaQuestionProps = {
  question: TriviaQuestion;
};
