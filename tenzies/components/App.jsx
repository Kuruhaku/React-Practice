import { useState } from "react";
import Dice from "./Dice";
import { nanoid } from "nanoid";

export default function App() {
  const [dice, setDice] = useState(generateAllNewDice());

  function generateAllNewDice() {
    return new Array(10).fill(0).map(() => ({
      id: nanoid(),
      number: Math.ceil(Math.random() * 6),
      isHeld: false,
    }));
  }

  console.log(generateAllNewDice());

  function rollDice() {
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
      <h1 className="text-3xl font-bold">Tenzies</h1>
      <p>
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls
      </p>

      <div className="dice-container grid grid-cols-5 grid-rows-2 gap-10">
        {diceElement}
      </div>

      <button
        onClick={rollDice}
        className="w-35 rounded bg-[#5035FF] p-4 text-2xl font-bold text-white"
      >
        Roll
      </button>
    </main>
  );
}
