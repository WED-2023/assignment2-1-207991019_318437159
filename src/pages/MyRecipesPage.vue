<template>
  <div class="my-recipes-page">
    <div class="list-header">
      <h1 class="list-title">Private Recipes</h1>
    </div>
    <div v-if="noResults" class="no-results-message">
      No private recipes found. Try adding some!
    </div>
    <div v-else>
      <RecipePreviewList
        ref="recipePreviewList"
        :amount="7"
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
  text-align: center;
  font-size: 24px;
  color: #888;
  margin-top: 20px;
}
</style>
