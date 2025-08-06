export function ClaudeRecipe(props) {
  return (
    <section>
      <h2>Chef Claude Recommends:</h2>
      <pre>{props.recipeText}</pre>
    </section>
  );
}
