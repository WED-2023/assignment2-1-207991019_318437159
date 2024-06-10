// src/services/recipes.js
import recipe_full_view from "../assets/mocks/recipe_full_view.json";
import recipe_previews from "../assets/mocks/recipe_preview.json";

export function mockGetRecipesPreview(amount = 1) {
  let recipes = [];
  const previewLength = recipe_previews.length;
  for (let i = 0; i < amount; i++) {
    recipes.push(recipe_previews[i % previewLength]);
  }

  return { data: { recipes: recipes } };
}

export function mockGetRecipeFullDetails(recipeId) {
  return { data: { recipe: recipe_full_view } };
}
