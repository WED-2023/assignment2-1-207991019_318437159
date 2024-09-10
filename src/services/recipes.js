// src/services/recipes.js
import api from "../main.js";
import categories from "../assets/categories.json";
const routePrefix = "recipes";

export async function getRandomRecipes(amount = 3) {
  return await api.get(`${routePrefix}/random/${amount}`);
}

export async function searchRecipes(
  searchQuery,
  amount,
  selectedCuisines,
  selectedIntolerance,
  selectedDiets
) {
  return await api.post(`${routePrefix}/search`, {
    queryName: searchQuery,
    amount: amount,
    cuisines: selectedCuisines,
    intolerances: selectedIntolerance,
    diets: selectedDiets,
  });
}

export async function getRecipeFullDetails(recipeId) {
  return api.get(`${routePrefix}/${recipeId}`);
}

export async function getRecipeInstructions(recipeId) {
  return api.get(`${routePrefix}/instructions/${recipeId}`);
}

export function getCategoriesForSearch() {
  return { data: categories };
}
