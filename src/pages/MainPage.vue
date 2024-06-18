<template>
  <b-container fluid class="main-container">
    <div class="background-container">
      <b-row>
        <!-- Left Column: Random Recipes -->
        <b-col cols="12" lg="6" class="left-column">
          <div class="list-box">
            <RecipePreviewList
              ref="randomRecipeList"
              title="Explore These Recipes"
              amount="4"
            />
          </div>
        </b-col>
        <!-- Right Column: Last Viewed Recipes or Login Box -->
        <b-col cols="12" lg="6" class="right-column">
          <div v-if="isLoggedIn" class="list-box">
            <RecipePreviewList
              title="Last Watched Recipes"
              amount="5"
              type="last-watched"
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

.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 5px;
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
  margin-top: 30%;
}

.list-box {
  border: 2px solid rgba(255, 255, 255, 0.7); /* Light border */
  padding: 20px;
  border-radius: 10px; /* Optional: adds rounded corners */
  background-color: rgba(
    255,
    255,
    255,
    0.6
  ); /* Slightly opaque background for the box */
  margin: 10px;
}

.meta-item {
  display: flex;
  align-items: center;
  font-weight: bold; /* Make the text bold */
}

.meta-item i {
  margin-right: 10px;
}
</style>
