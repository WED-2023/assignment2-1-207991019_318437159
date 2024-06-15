<template>
  <div class="search-page">
    <div class="search-header" :class="{ 'search-header-top': searchPerformed }">
      <h1>Find your Perfect Recipe here!</h1>
      <p>
        A delightful combination of ingredients and flavors to inspire your
        culinary adventures. Find the best recipes now.
      </p>
      <div class="input-group search-bar">
        <input 
          type="text" 
          class="form-control" 
          placeholder="Type any recipe name here" 
          v-model="searchQuery"
          @keyup.enter="performSearch" 
        />
        <div class="separator"></div>
        <button class="btn btn-search no-border" type="button" @click="performSearch">
          <i class="fas fa-search"></i>
        </button>
        <div class="dropdown">
          <button 
            ref="recipesDropdown" 
            class="btn btn-search dropdown-toggle" 
            type="button" 
            @click="toggleDropdown"
            aria-haspopup="true" 
            aria-expanded="false"
          >
            {{ recipesToShow }}
          </button>
          <ul class="dropdown-menu" :class="{ show: dropdownOpen }">
            <li><button class="dropdown-item text-dark" @click.stop="setRecipesToShow(5)">5</button></li>
            <li><button class="dropdown-item text-dark" @click.stop="setRecipesToShow(10)">10</button></li>
            <li><button class="dropdown-item text-dark" @click.stop="setRecipesToShow(15)">15</button></li>
          </ul>
        </div>
        <button @click="toggleFilterMenu" class="btn btn-search filter-button">
          Filter (Advanced Search)
        </button>
      </div>
      <FilterCheckBox 
        :filterMenuOpen="filterMenuOpen" 
        @update:cuisines="updateCuisines" 
        @update:intolerance="updateIntolerance" 
      />
    </div>
    
    <div class="search-results" v-if="searchPerformed">
      <RecipePreviewList 
        ref="recipePreviewList"
        title="Search Results" 
        :amount="recipesToShow"
        :searchQuery="searchQuery"
        :selectedCuisines="selectedCuisines"
        :selectedIntolerance="selectedIntolerance"
      />
    </div>
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList.vue";
import FilterCheckBox from "../components/FilterCheckBox.vue"; 
import { mockGetRecipesPreview } from "../services/recipes.js";

export default {
  components: {
    RecipePreviewList,
    FilterCheckBox 
  },
  data() {
    return {
      searchQuery: "",
      recipesToShow: 5,
      searchPerformed: false, // Track if a search has been performed
      filterMenuOpen: false, // Control the visibility of the filter menu
      dropdownOpen: false, // Control the visibility of the dropdown menu
      selectedCuisines: [], // Selected cuisines for filtering
      selectedIntolerance: [], // Selected intolerance for filtering
    };
  },
  methods: {
    performSearch() {
      this.searchPerformed = true;
      this.$refs.recipePreviewList.updateRecipes(this.recipesToShow);
    },
    setRecipesToShow(num) {
      this.recipesToShow = num;
      this.dropdownOpen = false; // Close the dropdown menu
    },
    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen;
    },
    toggleFilterMenu() {
      this.filterMenuOpen = !this.filterMenuOpen;
    },
    updateCuisines(newCuisines) {
      this.selectedCuisines = newCuisines;
    },
    updateIntolerance(newIntolerance) {
      this.selectedIntolerance = newIntolerance;
    }
  }
};
</script>

<style scoped>
.search-page {
  position: relative;
  background-image: url("../assets/photos/searchBackground.jpg");
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
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 0;
}

.search-header {
  z-index: 2;
  background-color: rgba(0, 0, 0, 0.7);
  padding: 20px;
  border-radius: 20px;
  margin-bottom: 20px;
  margin-top: 10%;
  transition: margin-top 0.5s ease;
}

.search-header-top {
  margin-top: 10vh;
}

.input-group.search-bar {
  background: #fff;
  border-radius: 50px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  overflow: visible;
  padding: 5px;
  max-width: 800px;
  width: 100%;
  display: flex;
  align-items: center;
  margin: 0 auto;
  position: relative;
}

.input-group.search-bar .form-control {
  border: none;
  box-shadow: none;
  flex: 1;
  height: 38px;
}

.separator {
  width: 2px;
  height: 40px;
  background-color: #ccc;
  margin-right: 2%;
}

.input-group.search-bar .btn-search.no-border {
  border: none;
  box-shadow: none;
  cursor: pointer;
  padding: 0 10px;
  margin-right: 2%;
  margin-left: 1%;
}

.input-group.search-bar .btn-search.no-border i {
  color: #232323;
  font-size: 23px;
}

.dropdown {
  margin-left: 10px;
  position: relative;
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
  overflow: visible;
  position: absolute;
  z-index: 30;
  top: 100%;
  left: 0;
  display: none;
}

.dropdown .dropdown-menu.show {
  display: block;
}

.dropdown .dropdown-item {
  color: #000;
}

.dropdown .dropdown-item:hover {
  background-color: #f7ebeb;
  color: #d81010;
}

.filter-button {
  background-color:   #232323;
  color: #fff;
  padding: 10px 20px;
  border-radius: 50px;
  margin-left: 10px;
}

.filter-button:hover {
  background-color: #867c7a;
  color: #fff;
}

.search-results {
  z-index: 0;
  margin-top: 20px;
  background-color: rgba(200, 198, 198, 0.3);
  padding: 20px;
  border-radius: 10px;
  width: 90%;
  max-width: 1400px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
