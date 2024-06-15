<template>
  <div>
    <div>
      <label for="bg-upload" class="bg-upload-label"
        >Upload Background Image</label
      >
      <input
        type="file"
        id="bg-upload"
        @change="uploadBackground"
        accept="image/*"
      />
    </div>
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
    DetailedRecipePreview
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
          document.body.style.backgroundSize = 'cover';
          document.body.style.backgroundPosition = 'center';
          document.body.style.backgroundRepeat = 'no-repeat';
        };
        reader.readAsDataURL(file);
      }
    }
  },
  methods: {
    uploadBackground(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.backgroundImage = e.target.result;
          document.body.style.backgroundImage = `url(${this.backgroundImage})`;
          document.body.style.backgroundSize = 'cover';
          document.body.style.backgroundPosition = 'center';
          document.body.style.backgroundRepeat = 'no-repeat';
        };
        reader.readAsDataURL(file);
      }
    }
  },
  async created() {
    try {
<<<<<<< HEAD
      let recipeId = this.$route.params.Id;
      console.log('Fetching recipe details for ID:', recipeId);
=======
      let recipeId = this.$route.params.recipeId;
      console.log("Fetching recipe details for ID:", recipeId);
>>>>>>> f62075d (fixed navbar)
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
        servings
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
        servings
      };
    } catch (error) {
      console.log("Error fetching recipe:", error);
      this.$router.replace("/NotFound");
    }
  },
  methods: {
    toggleFavorite() {
      this.isLiked = !this.isLiked;
    },
  },
};
</script>

<style scoped>
.recipe-container {
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  color: #333;
  max-width: 1000px;
  margin: 0 auto;
  background-color: rgba(
    255,
    255,
    255,
    0.9
  ); /* Add a slight white background with transparency */
}

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
</style>
