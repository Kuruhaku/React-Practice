export type TriviaQuestion = {
  category: string;
  correct_answer: string;
  difficulty: string;
  question: string;
  incorrect_answers: string[];
  type: string;
};

export type Data = {
  value: number | string;
  label: string;
  option: string;
};

export type TriviaQuestionProps = {
  question: TriviaQuestion;
};

export type ButtonProps = {
  props: Data;
  onSelect: (id: number | string, option: string) => void;
};
