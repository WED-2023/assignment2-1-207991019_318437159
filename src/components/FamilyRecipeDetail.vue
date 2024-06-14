<template>
    <div class="recipe-detail">
      <div class="recipe-image">
        <img :src="image" alt="Recipe Image" />
        <div class="recipe-text-overlay">
          <h3 class="recipe-title">{{ title }}</h3>
          <div class="recipe-maker">Made by: {{ maker }}</div>
          <div class="recipe-occasion">Occasion: {{ occasion }}</div>
        </div>
      </div>
      <div class="recipe-info">
        <div class="recipe-content">
          <div class="recipe-columns">
            <div class="recipe-ingredients">
              <h4>Ingredients:</h4>
              <ul>
                <li v-for="(ingredient, index) in ingredients" :key="index">{{ ingredient }}</li>
              </ul>
            </div>
            <div class="separator"></div>
            <div class="recipe-directions">
              <h4>Directions:</h4>
              <ol>
                <li v-for="(step, index) in directions" :key="index">{{ step }}</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "RecipeDetail",
    props: {
      image: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      ingredients: {
        type: Array,
        required: true,
      },
      directions: {
        type: Array,
        required: true,
      },
      maker: {
        type: String,
        required: true,
      },
      occasion: {
        type: String,
        required: true,
      },
    }
  };
  </script>
  
  <style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Segoe+Print&display=swap');
  
  .recipe-detail {
    background-color: rgba(255, 255, 255, 0.9);
    padding: 20px;
    margin-bottom: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    color: #333;
    max-width: 1000px;
    margin: 0 auto;
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
    background-color: rgba(0, 0, 0, 0.7); /* Dark transparent background */
    color: white;
    padding: 20px; /* Increase padding */
    text-align: center;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }
  
  .recipe-title {
    font-size: 28px; /* Increase font size */
    font-weight: bold;
    margin-bottom: 10px;
    font-family: 'Segoe Print', cursive;
  }
  
  .recipe-maker, .recipe-occasion {
    font-style: italic;
    color: #ccc;
    margin-bottom: 10px;
    font-family: 'Segoe Print', cursive;
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
  
  .recipe-ingredients, .recipe-directions {
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
  
  .recipe-directions {
    padding-left: 20px;
  }
  
  .recipe-ingredients h4, .recipe-directions h4 {
    font-size: 24px;
    margin-bottom: 10px;
    color: #b5651d;
  }
  
  .recipe-ingredients ul, .recipe-directions ol {
    margin: 0;
    padding-left: 20px;
  }
  
  .recipe-ingredients li, .recipe-directions li {
    margin-bottom: 10px;
    font-family: 'Segoe Print', cursive;
    font-weight: bolder;
    font-size: 18px;
  }
  </style>
  