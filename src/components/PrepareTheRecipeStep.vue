<template>
    <div class="step-container">
      <h3>Step {{ stepNumber }}</h3>
      <p>{{ description }}</p>
      <div class="step-details">
        <div v-if="ingredients.length > 0" class="ingredients">
          <strong>Ingredients:</strong>
          <ul>
            <li v-for="item in ingredients" :key="item.id">{{ item.name }}</li>
          </ul>
        </div>
        <div v-if="equipment.length > 0" class="equipment">
          <strong>Equipment:</strong>
          <ul>
            <li v-for="item in equipment" :key="item.id">{{ item.name }}</li>
          </ul>
        </div>
      </div>
      <div class="button-container">
        <button @click="$emit('previousStep')" class="prev-step-button">Go Back a Step</button>
        <button @click="$emit('stepFinished')" class="next-step-button">Move To The Next Step</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "PrepareTheRecipeStep",
    props: {
      stepNumber: Number,
      title: String,
      description: String,
      equipment: {
        type: Array,
        default: () => [],
      },
      ingredients: {
        type: Array,
        default: () => [],
      },
    },
  };
  </script>
  
  <style scoped>
  .step-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
  
  .step-details {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-top: 10px;
  }
  
  .ingredients,
  .equipment {
    width: 45%;
  }
  
  .button-container {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-top: 20px;
  }
  
  .prev-step-button,
  .next-step-button {
    background-color: #1e90ff;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
  }
  
  .prev-step-button:hover,
  .next-step-button:hover {
    background-color: #1c7ed6;
  }
  
  .prev-step-button {
    background-color: #d3d3d3;
  }
  
  .prev-step-button:hover {
    background-color: #b0b0b0;
  }
  </style>
  