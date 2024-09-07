<template>
  <div class="background">
    <div v-if="recipe" class="recipe-container">
      <DetailedRecipePreview
        :key="recipe.id"
        :image="recipe.image"
        :title="recipe.title"
        :cuisine="recipe.cuisine"
        :summary="recipe.summary"
        :ingredients="recipe.extendedIngredients"
        :instructions="recipe.instructions"
        :readyInMinutes="recipe.readyInMinutes"
        :servings="recipe.servings"
        :aggregateLikes="recipe.aggregateLikes"
        :glutenFree="recipe.glutenFree"
        :vegan="recipe.vegan"
        :vegetarian="recipe.vegetarian"
        @prepareRecipe="navigateToPreparePage"
        @addToMeal="navigateToMealPage"
      />
    </div>
  </div>
</template>

<script>
import DetailedRecipePreview from "../components/DetailedRecipePreview.vue";
import {
  getRecipeFullDetails,
  mockAddRecipeToMeal,
} from "../services/recipes.js";
import { markViewed } from "../services/user.js";

export default {
  components: {
    DetailedRecipePreview,
  },
  data() {
    return {
      recipe: null,
      backgroundImage: null,
    };
  },
  methods: {
    /**
     * Navigates to the preparation page
     */
    navigateToPreparePage() {
      this.$router.push({ name: "prepare" });
    },
    navigateToMealPage() {
      const addedRecipe = mockAddRecipeToMeal(this.recipe.id);
      this.$router.push({ name: "meal", params: { recipeId: addedRecipe.id } });
    },
  },
  async created() {
    try {
      let recipeId = this.$route.params.recipeId;
      console.log(recipeId);
      if (!!this.$root.store.username) {
        await markViewed(recipeId);
      }
      let response = await getRecipeFullDetails(recipeId);
      let {
        id,
        analyzedInstructions,
        instructions,
        extendedIngredients,
        aggregateLikes,
        readyInMinutes,
        image,
        title,
        cuisine,
        vegan,
        vegetarian,
        glutenFree,
        summary,
        servings,
      } = response.data;

      this.recipe = {
        id,
        instructions,
        analyzedInstructions,
        extendedIngredients,
        aggregateLikes,
        readyInMinutes,
        image,
        title,
        vegan,
        vegetarian,
        glutenFree,
        cuisine,
        summary,
        servings,
      };
    } catch (error) {
      console.error("Error fetching recipe:", error);
      this.$router.replace("/NotFound");
    }
  },
};
</script>

<style scoped>
.background {
  padding: 20px;
  background-color: #f5f5f5;
  background-image: url("../assets/photos/wood_background.jpg");
  background-size: cover;
  background-position: center;
}

.recipe-container {
  position: relative;
}
</style>
