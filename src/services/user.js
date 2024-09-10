import api from "../main.js";
const routePrefix = "users";

export async function markFavoirte(recipeId) {
  api.post(`${routePrefix}/markFavorite`, {
    recipeId: recipeId,
  });
}

export async function markViewed(recipeId) {
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

export async function getPrivateRecipes() {
  return api.get(`${routePrefix}/private`);
}

export async function getFavortieRecipes() {
  return api.get(`${routePrefix}/favorites`);
}

export async function getLastViewedRecipes(amount = 4) {
  return api.get(`${routePrefix}/lastViewed/${amount}`);
}

export async function saveNewRecipe(formData) {
  return api.post(`${routePrefix}/saveRecipe`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

export async function updateRecipeProgress(recipeId, progress) {
  return api.post(`${routePrefix}/updateProgress`, {
    recipeId: recipeId,
    progress: progress,
  });
}

export async function getMeal() {
  return api.get(`${routePrefix}/meal`);
}

export async function deleteRecipe(recipeId) {
  return api.delete(`${routePrefix}/meal/${recipeId}`);
}

export async function deleteMeal() {
  return api.delete(`${routePrefix}/meal`);
}
