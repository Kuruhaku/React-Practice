import { useState, useEffect, useRef } from "react";
import Dice from "./Dice";
import { nanoid } from "nanoid";
import Confetti from "react-confetti-boom";

export default function App() {
  function generateAllNewDice() {
    return new Array(10).fill(0).map(() => ({
      id: nanoid(),
      number: Math.ceil(Math.random() * 6),
      isHeld: false,
    }));
  }

  const [dice, setDice] = useState(() => generateAllNewDice());
  const buttonRef = useRef(null);
  const gameWon =
    dice.every((number) => number.value === dice[0].value) &&
    dice.every((dice) => dice.isHeld === true);

  useEffect(() => {
    if (gameWon) {
      buttonRef.current.focus();
    }
  }, [gameWon]);

  function newGame() {
    console.log("New Game");
    setDice(() => generateAllNewDice());
  }

  function rollDice() {
    console.log("Roll Dice");
    setDice((prevDice) =>
      prevDice.map((dice) =>
        dice.isHeld === false
          ? { ...dice, number: Math.ceil(Math.random() * 6) }
          : dice,
      ),
    );
  }

  function hold(id) {
    setDice((prevDice) =>
      prevDice.map((dice) =>
        dice.id === id ? { ...dice, isHeld: !dice.isHeld } : dice,
      ),
    );
  }

  const diceElement = dice.map((dice) => (
    <Dice
      key={dice.id}
      id={dice.id}
      value={dice.number}
      isHeld={dice.isHeld}
      hold={hold}
    />
  ));

  return (
    <main className="flex h-screen flex-col items-center justify-center gap-10 border-30 border-[#0B2434]">
      {gameWon && <Confetti />}
      <h1 className="text-3xl font-bold">Tenzies</h1>
      <div aria-live="polite" className="sr-only">
        {gameWon && (
          <p>Congratulations, You Won Press New Game to start again.</p>
        )}
      </div>
      <p>
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls
      </p>

      <div className="dice-container grid grid-cols-5 grid-rows-2 gap-10">
        {diceElement}
      </div>

      <button
        ref={buttonRef}
        onClick={gameWon ? newGame : rollDice}
        className="w-50 rounded border-none bg-[#5035FF] p-4 text-2xl font-bold text-white"
      >
        {gameWon ? "New Game" : "Roll"}
      </button>
    </main>
  );
}
