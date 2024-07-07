import api from "../main.js";
const routePrefix = "users";

export function markFavoirte(recipeId) {
  api.post(`${routePrefix}/markFavorite`, {
    recipeId: recipeId,
  });
}

export function markViewed(recipeId) {
  api.post(
    `${routePrefix}/markViewed`,
    {
      recipeId: recipeId,
    },
    {
      withCredentials: true,
    }
  );
}

export function mockMarkViewed(recipeId, userId) {
  return {
    status: 200,
    response: {
      data: {
        message: "The Recipe successfully marked as viewed",
        success: true,
      },
    },
  };
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
