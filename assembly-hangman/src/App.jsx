import lagnuageData from "../src/data/language.json";
import { useState } from "react";
import clsx from "clsx";
import { getFarewellText } from "./data/utils";
import { getRandomWord } from "./data/utils";
import Confetti from "react-confetti";

export default function App() {
  const [currentWord, setCurrentWord] = useState(() =>
    getRandomWord().toUpperCase(),
  );
  const [guessLetter, setGuessLetter] = useState([]);
  const alphabet = "abcdefghijklmnopqrstuvwxyz";

  const numberGuessesLeft = lagnuageData.length - 1;
  const wrongGuessCount = guessLetter.filter(
    (i) => !currentWord.includes(i),
  ).length;
  console.log(`Guessed Wrong: ${wrongGuessCount}`);

  const isGameLost = wrongGuessCount >= lagnuageData.length - 1;
  const isGameWon = [...currentWord].every((letter) =>
    guessLetter.includes(letter),
  );
  const isGameOver = isGameWon || isGameLost;
  const lastGuessedLetter = guessLetter[guessLetter.length - 1];
  const isLastGuessIncorrect =
    lastGuessedLetter && !currentWord.includes(lastGuessedLetter);

  function addGuessLetter(letter) {
    setGuessLetter((prevLetter) =>
      prevLetter.includes(letter) ? prevLetter : [...prevLetter, letter],
    );
  }

  const languageElement = lagnuageData.map((life, index) => (
    <span
      key={index}
      className={`relative rounded ${life.backgroundColor} text-[${life.color}] p-2 ${index < wrongGuessCount ? "before:absolute before:inset-0 before:flex before:items-center before:justify-center before:bg-black/70 before:text-[0.85rem]" : ""}`}
    >
      {life.name}
    </span>
  ));

  const wordDisplay = [...currentWord].map((letter, index) => {
    const correct = guessLetter.includes(letter.toUpperCase());
    return (
      <span
        key={index}
        className={`flex h-10 w-10 items-center justify-center border-b-2 border-white uppercase ${!correct && isGameLost ? "bg-[#EC5D49]" : "bg-[#323232]"}`}
      >
        {(correct || isGameLost) && letter}
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
        "pointer-events-none": isGameOver,
        "col-start-3": index === 20,
      },
    );

    return (
      <button
        key={index}
        aria-disabled={guessLetter.includes(letter)}
        aria-label={`Letter ${letter}`}
        onClick={() => addGuessLetter(letter.toUpperCase())}
        className={buttonClass}
      >
        {letter.toUpperCase()}
      </button>
    );
  });

  function renderGameStatus() {
    if (!isGameOver && isLastGuessIncorrect) {
      return (
        <>
          <h2>{getFarewellText(lagnuageData[wrongGuessCount - 1]?.name)}</h2>
        </>
      );
    }

    if (isGameWon) {
      return (
        <>
          <h2>You win!</h2>
          <p>Well Done!</p>
        </>
      );
    }

    if (isGameLost) {
      return (
        <>
          <h2>Game over!</h2>
          <p>You Lose!</p>
        </>
      );
    }
  }

  function newGamme() {
    setCurrentWord(getRandomWord().toUpperCase());
    setGuessLetter([]);
  }

  return (
    <main>
      {isGameWon && <Confetti recycle={false} numberOfPieces={1000} />}
      <header className="mb-8 text-center">
        <h1 className="mb-2 text-2xl font-medium text-[#F9F4DA]">
          Assembly: Endgame
        </h1>
        <p className="font-medium text-[#8E8E8E]">
          Guess the word in under 8 attempts to keep the programming language
        </p>
      </header>

      <section
        aria-live="polite"
        role="status"
        className={clsx(
          "mb-8 flex min-h-16 flex-col items-center justify-center rounded py-2 text-[#F9F4DA]",
          {
            "bg-[#10A95B]": isGameWon,
            "border border-dashed bg-violet-400 italic":
              isLastGuessIncorrect && guessLetter.length > 0 && !isGameOver,
            "bg-[#EC5D49]": isGameLost,
          },
        )}
      >
        {renderGameStatus()}
      </section>

      <section className="prog-life mb-10 flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
        {languageElement}
      </section>

      <section className="mb-10 flex justify-center gap-2">
        {wordDisplay}
      </section>

      <section aria-live="polite" role="status" className="sr-only">
        <p>
          {currentWord.includes(lastGuessedLetter)
            ? `Correct! The letter ${lastGuessedLetter} is in the word`
            : `Sorry, the letter ${lastGuessedLetter} is not in the word`}
          You have {numberGuessesLeft} attemps left.
        </p>
        <p>
          Current Word:{" "}
          {[...currentWord]
            .map((letter) =>
              guessLetter.includes(letter) ? letter + "." : "blank.",
            )
            .join(" ")}
        </p>
      </section>

      <section className="mb-10 grid grid-cols-10 grid-rows-3 gap-2.5">
        {keyboard}
      </section>

      {isGameOver && (
        <button
          onClick={newGamme}
          className="mx-auto block w-50 cursor-pointer rounded border border-[#D7D7D7] bg-[#11B5E5] px-1.5 py-3"
        >
          New Game
        </button>
      )}
    </main>
  );
}
