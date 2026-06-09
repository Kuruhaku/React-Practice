import { useState, useEffect } from "react";
import QuestionCard from "./components/QuestionCard";
import OptionSection from "./components/OptionSection";
import { categories, numberQuestion, questionType } from "./data/OptionData";
import type { TriviaQuestion } from "./types";

export default function App() {
  const [questions, setQuestion] = useState<TriviaQuestion[]>([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [quizOption, setQuizOption] = useState({
    category: 9,
    number: 10,
    type: "",
  });

  const { category, number, type } = quizOption;

  function handleStartGame() {
    setGameStarted(true);
  }

  function handleCategorySelect(value: number | string, option: string) {
    setQuizOption((prevQuizOtion) => ({ ...prevQuizOtion, [option]: value }));
  }

  const renderedQuestions = questions.map((question, index) => (
    <QuestionCard key={index} question={question} />
  ));

  console.log(quizOption);

  useEffect(() => {
    if (!gameStarted) return;
    const url = `https://opentdb.com/api.php?amount=${number}&category=${category}&type=${type}`;
    const fetchData = async () => {
      const response = await fetch(url);
      const data = await response.json();
      console.log(`Results ${data.results}`);
      setQuestion(data.results);
    };

    fetchData();
  }, [gameStarted]);

  return (
    <>
      <div className="m-auto max-w-210 items-center justify-center p-4">
        <main className="my-4 flex flex-col items-center justify-center">
          <section className="starting-page">
            {!gameStarted && (
              <>
                <h1 className="mb-2 text-center text-3xl leading-[1.17] font-bold text-[#7132f5]">
                  Quizzical
                </h1>
                <p className="mb-2 text-center text-xs">Let's get quizzical</p>
                <OptionSection
                  title="Category"
                  props={categories}
                  isSelected={quizOption}
                  onSelect={handleCategorySelect}
                />

                <OptionSection
                  title="Number of Question"
                  props={numberQuestion}
                  isSelected={quizOption}
                  onSelect={handleCategorySelect}
                />

                <OptionSection
                  title="Type"
                  props={questionType}
                  isSelected={quizOption}
                  onSelect={handleCategorySelect}
                />

                <div className="mt-7 flex justify-center">
                  <button
                    onClick={handleStartGame}
                    className="w-50 rounded-2xl bg-[#855bfb29] p-2"
                  >
                    Start Game
                  </button>
                </div>
              </>
            )}
          </section>
          <section>{gameStarted && renderedQuestions}</section>
        </main>
      </div>
    </>
  );
}
