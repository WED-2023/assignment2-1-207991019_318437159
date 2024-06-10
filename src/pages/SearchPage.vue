<template>
  <div class="search-page">
    <div class="search-header">
      <h1>Find your Perfect Recipe here!</h1>
      <p>A delightful combination of ingredients and flavors to inspire your culinary adventures. Find the best recipes now.</p>
      <div class="input-group search-bar">
        <input type="text" class="form-control" placeholder="Type any recipe name here" v-model="searchQuery">
        <button class="btn btn-search" type="button" @click="performSearch">
          <i class="fas fa-search"></i> 
        </button>
        <div class="dropdown">
          <button class="btn btn-search dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            {{ recipesToShow }} 
          </button>
          <div class="dropdown-menu">
            <button class="dropdown-item text-dark" @click.stop="setRecipesToShow(5)">5</button>
            <button class="dropdown-item text-dark" @click.stop="setRecipesToShow(10)">10</button>
            <button class="dropdown-item text-dark" @click.stop="setRecipesToShow(15)">15</button>
          </div>
        </div>
      </div>
    </div>
    <div class="search-results" v-if="searchPerformed">
      <RecipePreviewList
        title="Search Results"
        :recipes="filteredRecipes.slice(0, recipesToShow)"
      />
    </div>
  </div>
</template>

<script>
import RecipePreviewList from '../components/RecipePreviewList.vue';
import { mockGetRecipesPreview } from '../services/recipes.js';

export default {
  components: {
    RecipePreviewList
  },
  data() {
    return {
      searchQuery: '',
      recipesToShow: 5,
      allRecipes: [], // All available recipes
      filteredRecipes: [], // Filtered recipes based on search query
      searchPerformed: false // Track if a search has been performed
    };
  },
  mounted() {
    this.updateRecipes();
  },
  methods: {
    async updateRecipes() {
      try {
        const response = mockGetRecipesPreview(100); // Fetch 100 recipes
        console.log(response);
        this.allRecipes = response.data.recipes;
        this.filteredRecipes = this.allRecipes;
      } catch (error) {
        console.log(error);
      }
    },
    performSearch() {
      if (this.searchQuery) {
        this.filteredRecipes = this.allRecipes.filter(recipe =>
          recipe.title.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      } else {
        this.filteredRecipes = this.allRecipes;
      }
      this.searchPerformed = true; // Set searchPerformed to true when search is performed
    },
    setRecipesToShow(num) {
      this.recipesToShow = num;
    }
  }
};
</script>

<style scoped>
.search-page {
  position: relative;
  background-image: url('../assets/searchBackground.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: #fff;
}

.search-page::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3); /* Adjust the alpha value for darkness */
  z-index: 1;
}

.search-header {
  z-index: 2;
  background-color: rgba(0, 0, 0, 0.7); /* Darker overlay on the header for contrast */
  padding: 20px;
  border-radius: 20px;
}

h1 {
  font-size: 2.5rem;
}

p {
  font-size: 1rem;
}

.input-group.search-bar {
  background: #fff;
  border-radius: 50px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  overflow: visible; /* Ensure the dropdown is not clipped */
  padding: 5px;
  max-width: 500px;
  display: flex;
  align-items: center;
  margin: 0 auto; /* Center the search bar */
  position: relative; /* Add relative positioning */
}

.input-group.search-bar .form-control {
  border: none;
  box-shadow: none;
  flex: 1;
  height: 38px;
}

.input-group.search-bar .btn-search {
  background-color: #232323;
  color: #fff;
  border-radius: 50px;
  border: none;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.input-group.search-bar .btn-search i {
  font-size: 16px; /* Adjust the size of the icon */
  color: #fff; /* Ensure the icon color contrasts with the button background */
}

.dropdown {
  margin-left: 10px; /* Adjust the margin to align with the search bar */
  position: relative;
}

.dropdown .btn-search.dropdown-toggle {
  background-color: #232323;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 50px;
}

.dropdown .dropdown-menu {
  background-color: #fff;
  color: #000;
  border-radius: 10px;
  padding: 5px;
  position: absolute;
  z-index: 10; /* Ensure the dropdown appears above other elements */
  top: 100%; /* Position the dropdown below the toggle button */
  left: 0;
}

.dropdown .dropdown-item {
  color: #000;
}

.dropdown .dropdown-item:hover {
  background-color: #f7ebeb;
  color: #d81010;
}

.search-results {
  margin-top: 20px;
  background-color: rgba(255, 255, 255, 0.9); /* Slightly transparent background */
  padding: 20px;
  border-radius: 10px;
  width: 80%;
  max-width: 1200px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
