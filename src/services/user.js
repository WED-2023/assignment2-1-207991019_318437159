// src/services/user.js
import recipe_full_view from "../assets/mocks/recipe_full_view.json";
import recipe_preview from "../assets/mocks/recipe_preview.json";

export function mockToggleFavorite(recipeId, userId) {
  return {
    status: 200,
    response: {
      data: {
        message: "The Recipe successfully changed its recipe value",
        success: true,
      },
    },
  };
}

export function mockGetIsFaviorite(recipeId, userId) {
  return true;
}

export function mockAddUserRecipe(recipeDetails) {
  return {
    status: 200,
    response: {
      data: {
        message: "The Recipe successfully added to My Recipes",
        success: true,
      },
    },
  };
}
