export type TriviaQuestion = {
  category: string;
  correct_answer: string;
  difficulty: string;
  question: string;
  incorrect_answers: string[];
  type: string;
  id: string;
};

export type QuizOption = {
  category: number;
  number: number;
  type: string;
};

export type Data = {
  id: number;
  value: number | string;
  label: string;
  option: keyof QuizOption;
};

export type TriviaQuestionProps = {
  question: TriviaQuestion;
  number: number;
  isChecked: boolean;
};

export type OptionGroupProps = {
  title: string;
  props: Data[];
  isSelected: { category: number; number: number; type: string };
  onSelect: (value: number | string, option: keyof QuizOption) => void;
};

export type ButtonProps = {
  props: Data;
  onSelect: (value: number | string, option: keyof QuizOption) => void;
  isSelected: { category: number; number: number; type: string };
};
