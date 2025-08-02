import { createRoot } from "react-dom/client";
import "./index.css";
import { Cards } from "./components/Card.jsx";
import { movies } from "./data.js";

const movieCard = movies.map((movie) => {
  return <Cards key={movie.id} movie={movie} />;
});

createRoot(document.getElementById("root")).render(
  <main className="m-10 grid grid-cols-4 gap-4">{movieCard}</main>,
);
