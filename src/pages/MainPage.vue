<template>
  <b-container fluid class="main-container">
    <div class="background-container">
      <!-- Logo Section -->
      <b-row class="justify-content-center">
        <b-col cols="12" lg="6" class="text-center logo-container">
          <div class="logo-background">
            <img
              src="../assets/photos/logo-Photoroom.png"
              alt="Logo"
              class="logo-image"
            />
          </div>
        </b-col>
      </b-row>

      <!-- Main Content -->
      <b-row>
        <!-- Left Column: Random Recipes -->
        <b-col cols="12" lg="6" class="left-column">
          <div class="list-box">
            <RecipePreviewList
              ref="randomRecipeList"
              title="Explore These Recipes"
              :amount="Number(4)"
            />
          </div>
        </b-col>

        <!-- Right Column: Last Viewed Recipes or Login Box -->
        <b-col cols="12" lg="6" class="right-column">
          <div v-if="isLoggedIn" class="list-box">
            <RecipePreviewList
              title="Last Watched Recipes"
              :amount="Number(4)"
              type="last-viewed"
            />
          </div>
          <div v-else class="login-container">
            <LoginBox />
          </div>
        </b-col>
      </b-row>
    </div>
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
    /**
     * Checks if the user is logged in
     * @returns {boolean} True if the user is logged in, false otherwise
     */
    isLoggedIn() {
      return !!this.$root.store.username;
    },
  },
};
</script>

<style scoped>
.main-container {
  padding-top: 4rem;
  background: url("../assets/photos/wood_background.jpg") no-repeat center;
  background-size: cover;
}

.logo-container {
  margin-bottom: 20px;
}

.logo-background {
  background: rgba(0, 0, 0, 0.7);
  margin-top: 2%;
  padding: 10px;
  border-radius: 10px;
  display: inline-block;
}

.logo-image {
  max-width: 100%;
  height: auto;
}

.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30%;
}

.list-box {
  border: 2px solid rgba(255, 255, 255, 0.7);
  padding: 20px;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.6);
  margin: 10px;
}
</style>
