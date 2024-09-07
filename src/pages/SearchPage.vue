<template>
  <div class="search-page">
    <!-- Search Header -->
    <div
      class="search-header"
      :class="{ 'search-header-top': searchPerformed }"
    >
      <h1>Find your Perfect Recipe here!</h1>
      <p>
        A delightful combination of ingredients and flavors to inspire your
        culinary adventures. Find the best recipes now.
      </p>
      <div class="input-group search-bar">
        <!-- Search Input -->
        <input
          type="text"
          class="form-control"
          placeholder="Type any recipe name here"
          v-model="searchQuery"
          @keyup.enter="performSearch"
        />
        <div class="separator"></div>

        <!-- Search Button -->
        <button
          class="btn btn-search no-border"
          type="button"
          @click="performSearch"
        >
          <i class="fas fa-search"></i>
        </button>

        <!-- Dropdown for Number of Recipes to Show -->
        <div class="dropdown">
          <button
            ref="recipesDropdown"
            class="btn btn-search dropdown-toggle"
            type="button"
            @click="toggleDropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            {{ selectedRecipesToShow }}
          </button>
          <ul class="dropdown-menu" :class="{ show: dropdownOpen }">
            <li>
              <button
                class="dropdown-item text-dark"
                @click.stop="setSelectedRecipesToShow(5)"
              >
                5
              </button>
            </li>
            <li>
              <button
                class="dropdown-item text-dark"
                @click.stop="setSelectedRecipesToShow(10)"
              >
                10
              </button>
            </li>
            <li>
              <button
                class="dropdown-item text-dark"
                @click.stop="setSelectedRecipesToShow(15)"
              >
                15
              </button>
            </li>
          </ul>
        </div>

        <!-- Filter Button -->
        <button @click="toggleFilterMenu" class="btn btn-search filter-button">
          Filter (Advanced Search)
        </button>
      </div>

      <!-- Filter Options -->
      <FilterCheckBox
        :filterMenuOpen="filterMenuOpen"
        @update:cuisines="updateCuisines"
        @update:intolerance="updateIntolerance"
        @update:diets="updateDiets"
      />
    </div>

    <!-- Search Results -->
    <transition name="fade" mode="out-in">
      <div>
        <div v-if="searchPerformed">
          <div v-if="noResultsFound" class="no-results-message">
            <img
              src="../assets/photos/no-results.png"
              alt="No results found"
              class="no-results-image"
            />
            <h3>No Result Found!</h3>
            <p>We can't find any recipe matching your search.</p>
          </div>
          <div v-else class="search-results results-found">
            <div class="sort-container">
              <div class="dropdown top-left-dropdown">
                <button
                  class="top-left-button dropdown-toggle"
                  @click="toggleSortDropdown"
                >
                  <img
                    src="../assets/photos/funnel.png"
                    alt="icon"
                    class="icon"
                  />
                </button>
                <span class="sort-by-text">Sort by: {{ selectedSort }}</span>
                <ul class="dropdown-menu" :class="{ show: sortDropdownOpen }">
                  <li>
                    <button
                      class="dropdown-item text-dark"
                      @click.stop="setSort('Popularity')"
                    >
                      Popularity
                    </button>
                  </li>
                  <li>
                    <button
                      class="dropdown-item text-dark"
                      @click.stop="setSort('Time To Make')"
                    >
                      Time To Make
                    </button>
                  </li>
                </ul>
              </div>
            </div>

            <!-- List of Recipe Previews -->
            <RecipePreviewList
              ref="RecipePreviewList"
              :title="headerTitle"
              :amount="Number(this.recipesToShow)"
              :searchQuery="searchQuery"
              :selectedCuisines="selectedCuisines"
              :selectedIntolerance="selectedIntolerance"
              :selectedDiets="selectedDiets"
              :type="type"
              :sort="selectedSort"
              @no-results="handleNoResultsFound"
            />
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList.vue";
import FilterCheckBox from "../components/FilterCheckBox.vue";

