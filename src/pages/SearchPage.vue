<template>
  <div class="search-page">
    <div class="search-header" :class="{ 'search-header-top': searchPerformed }">
      <h1>Find your Perfect Recipe here!</h1>
      <p>A delightful combination of ingredients and flavors to inspire your culinary adventures. Find the best recipes now.</p>
      <div class="input-group search-bar">
        <input 
          type="text" 
          class="form-control" 
          placeholder="Type any recipe name here" 
          v-model="searchQuery" 
          @keyup.enter="performSearch"
        >
        <div class="separator"></div> <!-- Separator line -->
        <button class="btn btn-search no-border" type="button" @click="performSearch">
          <i class="fas fa-search"></i> 
        </button>
        <div class="dropdown">
          <button ref="recipesDropdown" class="btn btn-search dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
             {{ recipesToShow }} 
          </button>
          <div class="dropdown-menu">
            <button class="dropdown-item text-dark" @click.stop="setRecipesToShow(5)">5</button>
            <button class="dropdown-item text-dark" @click.stop="setRecipesToShow(10)">10</button>
            <button class="dropdown-item text-dark" @click.stop="setRecipesToShow(15)">15</button>
          </div>
        </div>
        <div class="dropdown filter-dropdown">
          <button ref="filterDropdown" class="btn btn-search dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
             {{ filter }}
          </button>
          <div class="dropdown-menu">
            <button class="dropdown-item text-dark" @click.stop="setFilter('All')">All</button>
            <button class="dropdown-item text-dark" @click.stop="setFilter('Vegetarian')">Vegetarian</button>
            <button class="dropdown-item text-dark" @click.stop="setFilter('Vegan')">Vegan</button>
            <button class="dropdown-item text-dark" @click.stop="setFilter('Gluten-Free')">Gluten-Free</button>
            <button class="dropdown-item text-dark" @click.stop="setFilter('Desserts')">Desserts</button>
            <!-- Add more filters as needed -->
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
      filteredRecipes: [], // Filtered recipes based on search query and filter
      searchPerformed: false, // Track if a search has been performed
      filter: 'All' // Current filter selection
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
      let filtered = this.allRecipes;
      
      if (this.searchQuery) {
        filtered = filtered.filter(recipe =>
          recipe.title.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }

      if (this.filter !== 'All') {
        filtered = filtered.filter(recipe => recipe.category === this.filter);
      }

      this.filteredRecipes = filtered;
      this.searchPerformed = true; // Set searchPerformed to true when search is performed
    },
    setRecipesToShow(num) {
      this.recipesToShow = num;
      this.$refs.recipesDropdown.click(); // Close the dropdown menu
    },
    setFilter(filter) {
      this.filter = filter;
      this.$refs.filterDropdown.click(); // Close the dropdown menu
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
  justify-content: flex-start;
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
  z-index: 0;
}

.search-header {
  z-index: 2;
  background-color: rgba(0, 0, 0, 0.7); /* Darker overlay on the header for contrast */
  padding: 20px;
  border-radius: 20px;
  margin-bottom: 20px; /* Space below the search header */
  margin-top: 10%;
  transition: margin-top 0.5s ease; /* Smooth transition for margin change */
}

.search-header-top {
  margin-top: 10vh; /* Adjust this value to control the distance from the top */
}

.input-group.search-bar {
  background: #fff;
  border-radius: 50px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  overflow: visible; /* Ensure the dropdown is not clipped */
  padding: 5px;
  max-width: 800px; /* Make the search bar wider */
  width: 100%;
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

.separator {
  width: 2px;
  height: 40px; /* Adjust the height to match the height of the input and button */
  background-color: #ccc; /* Light gray color for the separator */
  margin-right: 2%;
}

.input-group.search-bar .btn-search.no-border {
  border: none; /* Remove the border */
  box-shadow: none;
  cursor: pointer; /* Indicate it's clickable */
  padding: 0 10px;
  margin-right: 2%;
  margin-left: 1%;
}

.input-group.search-bar .btn-search.no-border i {
  color: #232323; /* Icon color */
  font-size: 23px; /* Icon size */
}

.dropdown {
  margin-left: 10px; /* Adjust the margin to align with the search bar */
  position: relative;
}

.filter-dropdown {
  margin-left: 20px; /* Add gap between dropdowns */
}

.dropdown .btn-search.dropdown-toggle {
  background-color: #232323;
  color: #fff;
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
  z-index: 0;
  margin-top: 20px;
  background-color: rgba(200, 198, 198, 0.3); /* Adjust the alpha value for darkness */
  padding: 20px;
  border-radius: 10px;
  width: 90%;
  max-width: 1400px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}
</style>