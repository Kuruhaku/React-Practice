import type { TriviaQuestionProps } from "../types";
// Backlog:
// - Checkout Fisher-Yates Algorithm
// - Learn more about typeScript

function shuffleArray(arr: string[]) {
  const newArray = [...arr];

  // Using Fisher-Yates Algorithm
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export default function QuestionCard({ question }: TriviaQuestionProps) {
  const { incorrect_answers, correct_answer } = question;
  const choices = [correct_answer, ...incorrect_answers];

  const choicesButton = shuffleArray(choices).map((button, index) => (
    <button key={index} className="">
      {button}
    </button>
  ));

  return (
    <>
      <div className="flex flex-col gap-4">
        <h1>{question.question}</h1>
        <div className="choicesButton flex flex-row gap-2">{choicesButton}</div>
      </div>
    </>
  );
}
