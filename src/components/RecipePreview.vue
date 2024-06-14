<template>
  <div class="recipe-preview">
    <router-link
      :to="{ name: 'recipe' }"
      class="recipe-link"
      @click.native="markAsViewed"
    >
      <div class="recipe-body">
        <img v-if="imageLoad" :src="recipe.image" class="recipe-image" />
        <div class="favorite-icon" @click="toggleSaved">
          <font-awesome-icon
            :icon="[saved ? 'fas' : 'far', 'heart']"
            class="icon-heart"
          />
        </div>
      </div>
    </router-link>
    <div class="recipe-footer">
      <div :title="recipe.title" class="recipe-title">{{ recipe.title }}</div>
      <div class="recipe-summary">{{ recipe.summary }}</div>
      <div class="recipe-rating">
        <font-awesome-icon :icon="['fas', 'star']" />
        {{ recipe.aggregateLikes }} Likes
      </div>
      <div class="recipe-overview">
        <div>{{ recipe.readyInMinutes }} minutes</div>
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
  transition: transform 0.3s ease;
}

.recipe-body:hover .recipe-image {
  transform: scale(1.1);
}

.favorite-icon {
  color: #e74c3c;
  background-color: #fff;
  border-radius: 50%;
  padding: 10px;
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s, color 0.3s;
}

.favorite-icon:hover {
  background-color: #f2f2f2;
}

.icon-heart {
  font-size: 24px;
}

.recipe-footer {
  padding: 20px;
}

.recipe-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 15px;
}

.recipe-rating {
  font-size: 16px;
  color: #ff9900;
  margin-bottom: 15px;
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
  border-radius: 30px;
  color: white;
  text-align: center;
  font-weight: 600;
}

.gluten-free {
  background-color: #d2b48c; /* Brown color */
}

.vegan {
  background-color: #4caf50; /* Green color */
}

.vegetarian {
  background-color: #4caf50; /* Green color */
}

.recipe-summary {
  font-size: 16px;
  color: #888;
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
