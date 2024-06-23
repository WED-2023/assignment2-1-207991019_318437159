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
        @prepareRecipe="navigateToPreparePage"
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
    /**
     * Uploads and sets the background image for the page
     * @param {Event} event - The file input change event
     */
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
    /**
     * Navigates to the preparation page
     */
    navigateToPreparePage() {
      this.$router.push({ name: "prepare" });
    },
  },
  async created() {
    try {
      let recipeId = this.$route.params.Id;
      let response = mockGetRecipeFullDetails(recipeId);

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