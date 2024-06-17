<template>
  <b-container fluid>
    <div class="my-recipes-page">
      <div class="list-header">
        <h1 class="list-title">Favorite Recipes</h1>
      </div>
      <RecipePreviewList :amount="10" type="favorites" />
    </div>
  </b-container>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList.vue";

export default {
  name: "MyRecipes",
  components: {
    RecipePreviewList,
  },
  methods: {
    refreshRecipes() {
      this.$refs.recipePreviewList.updateRecipes();
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap");

.my-recipes-page {
  padding: 20px;
  background-color: #f5f5f5;
  background-image: url("../assets/photos/wood_background.jpg"); /* Add your background image here */
  background-size: cover; /* Make sure the background covers the entire area */
  background-position: center; /* Center the background image */
}

.list-header {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}

.list-title {
  text-align: center;
  margin-bottom: 20px;
  font-family: "Great Vibes", cursive; /* Apply the font to these elements */
  font-size: 80px;
  font-weight: lighter;
}
</style>
