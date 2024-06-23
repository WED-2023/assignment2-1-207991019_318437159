<template>
  <div class="my-recipes-page">
    <div class="list-header">
      <h1 class="list-title">Favorite Recipes</h1>
    </div>
    <NoResults
      v-if="noResults"
      title="No Favorite Recipes!"
      message="You've yet to add any favorite recipes"
    />
    <div v-else>
      <RecipePreviewList
        ref="recipePreviewList"
        :amount="Number(4)"
        type="favorites"
        @no-results="handleNoResultsFound"
      />
    </div>
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList.vue";
import NoResults from "../components/NoResults.vue";

export default {
  name: "MyFavorites",
  components: {
    RecipePreviewList,
    NoResults,
  },
  data() {
    return {
      noResults: false,
    };
  },
  methods: {
    /**
     * Handles the event when no results are found
     */
    handleNoResultsFound() {
      this.noResults = true;
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap");

.my-recipes-page {
  min-height: 100vh; 
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
</style>
