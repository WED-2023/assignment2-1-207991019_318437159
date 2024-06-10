<template>
  <div class="recipe-preview">
    <router-link
      :to="{ name: 'recipe', params: { recipeId: recipe.id } }"
      class="recipe-link"
      @click.native="markAsViewed"
    >
      <div class="recipe-body">
        <img v-if="imageLoad" :src="recipe.image" class="recipe-image" />
      </div>
    </router-link>
    <div class="favorite-icon" @click="toggleSaved">
      <i :class="['fas', saved ? 'fa-heart' : 'fa-heart-broken']"></i>
    </div>
    <div class="recipe-footer">
      <div :title="recipe.title" class="recipe-title">{{ recipe.title }}</div>
      <div class="recipe-rating">
        <i class="fas fa-star"></i> {{ recipe.aggregateLikes }} Likes
      </div>
      <div class="recipe-overview">
        <div>{{ recipe.readyInMinutes }} minutes</div>
        <div v-if="recipe.glutenFree">
          <img src="@/assets/gluten-free-icon.png" alt="Gluten-Free" />
        </div>
        <div v-if="recipe.vegan">
          <img src="@/assets/vegan-icon.png" alt="Vegan" />
        </div>
        <div v-if="recipe.vegetarian && !recipe.vegan">
          <img src="@/assets/vegetarian-icon.png" alt="Vegetarian" />
        </div>
        <div v-if="viewed">Viewed</div>
        <div v-if="saved">Saved</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.loadImage();
    this.checkViewedStatus();
    this.checkSavedStatus();
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
  methods: {
    loadImage() {
      const img = new Image();
      img.onload = () => {
        this.imageLoad = true;
      };
      img.src = this.recipe.image;
    },
    markAsViewed() {
      localStorage.setItem(`viewed_${this.recipe.id}`, true);
      this.viewed = true;
    },
    checkViewedStatus() {
      this.viewed = !!localStorage.getItem(`viewed_${this.recipe.id}`);
    },
    toggleSaved(event) {
      event.stopPropagation(); // Prevent triggering the link click
      this.saved = !this.saved;
      if (this.saved) {
        localStorage.setItem(`saved_${this.recipe.id}`, true);
      } else {
        localStorage.removeItem(`saved_${this.recipe.id}`);
      }
    },
    checkSavedStatus() {
      this.saved = !!localStorage.getItem(`saved_${this.recipe.id}`);
    },
  },
};
</script>

<style scoped>
.recipe-preview {
  display: inline-block;
  width: 100%;
  margin: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
}

.recipe-preview:hover {
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
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
  transition: transform 0.3s ease;
}

.recipe-body:hover .recipe-image {
  transform: scale(1.1);
}

.favorite-icon {
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  padding: 5px;
  color: #ff0000;
  cursor: pointer;
}

.recipe-footer {
  padding: 10px;
}

.recipe-title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
}

.recipe-rating {
  font-size: 14px;
  color: #ff9900;
  margin-bottom: 10px;
}

.recipe-overview {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #666;
}

.recipe-overview > div {
  display: flex;
  align-items: center;
}

.recipe-overview img {
  width: 24px;
  height: 24px;
  margin-left: 5px;
}

.recipe-summary {
  margin-top: 10px;
  font-size: 14px;
  color: #666;
}
</style>
