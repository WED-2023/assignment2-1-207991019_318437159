<template>
  <b-container>
    <div class="list-header">
      <div v-if="isRandom">
        <b-button variant="dark" class="font-weight-bold" @click="updateRecipes"
          >Refresh</b-button
        >
      </div>
      <h3 class="list-title">{{ title }}</h3>
    </div>
    <b-row class="justify-content-center">
      <b-col
        v-for="r in recipes"
        :key="r.id"
        cols="12"
        md="6"
        lg="6"
        class="mb-4 d-flex justify-content-center"
      >
        <RecipePreview class="recipePreview" :recipe="r" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import RecipePreview from "./RecipePreview.vue";
import {
  mockGetRecipesPreview,
  mockGetFavoritesRecipes,
  mockGetPrivateRecipes,
  mockGetLastWatchedRecipes,
} from "../services/recipes.js";

export default {
  name: "RecipePreviewList",
  components: {
    RecipePreview,
  },
  props: {
    title: {
      type: String,
    },
    amount: {
      type: Number,
      default: 4,
    },
    type: {
      type: String,
      default: "random", // 'random', 'favorites', or 'private' or 'search' or 'last-watched'
    },
  },
  data() {
    return {
      recipes: [],
    };
  },
  mounted() {
    this.updateRecipes();
  },
  computed: {
    isRandom() {
      return this.type === "random";
    },
  },
  methods: {
    async updateRecipes() {
      try {
        console.log("Fetching recipes...");
        let response;
        if (this.type === "favorites") {
          response = await mockGetFavoritesRecipes(this.amount);
        } else if (this.type === "private") {
          response = await mockGetPrivateRecipes(this.amount);
        } else if (this.type === "last-watched") {
          console.log("Fetching last watched recipes...");
          response = await mockGetLastWatchedRecipes(this.amount);
          console.log("ron homo ", response);
        } else if (this.type === "search") {
          response = await mockSearchRecipes(this.amount);
        } else {
          response = await mockGetRecipesPreview(this.amount);
        }
        this.recipes = response.data.recipes || [];
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 400px;
}
.recipePreview {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
}
.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.list-title {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin: 0 auto; /* Add this line to center the title */
}
</style>
