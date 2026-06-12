import { useState, useEffect } from "react";
import QuestionCard from "./components/QuestionCard";
import OptionSection from "./components/OptionSection";
import { categories, numberQuestion, questionType } from "./data/OptionData";
import type { TriviaQuestion } from "./types";
import { nanoid } from "nanoid";

// TODO: A loading to wait all resouces is ready and show it.
// TODO: Maybe add something to made accessible for screen reader.

export default function App() {
  const [questions, setQuestion] = useState<TriviaQuestion[]>([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [isChecked, setisChecked] = useState(false);
  const [isPlayAgain, setIsPlayAgain] = useState(false);
  const [totalScore, setTotalScore] = useState(0);
  const [rateLimit, setRateLimit] = useState(10);
  const [quizOption, setQuizOption] = useState({
    category: 9,
    number: 10,
    type: "",
  });

  const { category, number, type } = quizOption;
  const isRateLimitOn = rateLimit != null && rateLimit > 0;

  function handleSelectedAnswer(questionsID: string, answer: string) {
    // console.log(questionsID);
    // console.log(answer);
    if (isChecked) return;
    setQuestion((prevQuestion) => prevQuestion.map((q) => (q.id === questionsID ? { ...q, selectAnswer: answer } : q)));
  }

  function handleGameMenu() {
    setisChecked(false);
    setIsPlayAgain(false);
    setGameStarted(false);
  }

  function handleStartGame() {
    setGameStarted(true);
  }

  function handleCheckedAnswer() {
    setisChecked(true);

    const finalScore = questions.reduce((score, q) => {
      return q.selectAnswer === q.correct_answer ? score + 1 : score;
    }, 0);

    setTotalScore(finalScore);
  }

  function handlePlayAgain() {
    setTotalScore(0);
    setIsPlayAgain((prev) => !prev);
    setisChecked(false);
    setQuestion([]);
    setRateLimit(5);
  }

  function handleCategorySelect(value: number | string, option: string) {
    setQuizOption((prevQuizOtion) => ({ ...prevQuizOtion, [option]: value }));
  }

  const renderedQuestions = questions.map((question, index) => {
    return (
      <QuestionCard
        key={question.id}
        number={index + 1}
        question={question}
        isChecked={isChecked}
        handleSelectedAnswer={(ans) => handleSelectedAnswer(question.id, ans)}
      />
    );
  });

  useEffect(() => {
    if (!gameStarted) return;

    const url = `https://opentdb.com/api.php?amount=${number}&category=${category}&type=${type}`;
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setQuestion(data.results.map((q: TriviaQuestion) => ({ ...q, id: nanoid() })));
      } catch (error) {
        console.log(`Error Occurred: ${error}`);
      }
    };

    fetchData();
  }, [gameStarted, isPlayAgain, number, category, type]);

  useEffect(() => {
    if (!isChecked && rateLimit === null) {
      return;
    }

    const timeoutID = window.setTimeout(() => {
      if (isChecked && rateLimit > 0) {
        setRateLimit(rateLimit - 1);
      }
    }, 1000);

    return () => window.clearTimeout(timeoutID);
  }, [isChecked, rateLimit]);

  return (
    <>
      <div className="m-auto max-w-210 justify-center p-4">
        <main className="my-4 flex flex-col items-center justify-center">
          <section className="starting-page">
            {!gameStarted && (
              <>
                <h1 className="mb-2 text-center text-3xl leading-[1.17] font-bold text-[#7132f5]">Quizzical</h1>
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
                  <button onClick={() => handleStartGame()} className="w-50 rounded-2xl bg-[#855bfb29] p-2">
                    Start Game
                  </button>
                </div>
              </>
            )}
          </section>
          <section>
            {gameStarted && (
              <>
                {renderedQuestions}
                {isChecked ? (
                  <div className="mt-7 flex items-center justify-center gap-5">
                    <div>
                      <p>
                        You Scored: {totalScore} / {quizOption.number} correct Answer
                      </p>
                    </div>
                    <button
                      onClick={() => handlePlayAgain()}
                      disabled={isRateLimitOn}
                      className={`w-50 rounded-2xl p-2 ${isRateLimitOn ? "border bg-[#855bfb10]" : "bg-[#855bfb29]"}`}
                    >
                      Play Again {isRateLimitOn && rateLimit}
                    </button>
                    <button onClick={() => handleGameMenu()} className="w-50 rounded-2xl bg-[#855bfb29] p-2">
                      Game Menu
                    </button>
                  </div>
                ) : (
                  <div className="mt-7 flex justify-center">
                    <button onClick={() => handleCheckedAnswer()} className="w-50 rounded-2xl bg-[#855bfb29] p-2">
                      Check Answer
                    </button>
                  </div>
                )}
              </>
            )}
          </section>
        </main>
      </div>
    </>
  );
}
