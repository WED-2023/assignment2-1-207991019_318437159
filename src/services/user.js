
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
