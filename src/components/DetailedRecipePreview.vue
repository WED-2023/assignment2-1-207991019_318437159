<template>
  <div class="recipe-detail">
    <div class="recipe-image">
      <img :src="image" alt="Recipe Image" />
      <div class="recipe-text-overlay">
        <h3 class="recipe-title">{{ title }}</h3>
        <div class="recipe-cuisine">Cuisine: {{ cuisine }}</div>
      </div>
    </div>
    <div class="recipe-info">
      <div class="recipe-meta">
        <div class="meta-item">
          <i class="fas fa-clock"></i>
          <span class="meta-text">{{ readyInMinutes }} minutes</span>
        </div>
        <div class="meta-item">
          <i class="fas fa-utensils"></i>
          <span class="meta-text">{{ servings }} servings</span>
        </div>
        <div class="meta-item">
          <i class="fas fa-thumbs-up"></i>
          <span class="meta-text">{{ aggregateLikes }} likes</span>
        </div>
      </div>
      <p class="recipe-summary" v-html="summary"></p>
      <div class="recipe-content">
        <div class="recipe-columns">
          <div class="recipe-ingredients">
            <h4>Ingredients:</h4>
            <ul>
              <li v-for="(ingredient, index) in ingredients" :key="index">
                {{ ingredient.original }}
              </li>
            </ul>
          </div>
          <div class="separator"></div>
          <div class="recipe-instructions">
            <h4>Instructions:</h4>
            <ol>
              <li v-for="(step, index) in instructions" :key="index">
                {{ step }}
              </li>
              <!-- Display each step directly -->
            </ol>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailedRecipePreview",
  props: {
    image: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    cuisine: {
      type: String,
      required: true,
    },
    summary: {
      type: String,
      required: true,
    },
    ingredients: {
      type: Array,
      required: true,
    },
    instructions: {
      type: Array,
      required: true, // Expecting an array of instructions now
    },
    readyInMinutes: {
      type: Number,
      required: true,
    },
    servings: {
      type: Number,
      required: true,
    },
    aggregateLikes: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Comfortaa:wght@400;700&display=swap");
@import "~@fortawesome/fontawesome-free/css/all.css";

.recipe-detail {
  background-color: rgba(255, 255, 255, 0.9);
  padding: 20px;
  margin: 3%;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  color: #333;
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
  font-family: "Comfortaa", cursive;
}

.recipe-image {
  position: relative;
}

.recipe-image img {
  width: 100%;
  border-radius: 10px;
}

.recipe-text-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 20px;
  text-align: center;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}

.recipe-title {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 10px;
  font-family: "Comfortaa", cursive;
}

.recipe-cuisine {
  font-size: 20px;
  margin-bottom: 10px;
  font-family: "Comfortaa", cursive;
}

.recipe-meta {
  display: flex;
  justify-content: center; /* Center the items horizontally */
  gap: 20px; /* Add space between the items */
  margin: 20px 0;
  font-size: 18px;
  color: #555;
}

.meta-item {
  display: flex;
  align-items: center;
  font-weight: bold; /* Make the text bold */
}

.meta-item i {
  margin-right: 10px;
}

.recipe-summary {
  font-size: 18px;
  margin: 20px 0;
  font-family: "Comfortaa", cursive;
  line-height: 1.6;
  text-align: justify;
  color: #555;
}

.recipe-info {
  text-align: center;
}

.recipe-content {
  margin-top: 20px;
  border-top: 1px solid #ddd;
  padding-top: 20px;
}

.recipe-columns {
  display: flex;
  justify-content: space-between;
}

.recipe-ingredients,
.recipe-instructions {
  width: 47%;
  text-align: left;
}

.recipe-ingredients {
  padding-right: 20px;
}

.separator {
  width: 1px;
  background-color: #ddd;
  margin: 0 20px;
}

.recipe-instructions {
  padding-left: 20px;
}

.recipe-ingredients h4,
.recipe-instructions h4 {
  font-size: 24px;
  margin-bottom: 10px;
  color: #b5651d;
}

.recipe-ingredients ul,
.recipe-instructions ol {
  margin: 0;
  padding-left: 20px;
}

.recipe-ingredients li,
.recipe-instructions li {
  margin-bottom: 10px;
  font-family: "Comfortaa", cursive;
  font-weight: bolder;
  font-size: 18px;
}
</style>
