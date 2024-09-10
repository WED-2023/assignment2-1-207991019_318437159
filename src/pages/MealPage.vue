<template>
  <div class="meal-page">
    <div class="meal-header">
      <h1>My Meal</h1>
    </div>
    <div v-if="recipes.length === 0 && !loading">
      <NoResults
        title="No Recipes"
        message="You have not added any recipes to your meal."
      />
    </div>
    <div v-if="recipes.length > 0 && !loading" class="recipes-container">
      <button class="delete-all-button" @click="deleteAllRecipes">
        Delete All
      </button>
      <draggable
        v-model="recipes"
        @end="updateNumbers"
        class="draggable-list"
        :options="{ group: 'recipes', animation: 200 }"
      >
        <div
          v-for="(recipe, index) in recipes"
          :key="recipe.recipe.id"
          class="recipe-item"
        >
          <RecipeInMeal
            :recipe="recipe.recipe"
            :number="index + 1"
            :progress="recipe.recipe.progress"
            :numberOfInstructions="recipe.recipe.numberOfInstructions"
            :analyzedInstructions="recipe.analyzedInstructions"
            @delete-recipe="deleteRecipe"
          />
        </div>
      </draggable>
    </div>
  </div>
</template>

<script>
import RecipeInMeal from "../components/RecipeInMeal.vue";
import NoResults from "../components/NoResults.vue";
import draggable from "vuedraggable";

export default {
  components: {
    RecipeInMeal,
    NoResults,
    draggable,
  },
  data() {
    return {
      recipes: [],
      userService: null,
      loading: true,
    };
  },
  methods: {
    async getRecipes() {
      try {
        const response = await this.userService.getMeal();
        this.recipes.push(...response.data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    },
    updateNumbers() {
      this.recipes = this.recipes.map((recipe, index) => ({
        ...recipe,
        number: index + 1,
      }));
    },
    async deleteRecipe(recipeId) {
      try {
        this.recipes = this.recipes.filter(
          (recipe) => recipe.recipe.id !== recipeId
        );
        this.updateNumbers();
        await this.userService.deleteRecipe(recipeId);
      } catch (error) {
        console.error("Error deleting recipe:", error);
      }
    },
    async deleteAllRecipes() {
      try {
        this.recipes = [];
        await this.userService.deleteMeal();
      } catch (error) {
        console.error("Error deleting recipe:", error);
      }
    },
  },
  async created() {
    this.userService = await import("../services/user.js");
    await this.getRecipes();
    this.loading = false;
  },
};
</script>

<style scoped>
.meal-page {
  background-image: url("../assets/photos/wood_background.jpg");
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 100px 20px 20px;
  box-sizing: border-box;
}

.meal-header {
  margin-bottom: 20px;
}

.meal-header h1 {
  font-size: 3em;
  margin: 0;
}

.recipes-container {
  background: rgba(255, 255, 255, 0.7); /* White transparent background */
  padding: 40px 20px 20px; /* Adjusted padding to ensure visibility of the delete button */
  border-radius: 10px;
  width: 100%;
  max-width: 900px;
  position: relative; /* For positioning the delete button */
  margin-top: 20px; /* Add margin to prevent overlap with header */
}

.delete-all-button {
  position: absolute;
  top: 10px; /* Adjusted to ensure visibility */
  left: 10px;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.4s ease, transform 0.4s ease;
}

.delete-all-button:hover {
  background: rgba(255, 165, 165, 0.9);
  transform: scale(1.05);
}

.draggable-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.recipe-item {
  display: flex;
  justify-content: center;
}
</style>
