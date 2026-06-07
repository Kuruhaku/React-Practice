import { useState, useEffect } from "react";
import QuestionCard from "./components/QuestionCard";
import type { TriviaQuestion } from "./types";

export default function App() {
  const [triviaQuestions, setTriviaQuestions] = useState<TriviaQuestion[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("https://opentdb.com/api.php?amount=10");
      const data = await response.json();
      console.log(data.results);
      setTriviaQuestions(data.results);
    };

    fetchData();
  }, []);

  const putTrivia = triviaQuestions.map((question, index) => (
    <QuestionCard key={index} question={question} />
  ));

  return (
    <>
      <h1>Hello World</h1>
      <section>{putTrivia}</section>
    </>
  );
}
