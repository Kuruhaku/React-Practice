export function IngredientsList(props) {
  // Using ingredients array to map the value into a new array that has <li> tags.
  const ingredientsListItems = props.ingredients.map((ingredients) => (
    <li key={ingredients}>{ingredients}</li>
  ));

  return (
    <section>
      <h2>Ingredients on hand:</h2>
      <ul className="ingredients-list" aria-live="polite">
        {ingredientsListItems}
      </ul>

      {props.ingredients.length > 3 && (
        <div className="get-recipe-container">
          <div>
            <h3>Ready for a recipe?</h3>
            <p>Generate a recipe from your list of ingredients.</p>
          </div>
          <button onClick={props.showRecipe}>Get a recipe</button>
        </div>
      )}
    </section>
  );
}