export default {
  components: {
    RecipePreviewList,
    FilterCheckBox,
  },
  data() {
    return {
      searchQuery: "",
      type: "search",
      recipesToShow: 5, // Number of recipes to show in the search results
      selectedRecipesToShow: 5, // Number of recipes selected from the dropdown
      searchPerformed: false, // Flag to track if a search has been performed
      filterMenuOpen: false, // Flag to control the visibility of the filter menu
      dropdownOpen: false, // Flag to control the visibility of the dropdown menu
      selectedCuisines: [], // Array of selected cuisines for filtering
      selectedIntolerance: [], // Array of selected intolerances for filtering
      selectedDiets: [], // Array of selected diets for filtering
      noResultsFound: false, // Flag to track if no results were found
      searchKey: 0, // Key to trigger re-render of search results
      sortDropdownOpen: false, // Flag to control the visibility of the sort dropdown menu
      selectedSort: "Popularity", // Default sort criteria
      isLastSearch: false, // Flag to track if the results are from the last search
    };
  },
  created() {
    this.checkLoginStatus();
  },
  computed: {
    headerTitle() {
      return this.isLastSearch ? "Your Last Search" : "Search Results";
    },
  },
  methods: {
    checkLoginStatus() {
      const isLoggedIn = this.isUserLoggedIn();
      if (isLoggedIn) {
        this.loadLastSearch();
      }
    },
    isUserLoggedIn() {
      return !!this.$root.store.username;
    },
    loadLastSearch() {
      // load the last search and show it right away.
      const lastSearch = localStorage.getItem("lastSearch");
      if (lastSearch) {
        const {
          searchQuery,
          selectedCuisines,
          selectedIntolerance,
          selectedDiets,
          selectedSort,
          recipesToShow,
        } = JSON.parse(lastSearch);
        this.searchQuery = searchQuery;
        this.selectedCuisines = selectedCuisines;
        this.selectedIntolerance = selectedIntolerance;
        this.selectedDiets = selectedDiets;
        this.selectedSort = selectedSort;
        this.selectedRecipesToShow = recipesToShow;
        this.recipesToShow = recipesToShow;
        this.performSearch();
        this.isLastSearch = true;
      }
    },
    performSearch() {
      this.noResultsFound = false;
      this.searchPerformed = false;
      this.filterMenuOpen = false;
      this.dropdownOpen = false;
      this.sortDropdownOpen = false;
      this.isLastSearch = false;
      this.searchKey++;
      this.$nextTick(() => {
        setTimeout(() => {
          this.recipesToShow = this.selectedRecipesToShow;
          this.searchPerformed = true;
          if (!this.noResultsFound) {
            const lastSearch = {
              searchQuery: this.searchQuery,
              selectedCuisines: this.selectedCuisines,
              selectedIntolerance: this.selectedIntolerance,
              selectedDiets: this.selectedDiets,
              selectedSort: this.selectedSort,
              recipesToShow: this.selectedRecipesToShow,
            };
            localStorage.setItem("lastSearch", JSON.stringify(lastSearch));
          }
        }, 300);
      });
    },
    setSelectedRecipesToShow(num) {
      this.selectedRecipesToShow = num;
      this.dropdownOpen = false;
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
    },
    updateDiets(newDiets) {
      this.selectedDiets = newDiets;
    },
    handleNoResultsFound() {
      this.noResultsFound = true;
    },
    toggleSortDropdown() {
      this.sortDropdownOpen = !this.sortDropdownOpen;
    },
    setSort(sortCriteria) {
      this.selectedSort = sortCriteria;
      this.sortDropdownOpen = false;
      if (
        this.searchPerformed &&
        !this.noResultsFound &&
        this.$refs.recipePreviewList
      ) {
        this.$refs.recipePreviewList.sortedRecipes();
      }
    },
  },
};
</script>

<style scoped>
@import "~@fortawesome/fontawesome-free/css/all.css";

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
  font-family: "Comfortaa", cursive;
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
  color: #fff;
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
  color: rgb(0, 0, 0);
}

.dropdown .dropdown-item:hover {
  background-color: #867c7a;
  color: #d81010;
}

.filter-button {
  background-color: #232323;
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
  padding: 20px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 50vh;
  position: relative;
}

.search-results.results-found {
  border: 2px solid rgba(255, 255, 255, 0.7);
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  background-color: rgba(255, 255, 255, 0.6);
}

.sort-container {
  display: flex;
  align-items: center;
  position: absolute;
  top: 10px;
  left: 10px;
}

.top-left-dropdown {
  display: flex;
  align-items: center;
}

.top-left-button {
  background: none;
  border: none;
  cursor: pointer;
}

.top-left-button .icon {
  width: 30px;
  height: 30px;
}

.sort-by-text {
  margin-left: 10px;
  color: #000000;
  font-size: 16px;
  font-family: "Comfortaa", cursive;
}

.no-results-message {
  text-align: center;
  padding: 20px;
  background-color: rgba(20, 20, 20, 0.8);
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: calc(100% - 40px);
  max-width: 300px;
  height: auto;
  justify-content: center;
  margin: 20px;
  color: #ccc;
}

.no-results-image {
  width: 100px;
  height: 100px;
}

.no-results-message h3 {
  color: #f3f3f3e7;
  font-size: 20px;
  margin-bottom: 5px;
}

.no-results-message p {
  color: #f3f3f3e7;
  font-size: 14px;
  margin-bottom: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.7s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.sort-dropdown {
  margin-bottom: 20px;
  text-align: center;
  position: relative;
  z-index: 1;
}

.sort-dropdown .dropdown-menu {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
}

.top-left-dropdown .dropdown-menu .dropdown-item:hover {
  background-color: #867c7a;
  color: #ffffff;
}

.sort-dropdown .btn-search.dropdown-toggle {
  background-color: #232323;
  color: #fff;
  padding: 10px 20px;
  border-radius: 50px;
}
@media (max-width: 768px) {
  .sort-by-text {
    display: none;
  }
}
</style>
