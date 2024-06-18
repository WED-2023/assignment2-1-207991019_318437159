// src/services/recipes.js
import recipe_full_view from "../assets/mocks/recipe_full_view.json";
import recipe_previews from "../assets/mocks/recipe_preview.json";
import categories from "../assets/mocks/categories.json";
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

function genericMock(amount, gen_recipes) {
  let recipes = [];
  for (let i = 0; i < amount; i++) {
    let index = i % gen_recipes.length;
    recipes.push(gen_recipes[index]);
  }
  return { data: { recipes } };
}

export function mockGetFavoritesRecipes(amount = 5) {
  return genericMock(amount, favorites_recipes);
}

export function mockGetPrivateRecipes(amount = 5) {
  return genericMock(amount, my_receips);
}

export function mockGetLastWatchedRecipes(amount = 5) {
  return genericMock(amount, favorites_recipes);
}

export function mockGetCategoriesForSearch() {
  return { data: categories };
}

export async function mockSearchRecipes(searchQuery, amount, selectedCuisines, selectedIntolerance, selecteddiets) {
  const response = mockGetRecipesPreview(amount);
  console.log(`mockSearchRecipes: Returning ${response.data.recipes.length} recipes for search query "${searchQuery}"`);
  return response;
}

