import ReactMarkdown from "react-markdown";

export function ClaudeRecipe(props) {
  const markdown = <ReactMarkdown>{props.recipeText}</ReactMarkdown>;
  return (
    <section className="suggested-recipe-container">
      <h2>Hugging Face Generated Recipe:</h2>
      {markdown}
    </section>
  );
}
