<template>
  <div class="container">
    <div v-if="recipe">
      <div class="recipe-header mt-3 mb-4">
        <h1>{{ recipe.title }}</h1>
        <img :src="recipe.image" class="center" />
        <b-button
          @click.stop="toggleFavorite"
          class="favorite-btn"
          :class="{ liked: isLiked }"
        >
          <b-icon icon="heart-fill" />
        </b-button>
      </div>
      <div class="recipe-body">
        <div class="wrapper">
          <div class="wrapped">
            <div class="mb-3">
              <div>Ready in {{ recipe.readyInMinutes }} minutes</div>
              <div>Likes: {{ recipe.aggregateLikes }} likes</div>
            </div>
            Ingredients:
            <ul>
              <li
                v-for="(r, index) in recipe.extendedIngredients"
                :key="index + '_' + r.id"
              >
                {{ r.original }}
              </li>
            </ul>
          </div>
          <div class="wrapped">
            Instructions:
            <ol>
              <li v-for="s in recipe._instructions" :key="s.number">
                {{ s.step }}
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mockGetRecipeFullDetails } from "../services/recipes.js";
export default {
  data() {
    return {
      recipe: null,
      isLiked: false, // Add this
    };
  },
  async created() {
    try {
<<<<<<< HEAD
      let recipeId = this.$route.params.Id;
      console.log('Fetching recipe details for ID:', recipeId);
=======
      let recipeId = this.$route.params.recipeId;
      console.log("Fetching recipe details for ID:", recipeId);
>>>>>>> f62075d (fixed navbar)
      let response = mockGetRecipeFullDetails(recipeId);

      let {
        analyzedInstructions,
        instructions,
        extendedIngredients,
        aggregateLikes,
        readyInMinutes,
        image,
        title,
      } = response.data.recipe;

      let _instructions = analyzedInstructions
        .map((fstep) => {
          fstep.steps[0].step = fstep.name + fstep.steps[0].step;
          return fstep.steps;
        })
        .reduce((a, b) => [...a, ...b], []);

      this.recipe = {
        instructions,
        _instructions,
        analyzedInstructions,
        extendedIngredients,
        aggregateLikes,
        readyInMinutes,
        image,
        title,
      };
      console.log("Recipe data loaded:", this.recipe);
    } catch (error) {
      console.log("Error fetching recipe:", error);
      this.$router.replace("/NotFound");
    }
  },
  methods: {
    toggleFavorite() {
      this.isLiked = !this.isLiked;
    },
  },
};
</script>

<style scoped>
.wrapper {
  display: flex;
}
.wrapped {
  width: 50%;
}
.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}
.favorite-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  color: grey;
  cursor: pointer;
  outline: none;
  transition: color 0.3s, transform 0.3s;
}
.favorite-btn.liked {
  color: red;
  transform: scale(1.2);
  animation: bounce 0.3s;
}
@keyframes bounce {
  0%,
  100% {
    transform: scale(1.2);
  }
  50% {
    transform: scale(1.5);
  }
}
</style>
