// src/services/recipes.js
import recipe_previews from "../assets/mocks/recipe_preview.json";
import api from "../main.js";
import categories from "../assets/mocks/categories.json";
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


export function mockGetRecipeInstructions() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(instructions);
    });
  });
}

export function mockGetCategoriesForSearch() {
  return { data: categories };
}

export function mockAddRecipeToMeal(ID) {
  let recipes = [];
  const previewLength = recipe_previews.length;
  let usedIndices = new Set();

  while (recipes.length < 1) {
    let randomIndex = Math.floor(Math.random() * previewLength);

    if (!usedIndices.has(randomIndex)) {
      recipes.push(recipe_previews[randomIndex]);
      usedIndices.add(randomIndex);
    }
  }
  const result = { data: { recipes } };
  console.log("mockGetRecipesPreview result:", result); // Debug line
  return result;
}
