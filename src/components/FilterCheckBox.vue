<template>
  <div class="filter-menu" v-if="filterMenuOpen">

    <!-- Header for Filter Menu -->
    <h3>Categories:</h3>
    <div class="category">

      <!-- Header for Cuisine Category -->
      <h4>Cuisine:</h4>
      <div class="genres">

        <!-- Loop through Cuisine Options -->
        <div v-for="item in cuisine" :key="item" class="genre-item">
          <input class="form-switch-input" type="checkbox" :id="item" :value="item" v-model="selectedCuisines" />
          <label class="form-switch-label" :for="item">{{ item }}</label>
        </div>
      </div>
    </div>
    <div class="category">

      <!-- Header for Intolerance Category -->
      <h4>Intolerance:</h4>
      <div class="genres">

        <!-- Loop through Intolerance Options -->
        <div v-for="item in intolerance" :key="item" class="genre-item">
          <input class="form-switch-input" type="checkbox" :id="item" :value="item" v-model="selectedIntolerance" />
          <label class="form-switch-label" :for="item">{{ item }}</label>
        </div>
      </div>
    </div>
    <div class="category">

      <!-- Header for Diets Category -->
      <h4>Diets:</h4>
      <div class="genres">

        <!-- Loop through Diet Options -->
        <div v-for="item in diets" :key="item" class="genre-item">
          <input class="form-switch-input" type="checkbox" :id="item" :value="item" v-model="selectedDiets" />
          <label class="form-switch-label" :for="item">{{ item }}</label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mockGetCategoriesForSearch } from '@/services/recipes.js';

export default {
  props: {
    filterMenuOpen: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      cuisine: [],
      intolerance: [],
      diets: [],
      selectedCuisines: [],
      selectedIntolerance: [],
      selectedDiets: [],
    };
  },
  created() {
    
    try {
      const { data } = mockGetCategoriesForSearch();
      this.cuisine = data.cuisine;
      this.intolerance = data.intolerance;
      this.diets = data.diets;
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  },
  watch: {
    selectedCuisines(newCuisines) {
      this.$emit('update:cuisines', newCuisines);
    },
    selectedIntolerance(newIntolerance) {
      this.$emit('update:intolerance', newIntolerance);
    },
    selectedDiets(newDiets) {
      this.$emit('update:diets', newDiets);
    },
  },
};
</script>


<style>
.filter-menu {
  padding: 20px;
  width: 800px;
  margin: 0 auto;
  text-align: center;
}
.category {
  margin-bottom: 20px;
}
.genres {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 15px; 
}
.genre-item {
  width: 26%; 
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 10px;
}
.form-switch-input {
  position: relative;
  width: 40px; 
  height: 20px;
  appearance: none;
  background-color: #ccc;
  outline: none;
  cursor: pointer;
  border-radius: 20px;
  transition: background-color 0.2s;
  margin-right: 10px;
}
.form-switch-input:checked {
  background-color: #333;
}
.form-switch-input:checked::before {
  transform: translateX(20px); 
}
.form-switch-input::before {
  content: '';
  position: absolute;
  top: 2px;
  left: 2px;
  width: 16px;
  height: 16px;
  background-color: #fff;
  border-radius: 50%;
  transition: transform 0.2s;
}
.form-switch-label {
  cursor: pointer;
}
</style>
