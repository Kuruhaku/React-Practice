import { useState } from "react";
import { ClaudeRecipe } from "./CaludeRecipe";
import { IngredientsList } from "./IngredientsList";
// import { getRecipeFromMistral } from "../../ai.js";

export function Main() {
  const [ingredients, setIngredients] = useState([]);
  const [shownRecipe, setShownRecipe] = useState(false);
  const [recipeText, setRecipeText] = useState("");

  // Get input data and push it in the new state array.
  function handleSumbit(formData) {
    const newIngredients = formData.get("ingredient");
    setIngredients((prevList) => [...prevList, newIngredients]);
  }

  // Check if going to show the recipe or not
  async function showRecipe() {
    // Posting the ingredients to the server.
    try {
      const response = await fetch("http://localhost:8080/api/getRecipe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ingredients: ingredients }),
      });

      // Wait for the response recipe and set it to recipeText.
      const data = await response.json();
      setRecipeText(data.recipe);
    } catch (err) {
      console.error("Error fetching recipe:", err);
    }

    // Will set always to true when setting.
    setShownRecipe(true);
  }

  // If Using ai.js without backend.
  // async function showRecipeWithoutDatabase() {
  //   const recipe = await getRecipeFromMistral(ingredients);
  //   setRecipeText(recipe);
  //   setShownRecipe(true);
  // }

  return (
    <main>
      <form action={handleSumbit} className="add-ingredients-forms">
        <input
          type="text"
          placeholder="e.g. oregano"
          aria-label="Add Ingredient"
          name="ingredient"
        />
        <button>Add Ingredient</button>
      </form>
      {ingredients.length > 0 && (
        <IngredientsList ingredients={ingredients} showRecipe={showRecipe} />
      )}
      {shownRecipe && <ClaudeRecipe recipeText={recipeText} />}
    </main>
  );
}
