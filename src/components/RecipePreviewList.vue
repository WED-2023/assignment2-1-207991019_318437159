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
    <NoResults
      v-if="recipes.length === 0 && showEmptyMessage"
      title="No Recipes Found"
      message="You haven't viewed any recipes yet."
    />
    <b-row v-else class="justify-content-center">
      <b-col
        v-for="r in sortedRecipes"
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
import NoResults from "./NoResults.vue";
export default {
  name: "RecipePreviewList",
  components: {
    RecipePreview,
    NoResults,
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
      default: "random", // 'random', 'favorites', 'private', 'search', or 'last-watched'
    },
    searchQuery: {
      type: String,
      default: "",
    },
    selectedCuisines: {
      type: Array,
      default: () => [],
    },
    selectedIntolerance: {
      type: Array,
      default: () => [],
    },
    selectedDiets: {
      type: Array,
      default: () => [],
    },
    sort: {
      type: String,
      default: "Popularity",
    },
    showEmptyMessage: {
      type: Boolean,
      default: false, // Control to show or hide the NoResults component
    },
  },
  data() {
    return {
      recipes: [],
    };
  },
  computed: {
    isRandom() {
      return this.type === "random";
    },
    sortedRecipes() {
      const sorted = [...this.recipes].sort((a, b) => {
        if (this.sort === "Popularity") {
          return b.aggregateLikes - a.aggregateLikes;
        } else if (this.sort === "Time To Make") {
          return a.readyInMinutes - b.readyInMinutes;
        }
        return 0;
      });
      return sorted;
    },
  },
  mounted() {
    this.updateRecipes();
  },
  methods: {
    /**
     * Fetches recipes based on the type and updates the recipes list
     */
    async updateRecipes() {
      const recipes = await import("../services/recipes.js");
      const userService = await import("../services/user.js");
      try {
        let response;
        if (this.type === "favorites") {
          response = await userService.getFavortieRecipes();
        } else if (this.type === "private") {
          response = await userService.getPrivateRecipes(this.amount);
        } else if (this.type === "last-viewed") {
          response = await userService.getLastViewedRecipes(this.amount);
        } else if (this.type === "search") {
          response = await recipes.searchRecipes(
            this.searchQuery,
            this.amount,
            this.selectedCuisines,
            this.selectedIntolerance,
            this.selectedDiets
          );
        } else {
          response = await recipes.getRandomRecipes(this.amount);
        }
        this.recipes = response.data || [];
        if (this.recipes.length === 0) {
          this.$emit("no-results");
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
  watch: {
    amount() {
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
  margin: 0 auto;
}
</style>
