import clsx from "clsx";
import type { TriviaQuestionProps } from "../types";
import { useState } from "react";

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

export default function QuestionCard({ question, number, isChecked, handleSelectedAnswer }: TriviaQuestionProps) {
  const { incorrect_answers, correct_answer, selectAnswer } = question;
  const choices = [correct_answer, ...incorrect_answers];
  const [shuffleQuestion] = useState<string[]>(shuffleArray(choices));

  const choicesButton = shuffleQuestion.map((button, index) => {
    const isSelectedBeforeCheck = selectAnswer === button && !isChecked;
    const isUnrevealedChoice = !isChecked;
    const isWrongSelection = selectAnswer !== question.correct_answer && isChecked && selectAnswer === button;
    const isCorrectSelection = selectAnswer == question.correct_answer && isChecked && selectAnswer === button;
    const isCorrectAnswer = isChecked && button === question.correct_answer;
    const isUnselectedAfterCheck = isChecked && selectAnswer !== button;

    return (
      <button
        onClick={() => handleSelectedAnswer(button)}
        key={index}
        className={clsx(`rounded-xl border p-3 text-xs`, {
          "bg-[#855bfb29] text-[#7132f5]": isSelectedBeforeCheck,
          "border-[#2a2c34]": isUnrevealedChoice,
          "pointer-events-none border-[#dc2626] bg-[#fee2e2] text-[#991b1b]": isWrongSelection,
          "pointer-events-none border-[#22c55e] bg-[#dcfce7] text-[#166534]": isCorrectSelection,
          "pointer-events-none border-[#3b82f6] bg-[#dbeafe] text-[#1e40af]": isCorrectAnswer,
          "pointer-events-none border-[#2a2c34]": isUnselectedAfterCheck,
        })}
      >
        {button}
      </button>
    );
  });

  return (
    <>
      <div className="flex flex-col gap-2 border-b border-[#2a2c34] py-4.5">
        <h1>
          {number}. {question.question}
        </h1>
        <div className="choicesButton flex flex-row gap-3">{choicesButton}</div>
      </div>
    </>
  );
}
