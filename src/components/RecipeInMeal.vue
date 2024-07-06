<template>
    <transition name="fade" @after-leave="deleteRecipe">
      <div class="recipe-preview" v-show="visible">
        <div class="recipe-number-circle">{{ number }}</div>
        <div class="delete-button" @click.stop="triggerDelete">✖</div>
        <div class="recipe-body" @click="navigateToPrepare">
          <img v-if="imageLoad" :src="recipe.image" class="recipe-image" />
          <div class="hover-overlay">
            <span class="hover-text">Prepare it now</span>
          </div>
          <div class="recipe-title-box">
            <div :title="recipe.title" class="recipe-title">{{ recipe.title }}</div>
          </div>
        </div>
        <div class="recipe-footer">
          <div class="recipe-details">
            <div class="recipe-rating">
              <i class="fas fa-thumbs-up"></i> {{ recipe.aggregateLikes }} Likes
            </div>
            <div class="recipe-time">
              <i class="fas fa-clock"></i> {{ recipe.readyInMinutes }} minutes
            </div>
          </div>
          <div class="recipe-summary">{{ recipe.summary }}</div>
          <div class="progress-bar">
            <div class="progress" :style="{ width: progress + '%' }"></div>
          </div>
        </div>
      </div>
    </transition>
  </template>
  
  <script>
  export default {
    mounted() {
      this.loadImage();
    },
    data() {
      return {
        imageLoad: false,
        visible: true
      };
    },
    props: {
      recipe: {
        type: Object,
        required: true,
      },
      number: {
        type: Number,
        required: true,
      },
      progress: {
        type: Number,
        required: true,
        default: 0
      }
    },
    methods: {
      loadImage() {
        const img = new Image();
        img.onload = () => {
          this.imageLoad = true;
        };
        img.src = this.recipe.image;
      },
      navigateToPrepare() {
        this.$router.push({ name: 'prepare', params: { recipeId: this.recipe.id } });
      },
      triggerDelete() {
        this.visible = false;
      },
      deleteRecipe() {
        this.$emit('delete-recipe', this.recipe.id);
      }
    }
  };
  </script>
  
  <style scoped>
  .recipe-preview {
    display: inline-block;
    width: 100%;
    max-width: 400px;
    margin: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    transition: box-shadow 0.3s ease;
    background-color: #e4e4e4;
    font-weight: 600;
    cursor: pointer;
    position: relative;
  }
  
  .recipe-preview:hover {
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  }
  
  .recipe-body {
    position: relative;
    overflow: hidden;
  }
  
  .recipe-image {
    display: block;
    width: 100%;
    height: auto;
    max-height: 300px;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
  
  .recipe-body:hover .recipe-image {
    transform: scale(1.1);
  }
  
  .recipe-title-box {
    position: absolute;
    bottom: 0;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    color: #fff;
    text-align: center;
    padding: 10px;
  }
  
  .recipe-title {
    font-size: 18px;
    font-weight: bold;
  }
  
  .recipe-footer {
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .recipe-details {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 10px;
  }
  
  .recipe-rating,
  .recipe-time {
    font-size: 16px;
  }
  
  .recipe-summary {
    font-size: 16px;
    color: #888;
    margin-top: 10px;
    margin-bottom: 10px;
  }
  
  .recipe-number-circle {
    position: absolute;
    top: 10px;
    left: 10px;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1em;
    font-weight: bold;
    z-index: 20; /* Ensure it's above other elements */
  }
  
  .hover-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 10; /* Ensure it does not cover the number circle */
  }
  
  .recipe-body:hover .hover-overlay {
    opacity: 1;
  }
  
  .hover-text {
    color: white;
    font-size: 1.5em;
    font-weight: bold;
  }
  
  .progress-bar {
    width: 100%;
    background: #ddd;
    border-radius: 10px;
    overflow: hidden;
    margin-top: 10px;
  }
  
  .progress {
    height: 10px;
    background: #4caf50;
    border-radius: 10px;
  }
  
  .delete-button {
    position: absolute;
    top: 10px;
    right: 10px;
    background: rgba(0, 0, 0, 0.6);
    color: white;
    border: none;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    font-size: 18px;
    transition: background 0.1s ease, transform 0.1s ease;
    z-index: 30;
  }
  
  .delete-button:hover {
    background: rgba(255, 165, 165, 0.9);
    transform: scale(1.1);
  }
  
  /* Transition Styles */
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.3s ease;
    transform: scale(1.05);
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
    opacity: 0;
  }
  </style>
  