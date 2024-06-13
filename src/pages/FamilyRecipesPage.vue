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
      class="Space-between-recipes"
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
      recipes: FamilyRecipes.FamilyRecipes // Use the imported JSON data
    };
  },
  methods: {
    getImagePath(image) {
      try {
        return require(`@/assets/${image}`);
      } catch (e) {
        console.error(`Image not found: ${image}`);
        return '';
      }
    }
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap');

.family-recipes {
  padding: 20px;
  background-color: #f5f5f5;
  background-image: url('../assets/wood_background.jpg'); /* Add your background image here */
  background-size: cover; /* Make sure the background covers the entire area */
  background-position: center; /* Center the background image */
}

h2 {
  text-align: center;
  margin-bottom: 20px;
  font-family: 'Great Vibes', cursive; /* Apply the font to these elements */
  font-size: 80px;
  font-weight:lighter;
}

.Space-between-recipes {
  margin-bottom: 20px; /* Add space between recipes */
}

</style>
