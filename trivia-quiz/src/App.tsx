import { useState, useEffect } from "react";
import QuestionCard from "./components/QuestionCard";
import CategoryButton from "./components/CategoryButton";
import categoriesData from "./data/categoriesData.json";
import numberQuestionData from "./data/numberQuestion.json";
import questionTypeData from "./data/questionType.json";
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

  const categoryButtons = categoriesData.map((category, index) => (
    <CategoryButton
      key={index}
      props={category}
      onSelect={handleCategorySelect}
    />
  ));

  const numberButton = numberQuestionData.map((number, index) => (
    <CategoryButton
      key={index}
      props={number}
      onSelect={handleCategorySelect}
    />
  ));

  const questionTypeButton = questionTypeData.map((type, index) => (
    <CategoryButton key={index} props={type} onSelect={handleCategorySelect} />
  ));

  console.log(quizOption);

  useEffect(() => {
    if (!gameStarted) return;
    // &difficulty=${difficulty}
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
      <main>
        <section className="starting-page">
          {!gameStarted && (
            <>
              <h1>Quizzical</h1>
              <p>Let's get quizzical</p>
              {categoryButtons}
              {numberButton}
              {questionTypeButton}
              <div>
                <button onClick={handleStartGame}>Start Game</button>
              </div>
            </>
          )}
        </section>
        <section>{gameStarted && renderedQuestions}</section>
      </main>
    </>
  );
}
