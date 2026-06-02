import lagnuageData from "../src/data/language.json";
import { useState } from "react";
import clsx from "clsx";

export default function App() {
  const [currentWord, setCurrentWord] = useState("REACT");
  const [guessLetter, setGuessLetter] = useState([]);
  const alphabet = "abcdefghijklmnopqrstuvwxyz";

  function addGuessLetter(letter) {
    setGuessLetter((prevLetter) =>
      prevLetter.includes(letter) ? prevLetter : [...prevLetter, letter],
    );
  }

  const languageElement = lagnuageData.map((life, index) => (
    <span
      key={index}
      className={`rounded ${life.backgroundColor} text-[${life.color}] p-2`}
    >
      {life.name}
    </span>
  ));

  const wordDisplay = [...currentWord].map((letter, index) => {
    const correct = guessLetter.includes(letter.toUpperCase());
    const displayClass = clsx(
      "flex h-10 w-10 items-center justify-center border-b-2 border-white bg-[#323232] uppercase",
      { "text-white": correct, "text-[#323232]": !correct },
    );
    return (
      <span key={index} className={displayClass}>
        {letter}
      </span>
    );
  });

  const keyboard = [...alphabet].map((letter, index) => {
    const isGuessed = guessLetter.includes(letter.toUpperCase());
    const isCorrect = isGuessed && currentWord.includes(letter.toUpperCase());
    const isWrong = isGuessed && !currentWord.includes(letter.toUpperCase());
    const buttonClass = clsx(
      "h-10 w-10 cursor-pointer rounded border border-[#D7D7D7] font-semibold text-[#1E1E1E]",
      {
        "pointer-events-none bg-[#10A95B]": isGuessed && isCorrect,
        "pointer-events-none bg-[#EC5D49]": isWrong,
        "bg-[#FCBA29]": !isGuessed,
        "col-start-3": index === 20,
      },
    );

    console.log(buttonClass);

    return (
      <button
        key={index}
        onClick={() => addGuessLetter(letter.toUpperCase())}
        className={buttonClass}
      >
        {letter.toUpperCase()}
      </button>
    );
  });

  return (
    <main>
      <header className="mb-8 text-center">
        <h1 className="mb-2 text-2xl font-medium text-[#F9F4DA]">
          Assembly: Endgame
        </h1>
        <p className="font-medium text-[#8E8E8E]">
          Guess the word in under 8 attempts to keep the programming language
        </p>
      </header>

      <section className="mb-5 flex flex-col items-center rounded bg-[#10A95B] py-2 text-[#F9F4DA]">
        <h2 className="text-xl">You Win!</h2>
        <p className="text-base">Well done! 🎉</p>
      </section>

      <section className="prog-life mb-10 flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
        {languageElement}
      </section>

      <section className="mb-10 flex justify-center gap-2">
        {wordDisplay}
      </section>

      <section className="mb-10 grid grid-cols-10 grid-rows-3 gap-2.5">
        {keyboard}
      </section>

      <button className="mx-auto block w-50 cursor-pointer rounded border border-[#D7D7D7] bg-[#11B5E5] px-1.5 py-3">
        New Game
      </button>
    </main>
  );
}
