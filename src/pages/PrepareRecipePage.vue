<template>
  <div class="background">
    <div class="navigation-progress">
      <div
        v-for="(step, index) in steps"
        :key="index"
        :class="['progress-step', { active: currentStep === index + 1, completed: currentStep > index + 1 }]"
      >
        <div class="step-number">{{ index + 1 }}</div>
        <div class="step-title">Step {{ index + 1 }}</div>
      </div>
    </div>
    <transition :name="transitionName" mode="out-in">
      <div v-if="steps.length > 0" :key="currentStep" class="content-container">
        <div class="recipe-steps">
          <PrepareTheRecipeStep
            :stepNumber="steps[currentStep - 1].number"
            :title="`Step ${steps[currentStep - 1].number}`"
            :description="steps[currentStep - 1].step"
            :equipment="steps[currentStep - 1].equipment"
            :ingredients="steps[currentStep - 1].ingredients"
            @stepFinished="handleStepFinished"
            @previousStep="handlePreviousStep"
          />
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import PrepareTheRecipeStep from "../components/PrepareTheRecipeStep.vue";
import { mockGetRecipeInstructions } from "../services/recipes.js";

export default {
  components: {
    PrepareTheRecipeStep,
  },
  data() {
    return {
      steps: [],
      currentStep: 1,
      transitionName: 'slide-left'
    };
  },
  methods: {
    handleStepFinished() {
      this.transitionName = 'slide-left';
      this.nextStep();
    },
    handlePreviousStep() {
      this.transitionName = 'slide-right';
      this.prevStep();
    },
    async fetchSteps() {
      try {
        const instructions = await mockGetRecipeInstructions();
        this.steps = instructions[0].steps; 
      } catch (error) {
        console.error("Error fetching recipe instructions:", error);
      }
    },
    nextStep() {
      if (this.currentStep < this.steps.length) {
        this.currentStep += 1;
      }
    },
    prevStep() {
      if (this.currentStep > 1) {
        this.currentStep -= 1;
      }
    },
  },
  created() {
    this.fetchSteps();
  },
};
</script>

<style scoped>
:root {
  overflow: hidden;
}
html, body {
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
