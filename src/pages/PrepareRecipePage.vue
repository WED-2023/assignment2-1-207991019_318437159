<template>
  <div class="background">
    <div class="navigation-progress" v-if="visibleSteps.length > 0">
      <div
        v-for="(step, index) in visibleSteps"
        :key="index"
        :class="[
          'progress-step',
          {
            active: currentStep === index + visibleStart,
            completed: currentStep > index + visibleStart,
          },
        ]"
      >
        <div class="step-number">{{ index + visibleStart }}</div>
        <div class="step-title">Step {{ index + visibleStart }}</div>
      </div>
    </div>
    <transition v-if="steps.length > 0" :name="transitionName" mode="out-in">
      <div :key="currentStep" class="content-container">
        <div class="recipe-steps">
          <PrepareTheRecipeStep
            :stepNumber="currentStep"
            :title="`Step ${currentStep}`"
            :description="steps[currentStep - 1].stepDescription"
            :equipment="steps[currentStep - 1].equipment"
            :ingredients="steps[currentStep - 1].ingredients"
            @stepFinished="handleStepFinished"
            @previousStep="handlePreviousStep"
            :isFirstStep="currentStep === 1"
            :isLastStep="currentStep === steps.length"
          />
        </div>
      </div>
    </transition>
    <div v-if="steps.length === 0 && !loading" class="mt-4">
      <NoResults
        title="No Instructions"
        message="this recipe has no instructions."
      />
    </div>
  </div>
</template>

<script>
import PrepareTheRecipeStep from "../components/PrepareTheRecipeStep.vue";
import NoResults from "../components/NoResults.vue";

export default {
  components: {
    PrepareTheRecipeStep,
    NoResults,
  },
  data() {
    return {
      steps: [],
      currentStep: 1,
      visibleStart: 1,
      maxVisibleSteps: 10,
      transitionName: "slide-left",
      loading: true,
    };
  },
  computed: {
    visibleSteps() {
      return this.steps.slice(
        this.visibleStart - 1,
        this.visibleStart + this.maxVisibleSteps - 1
      );
    },
  },
  methods: {
    handleStepFinished() {
      this.transitionName = "slide-left";
      this.nextStep();
    },
    handlePreviousStep() {
      this.transitionName = "slide-right";
      this.prevStep();
    },
    async fetchSteps() {
      try {
        const recipeService = await import("../services/recipes.js");
        let recipeId = this.$route.params.recipeId;
        const res = await recipeService.getRecipeInstructions(recipeId);
        this.steps = res.data.steps;
        this.currentStep = res.data.progress;
        this.updateVisibleRange();
      } catch (error) {
        console.error("Error fetching recipe instructions:", error);
      }
    },
    nextStep() {
      if (this.currentStep < this.steps.length) {
        this.currentStep += 1;
        this.updateVisibleRange();
      }
    },
    prevStep() {
      if (this.currentStep > 1) {
        this.currentStep -= 1;
        this.updateVisibleRange();
      }
    },
    updateVisibleRange() {
    const totalSteps = this.steps.length;
    const halfWindow = Math.floor(this.maxVisibleSteps / 2);

    if (totalSteps <= this.maxVisibleSteps) {
      this.visibleStart = 1;
    } else {
      if (this.currentStep > halfWindow && this.currentStep <= totalSteps - halfWindow) {
        this.visibleStart = this.currentStep - halfWindow;
      } else if (this.currentStep <= halfWindow) {
        this.visibleStart = 1;
      } else if (this.currentStep > totalSteps - halfWindow) {
        this.visibleStart = totalSteps - this.maxVisibleSteps + 1;
      }
    }},

    async updateProgress() {
      try {
        const userService = await import("../services/user.js");
        let recipeId = this.$route.params.recipeId;
        await userService.updateRecipeProgress(recipeId, this.currentStep);
      } catch (error) {
        console.error("Error in updating recipe progress:", error);
      }
    },
  },
  async created() {
    await this.fetchSteps();
    this.loading = false;
  },
  async beforeRouteLeave(to, from, next) {
    if (!!this.$root.store.username) await this.updateProgress();
    next();
  },
};
</script>

<style scoped>
:root {
  overflow: hidden;
}
html,
body {
  overflow: hidden;
}

.background {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: url("../assets/photos/wood_background.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  padding: 20px;
  overflow: hidden;
}

.navigation-progress {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  margin-top: 5%;
  width: 100%;
  max-width: 800px;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.progress-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 10px;
  text-align: center;
}

.step-number {
  background-color: #d3d3d3;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: white;
  margin-bottom: 5px;
}

.step-title {
  font-size: 14px;
  color: #555;
}

.progress-step.active .step-number {
  background-color: #1e90ff;
}

.progress-step.completed .step-number {
  background-color: #4caf50;
}

.content-container {
  width: 100%;
  max-width: 800px;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  position: relative;
}

.recipe-steps {
  width: 100%;
  position: relative;
  overflow: hidden; /* Prevents scrollbar */
}

.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}

.slide-left-enter,
.slide-left-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

.slide-left-leave-active {
  transform: translateX(-100%);
}

.slide-right-enter,
.slide-right-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}

.slide-right-leave-active {
  transform: translateX(100%);
}
</style>
