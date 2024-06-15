<template>
  <b-container>
    <div class="list-header">
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
import { mockGetRecipesPreview } from "../services/recipes.js";

export default {
  name: "RecipePreviewList",
  components: {
    RecipePreview,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      default: 6,
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
  methods: {
    async updateRecipes() {
      try {
        console.log("Fetching recipes...");
        const response = await mockGetRecipesPreview(this.amount);
        this.recipes = response.data.recipes || [];
      } catch (error) {
        console.log(error);
      }
    },
    refreshRecipes() {
      this.updateRecipes();
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
  max-width: 500px;
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
