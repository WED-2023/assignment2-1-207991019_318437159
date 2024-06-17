<template>
  <b-container fluid>
    <b-row>
      <!-- Left Column: Random Recipes -->
      <b-col cols="12" lg="6" class="left-column">
        <div class="list-header">
          <h3 class="list-title">Explore these recipes</h3>
          <b-button variant="dark" @click="refreshRandomRecipes"
            >Refresh</b-button
          >
        </div>
        <RecipePreviewList
          ref="randomRecipeList"
          title="Random Recipes"
          :amount="3"
        />
      </b-col>
      <!-- Right Column: Last Viewed Recipes or Login Box -->
      <b-col cols="12" lg="6" class="right-column">
        <div v-if="isLoggedIn">
          <RecipePreviewList title="Last Watched Recipes" :amount="3" />
        </div>
        <div v-else class="login-container">
          <LoginBox />
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList.vue";
import LoginBox from "../components/LoginBox.vue";

export default {
  name: "MainPage",
  components: {
    RecipePreviewList,
    LoginBox,
  },
  computed: {
    isLoggedIn() {
      return !!this.$root.store.username;
    },
  },
  methods: {
    refreshRandomRecipes() {
      if (this.$refs.randomRecipeList) {
        this.$refs.randomRecipeList.updateRecipes();
      }
    },
  },
};
</script>

<style scoped>
.left-column,
.right-column {
  padding: 20px;
}

.left-column {
  background-color: #ffffff; /* Light Teal */
}

.right-column {
  background-color: #aaabac; /* Light Grey */
}

h3 {
  margin-bottom: 20px;
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
}

.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>
