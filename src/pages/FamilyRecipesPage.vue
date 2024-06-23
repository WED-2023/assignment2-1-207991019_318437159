<template>
  <div class="family-recipes">
    <h2>My Family Recipes</h2>
    <RecipeDetail
      v-for="recipe in recipes"
      :key="recipe.ID"
      :image="getImagePath(recipe.Image)"
      :title="recipe.Title"
      :maker="recipe.Maker"
      :occasion="recipe.Occasion"
      :ingredients="recipe.Ingredients"
      :directions="recipe.Directions"
      class="space-between-recipes"
    />
  </div>
</template>

<script>
import RecipeDetail from "../components/FamilyRecipeDetail.vue";
import FamilyRecipes from "../assets/FamilyRecipes.json";

export default {
  name: "MyFamilyRecipes",
  components: {
    RecipeDetail,
  },
  data() {
    return {
      recipes: FamilyRecipes.FamilyRecipes, // Use the imported JSON data
    };
  },
  methods: {
    /**
     * Gets the path for the recipe image
     * @param {string} image - The image filename
     * @returns {string} - The path to the image
     */
    getImagePath(image) {
      try {
        return require(`@/assets/${image}`);
      } catch (e) {
        console.error(`Image not found: ${image}`);
        return "";
      }
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap");

.family-recipes {
  margin-top: 3%;
  padding: 20px;
  background-color: #f5f5f5;
  background-image: url("../assets/photos/wood_background.jpg");
  background-size: cover;
  background-position: center;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
  margin-top: 10px;
  font-family: "Great Vibes", cursive;
  font-size: 80px;
  font-weight: lighter;
}

.space-between-recipes {
  margin-bottom: 20px; /* Add space between recipes */
}
</style>
