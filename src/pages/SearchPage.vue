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
      </div>
      <div class="dropdown">
        <button class="btn btn-search dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          {{ recipesToShow }} <i class="fas fa-caret-down"></i>
        </button>
        <div class="dropdown-menu">
          <button class="dropdown-item text-dark" @click.stop="setRecipesToShow(5)">5</button>
          <button class="dropdown-item text-dark" @click.stop="setRecipesToShow(10)">10</button>
          <button class="dropdown-item text-dark" @click.stop="setRecipesToShow(15)">15</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: '',
      recipesToShow: 5,
    }
  },
  methods: {
    performSearch() {
      console.log('Searching for:', this.searchQuery);
      console.log('Number of recipes to show:', this.recipesToShow);
    },
    setRecipesToShow(num) {
      this.recipesToShow = num;
    },
  },
  mounted() {
    // Initialize Bootstrap dropdowns
    const dropdownElms = Array.prototype.slice.call(document.querySelectorAll('.dropdown-toggle'))
    dropdownElms.map(function(dropdownElm) {
      new bootstrap.Dropdown(dropdownElm)
    })
  }
}
</script>

<style scoped>
.search-page {
  position: relative;
  background-image: url('../assets/searchBackground.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  height: 100vh;
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
  position: absolute;
  top: 20%; /* Adjust this value to move the header higher or lower */
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
  overflow: hidden;
  padding: 5px;
  max-width: 500px;
  display: flex;
  align-items: center;
  margin-left: 15%; /* Add margin bottom to separate from the dropdown */
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
}

.dropdown {
  position: absolute;
  margin-left: 10px; /* Add margin-left to separate from the search bar */
  margin-top: -50px;
  background-color: #f7ebeb;
  border-radius: 10px; /* Add border-radius for bubble-like appearance */
  padding: 5px; /* Add padding for better spacing */
  color: #d81010; /* Set text color to white */
}
</style>
