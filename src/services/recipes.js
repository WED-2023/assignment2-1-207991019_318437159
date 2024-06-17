// src/services/recipes.js
import recipe_full_view from "../assets/mocks/recipe_full_view.json";
import recipe_previews from "../assets/mocks/recipe_preview.json";
import favorites_recipes from "../assets/mocks/my_favs.json";
import my_receips from "../assets/mocks/my_recipes.json";

export function mockGetRecipesPreview(amount = 3) {
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

export function mockGetFavoritesRecipes(amount = 5) {
  let recipes = [];
  for (let i = 0; i < amount; i++) {
    let index = i % favorites_recipes.length;
    recipes.push(favorites_recipes[index]);
  }
  return { data: { recipes } };
}

export function mockGetPrivateRecipes(amount = 5) {
  let recipes = [];
  for (let i = 0; i < amount; i++) {
    let index = i % my_receips.length;
    recipes.push(my_receips[index]);
  }
  return { data: { recipes } };
}
