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
      />
    </div>
  </div>
</template>

<script>
import DetailedRecipePreview from "../components/DetailedRecipePreview.vue";
import { mockGetRecipeFullDetails } from "../services/recipes.js";

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
    uploadBackground(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.backgroundImage = e.target.result;
          document.body.style.backgroundImage = `url(${this.backgroundImage})`;
          document.body.style.backgroundSize = "cover";
          document.body.style.backgroundPosition = "center";
          document.body.style.backgroundRepeat = "no-repeat";
        };
        reader.readAsDataURL(file);
      }
    },
  },
  async created() {
    try {
      let recipeId = this.$route.params.Id;
      console.log("Fetching recipe details for ID:", recipeId);
      let response = mockGetRecipeFullDetails(recipeId);
      console.log(response);

      let {
        analyzedInstructions,
        instructions,
        extendedIngredients,
        aggregateLikes,
        readyInMinutes,
        image,
        title,
        cuisine,
        summary,
        servings,
      } = response.data.recipe;

      this.recipe = {
        instructions,
        analyzedInstructions,
        extendedIngredients,
        aggregateLikes,
        readyInMinutes,
        image,
        title,
        cuisine,
        summary,
        servings,
      };
    } catch (error) {
      console.log("Error fetching recipe:", error);
      this.$router.replace("/NotFound");
    }
  },
};
</script>

<style scoped>
.bg-upload-label {
  display: inline-block;
  margin-bottom: 10px;
  font-size: 16px;
  font-weight: bold;
}

#bg-upload {
  display: inline-block;
  margin-bottom: 20px;
}

.background {
  padding: 20px;
  background-color: #f5f5f5;
  background-image: url("../assets/photos/wood_background.jpg"); /* Add your background image here */
  background-size: cover; /* Make sure the background covers the entire area */
  background-position: center; /* Center the background image */
}
</style>
