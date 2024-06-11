<template>
  <b-container fluid>
    <b-row>
      <!-- Left Column: Random Recipes -->
      <b-col cols="12" lg="6" class="left-column">
        <RecipePreviewList
          title="Explore these recipes"
          :amount="3"
          :key="randomKey"
        />
        <div class="list-header">
          <b-icon
            icon="arrow-clockwise"
            variant="dark"
            @click="refreshRandomRecipes"
            class="refresh-icon"
          ></b-icon>
        </div>
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
  data() {
    return {
      randomKey: 0,
    };
  },
  computed: {
    isLoggedIn() {
      return !!this.$root.store.username;
    },
  },
  watch: {
    "$root.store.username": function(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.$forceUpdate();
      }
    },
  },
  methods: {
    refreshRandomRecipes() {
      this.randomKey++;
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
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}

.list-title {
  font-size: 24px;
  font-weight: bold;
  color: #333;
}

.refresh-icon {
  cursor: pointer;
  font-size: 40px;
}

.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>
