<template>
  <div class="my-recipes-page">
    <div class="list-header">
      <h1 class="list-title">Favorite Recipes</h1>
    </div>
    <RecipePreviewList :amount="5" type="favorites" />
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList.vue";

export default {
  name: "MyRecipes",
  components: {
    RecipePreviewList,
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
  font-family: "Great Vibes", cursive; /* Apply the font to these elements */
  font-size: 95px;
  font-weight: lighter;
}
</style>
