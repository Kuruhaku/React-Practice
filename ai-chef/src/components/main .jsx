import { useState } from "react";

export function Main() {
  const [ingredients, setIngredients] = useState([]);

  // Using ingredients array to map the value into a new array that has <li> tags.
  const ingredientsListItems = ingredients.map((ingredients) => (
    <li key={ingredients}>{ingredients}</li>
  ));

  // Get input data and push it in the new state array.
  function handleSumbit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newIngredients = formData.get("ingredient");
    setIngredients((prevList) => [...prevList, newIngredients]);
  }

  return (
    <main>
      <form onSubmit={handleSumbit} className="add-ingredients-forms">
        <input
          type="text"
          placeholder="e.g. oregano"
          aria-label="Add Ingredient"
          name="ingredient"
        />
        <button>Add Ingredient</button>
      </form>

      <ul>{ingredientsListItems}</ul>
    </main>
  );
}
