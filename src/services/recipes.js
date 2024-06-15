// src/services/recipes.js
import recipe_full_view from "../assets/mocks/recipe_full_view.json";
import recipe_previews from "../assets/mocks/recipe_preview.json";

export function mockGetRecipesPreview(amount = 1) {
  let recipes = [];
  const previewLength = recipe_previews.length;
  let usedIndices = new Set();

  while (recipes.length < amount && usedIndices.size < previewLength) {
    let randomIndex = Math.floor(Math.random() * previewLength);

    if (!usedIndices.has(randomIndex)) {
      recipes.push(recipe_previews[randomIndex]);
      usedIndices.add(randomIndex);
    }
  }

  return { data: { recipes } };
}

export function mockGetRecipeFullDetails(recipeId) {
  return { data: { recipe: recipe_full_view } };
}

export function mockSaveNewRecipe(recipe) {
  console.log("Rceipe saved: ", recipe);
}
