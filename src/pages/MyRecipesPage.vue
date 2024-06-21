<template>
  <div class="my-recipes-page">
    <div class="list-header">
      <h1 class="list-title">Private Recipes</h1>
    </div>
    <div v-if="noResults" class="no-results-message">
      <div class="no-results-box">
        <i class="fas fa-ban no-results-icon"></i>
        <h3>No Private Recipes !</h3>
        <p>You've yet to create any recipes</p>
      </div>
    </div>
    <div v-else>
      <RecipePreviewList
        ref="recipePreviewList"
        :amount="4"
        type="private"
        @no-results="handleNoResultsFound"
      />
    </div>
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList.vue";

export default {
  name: "MyRecipes",
  components: {
    RecipePreviewList,
  },
  data() {
    return {
      noResults: false,
    };
  },
  methods: {
    handleNoResultsFound() {
      this.noResults = true;
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap");

.my-recipes-page {
  min-height: 100vh; /* Ensure the page covers the full viewport height */
  margin-top: 3%;
  padding: 40px;
  background-image: url("../assets/photos/wood_background.jpg");
  background-size: cover;
  background-position: center;
}

.list-header {
  display: flex;
  justify-content: center;
  align-items: center;
}

.list-title {
  text-align: center;
  margin-bottom: 10px;
  font-family: "Great Vibes", cursive;
  font-size: 80px;
  font-weight: lighter;
}

.no-results-message {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px; /* Adjust height as needed */
}

.no-results-box {
  text-align: center;
  background: rgba(255, 255, 255, 0.8); /* Slightly opaque background */
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.no-results-icon {
  font-size: 60px;
  color: #888;
  margin-bottom: 10px;
}
</style>
