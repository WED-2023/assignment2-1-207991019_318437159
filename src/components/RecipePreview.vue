<template>
  <div class="recipe-preview">
    <router-link
      :to="{ name: 'recipe', params: { recipeId: this.recipe.id } }"
      class="recipe-link"
    >
      <div class="recipe-body">
        <img v-if="imageLoad" :src="recipe.image" class="recipe-image" />
        <div v-if="loggedIn" class="favorite-icon" @click="toggleFavorite">
          <font-awesome-icon
            :icon="[recipe.favorite ? 'fas' : 'far', 'heart']"
            class="icon-heart"
          />
        </div>
        <div v-if="loggedIn && recipe.viewed" class="viewed-icon">
          <font-awesome-icon :icon="['fas', 'eye']" class="icon-view" />
        </div>
        <div class="recipe-title-box">
          <div :title="recipe.title" class="recipe-title">
            {{ recipe.title }}
          </div>
        </div>
      </div>
    </router-link>
    <div class="recipe-footer">
      <div class="recipe-details">
        <div class="recipe-rating">
          <i class="fas fa-thumbs-up"></i>
          {{ recipe.aggregateLikes }} Likes
        </div>
        <div class="recipe-time">
          <i class="fas fa-clock"></i>
          {{ recipe.readyInMinutes }} minutes
        </div>
      </div>
      <div class="recipe-summary" v-html="recipe.summary"></div>
      <div class="recipe-overview">
        <div v-if="recipe.glutenFree" class="bubble gluten-free">
          Gluten-Free
        </div>
        <div v-if="recipe.vegan" class="bubble vegan">Vegan</div>
        <div
          v-if="recipe.vegetarian && !recipe.vegan"
          class="bubble vegetarian"
        >
          Vegetarian
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { markFavoirte } from "../services/user.js";
export default {
  mounted() {
    this.loadImage();
  },
  data() {
    return {
      imageLoad: false,
      viewed: false,
      saved: false,
    };
  },
  props: {
    recipe: {
      type: Object,
      required: true,
    },
  },
  computed: {
    loggedIn() {
      return !!this.$root.store.username;
    },
  },
  methods: {
    /**
     * Loads the image for the recipe.
     */
    loadImage() {
      const img = new Image();
      img.onload = () => {
        this.imageLoad = true;
      };
      img.src = this.recipe.image;
    },
    /**
     * Toggles the favorite status of the recipe.
     */
    toggleFavorite(event) {
      event.stopPropagation(); // Prevent triggering the link click
      event.preventDefault(); // Prevent default action

      if (!this.recipe.favorite) {
        this.recipe.favorite = !this.recipe.favorite;

        // Add a class for animation
        const favoriteIcon = event.currentTarget.querySelector(".icon-heart");
        favoriteIcon.classList.add("like-animation");

        // Remove the animation class after animation ends
        favoriteIcon.addEventListener("animationend", () => {
          favoriteIcon.classList.remove("like-animation");
        });
        markFavoirte(this.recipe.id);
      }
    },
  },
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
}

.recipe-preview:hover {
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
}

.recipe-link {
  text-decoration: none;
  color: inherit;
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

.favorite-icon {
  color: #e74c3c;
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 50%;
  padding: 10px;
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s, color 0.3s;
}

.icon-heart {
  font-size: 24px;
}

.icon-heart.like-animation {
  animation: like-bounce 0.5s ease-in-out;
}

@keyframes like-bounce {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.5);
  }
}

.viewed-icon {
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 50%;
  padding: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.icon-view {
  font-size: 24px;
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

.recipe-overview {
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  color: #666;
}

.recipe-overview > div {
  display: flex;
  align-items: center;
}

.bubble {
  padding: 5px 10px;
  margin-left: 3px;
  border-radius: 30px;
  color: white;
  text-align: center;
  font-weight: 600;
}

.gluten-free {
  background-color: #d2b48c;
}

.vegan {
  background-color: #4caf50;
}

.vegetarian {
  background-color: #4caf50;
}
</style>
