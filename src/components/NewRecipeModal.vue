<template>
  <div>
    <b-modal
      id="new-recipe-modal"
      title="Create a new recipe"
      v-model="show"
      @hide="resetForm"
      @hidden="$emit('close')"
      size="lg"
      hide-footer
      centered
      header-bg-variant="secondary"
      header-text-variant="light"
      :dialog-class="'custom-modal-dialog'"
    >
      <div class="modal-background">
        <div class="modal-content-wrapper">
          
          <!-- Modal Header Information -->
          <p>
            Fields marked with <span class="mandatory">*</span> are mandatory
          </p>
          <form @submit.prevent="submitForm">

            <!-- Recipe Name Input -->
            <div
              class="form-group"
              :class="{
                'has-error': (showErrors || touched.name) && !recipe.name,
              }"
            >
              <label>Name <span class="mandatory">*</span></label>
              <b-form-input
                type="text"
                v-model="recipe.name"
                @blur="touched.name = true"
                placeholder="Enter recipe name"
                :state="showErrors || touched.name ? !!recipe.name : null"
                required
              ></b-form-input>
            </div>

            <!-- Recipe Preview Input -->
            <div
              class="form-group"
              :class="{
                'has-error': (showErrors || touched.preview) && !recipe.preview,
              }"
            >
              <label>Preview <span class="mandatory">*</span></label>
              <b-form-input
                type="text"
                v-model="recipe.preview"
                @blur="touched.preview = true"
                placeholder="Write a short preview"
                :state="showErrors || touched.preview ? !!recipe.preview : null"
                required
              ></b-form-input>
            </div>

            <!-- Recipe Summary Input -->
            <div
              class="form-group"
              :class="{
                'has-error': (showErrors || touched.summary) && !recipe.summary,
              }"
            >
              <label>Summary <span class="mandatory">*</span></label>
              <b-form-textarea
                v-model="recipe.summary"
                @blur="touched.summary = true"
                placeholder="Write the recipe summary"
                :state="showErrors || touched.summary ? !!recipe.summary : null"
                required
              ></b-form-textarea>
            </div>

            <!-- Recipe Photo Input -->
            <div
              class="form-group"
              :class="{
                'has-error': (showErrors || touched.photo) && !recipe.photo,
              }"
            >
              <label>Photo <span class="mandatory">*</span></label>
              <b-form-file
                v-model="recipe.photo"
                @blur="touched.photo = true"
                accept="image/*"
                placeholder="Upload a photo"
                :state="showErrors || touched.photo ? !!recipe.photo : null"
                required
              ></b-form-file>
            </div>

            <!-- Recipe Cuisine Input -->
            <div
              class="form-group"
              :class="{
                'has-error': (showErrors || touched.cuisine) && !recipe.cuisine,
              }"
            >
              <label>Cuisine <span class="mandatory">*</span></label>
              <b-form-select
                v-model="recipe.cuisine"
                @blur="touched.cuisine = true"
                :options="cuisines"
                placeholder="Please select cuisine"
                :state="showErrors || touched.cuisine ? !!recipe.cuisine : null"
                required
              >
                <option disabled value="">Please select cuisine</option>
              </b-form-select>
            </div>

            <!-- Recipe Diets Input -->
            <div
              class="form-group"
              :class="{
                'has-error':
                  (showErrors || touched.diets) && !recipe.diets.length,
              }"
            >
              <label>Diets</label>
              <multiselect
                v-model="recipe.diets"
                @blur="touched.diets = true"
                :options="diets"
                :multiple="true"
                :close-on-select="false"
                :clear-on-select="false"
                :preserve-search="true"
                placeholder="Select diets"
                :state="
                  showErrors || touched.diets ? !!recipe.diets.length : null
                "
              ></multiselect>
            </div>

            <!-- Recipe Intolerances Input -->
            <div
              class="form-group"
              :class="{
                'has-error':
                  (showErrors || touched.intolerances) &&
                  !recipe.intolerances.length,
              }"
            >
              <label>Intolerances</label>
              <multiselect
                v-model="recipe.intolerances"
                @blur="touched.intolerances = true"
                :options="intolerances"
                :multiple="true"
                :close-on-select="false"
                :clear-on-select="false"
                :preserve-search="true"
                placeholder="Select intolerances"
                :state="
                  showErrors || touched.intolerances
                    ? !!recipe.intolerances.length
                    : null
                "
              ></multiselect>
            </div>

            <!-- Recipe Ingredients Input -->
            <div
              class="form-group"
              :class="{
                'has-error':
                  (showErrors || touched.ingredients) &&
                  !recipe.ingredients.length,
              }"
            >
              <label>Ingredients <span class="mandatory">*</span></label>
              <div
                v-for="(ingredient, index) in recipe.ingredients"
                :key="index"
                class="form-inline mb-2"
              >
                <b-form-input
                  type="text"
                  v-model="ingredient.name"
                  @blur="touched.ingredients = true"
                  placeholder="Ingredient"
                  :state="
                    showErrors || touched.ingredients ? !!ingredient.name : null
                  "
                  required
                ></b-form-input>
                <b-form-input
                  type="number"
                  v-model="ingredient.amount"
                  @blur="touched.ingredients = true"
                  placeholder="Amount"
                  :state="
                    showErrors || touched.ingredients
                      ? !!ingredient.amount
                      : null
                  "
                  required
                ></b-form-input>
                <b-form-select
                  v-model="ingredient.unit"
                  @blur="touched.ingredients = true"
                  :options="units"
                  @change="checkOtherUnit(index)"
                  :state="
                    showErrors || touched.ingredients ? !!ingredient.unit : null
                  "
                  required
                >
                  <option disabled value="">Unit</option>
                </b-form-select>
                <b-form-input
                  v-if="ingredient.unit === 'other'"
                  type="text"
                  v-model="ingredient.otherUnit"
                  @blur="touched.ingredients = true"
                  placeholder="Enter unit"
                  :state="
                    showErrors || touched.ingredients
                      ? !!ingredient.otherUnit
                      : null
                  "
                  required
                ></b-form-input>
                <b-button
                  variant="danger"
                  @click="removeIngredient(index)"
                  :disabled="recipe.ingredients.length === 1"
                  >-</b-button
                >
              </div>
              <b-button variant="info" @click="addIngredient"
                >+ Add Ingredient</b-button
              >
            </div>

            <!-- Recipe Instructions Input -->
            <div
              class="form-group"
              :class="{
                'has-error':
                  (showErrors || touched.instructions) &&
                  !recipe.instructions.length,
              }"
            >
              <label>Instructions <span class="mandatory">*</span></label>
              <div
                v-for="(instruction, index) in recipe.instructions"
                :key="index"
                class="form-inline mb-2"
              >
                <b-form-textarea
                  v-model="instruction.step"
                  @blur="touched.instructions = true"
                  placeholder="Step"
                  :state="
                    showErrors || touched.instructions
                      ? !!instruction.step
                      : null
                  "
                  required
                ></b-form-textarea>
                <b-button
                  variant="danger"
                  @click="removeInstruction(index)"
                  :disabled="recipe.instructions.length === 1"
                  >-</b-button
                >
              </div>
              <b-button variant="info" @click="addInstruction"
                >+ Add Step</b-button
              >
            </div>

            <!-- Recipe Servings Input -->
            <div
              class="form-group"
              :class="{
                'has-error':
                  (showErrors || touched.servings) && !recipe.servings,
              }"
            >
              <label>Number of servings <span class="mandatory">*</span></label>
              <b-form-input
                type="number"
                v-model="recipe.servings"
                @blur="touched.servings = true"
                class="input-width-sm"
                :state="
                  showErrors || touched.servings ? !!recipe.servings : null
                "
                required
              ></b-form-input>
            </div>

            <!-- Recipe Time Input -->
            <div
              class="form-group"
              :class="{
                'has-error': (showErrors || touched.time) && !recipe.time,
              }"
            >
              <label
                >Time to make (in minutes)
                <span class="mandatory">*</span></label
              >
              <b-form-input
                type="number"
                v-model="recipe.time"
                @blur="touched.time = true"
                class="input-width-sm"
                :state="showErrors || touched.time ? !!recipe.time : null"
                required
              ></b-form-input>
            </div>

            <!-- Form Submission Buttons -->
            <div class="text-center">
              <b-button type="submit" variant="success">Create</b-button>
              <b-button variant="secondary" @click="closeModal"
                >Cancel</b-button
              >
            </div>
          </form>
        </div>
      </div>
    </b-modal>
    <b-modal
      id="success-modal"
      hide-footer
      centered
      title="Success"
      v-model="showSuccessModal"
      header-class="bg-success text-white"
      content-class="bg-white text-center"
    >
      <div class="text-black">
        Your recipe has been created successfully!
      </div>
      <b-button class="mt-3" variant="dark" @click="closeSuccessModal"
        >OK</b-button
      >
    </b-modal>
  </div>
</template>

<script>
import Multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.min.css";
import {
  mockSaveNewRecipe,
  mockGetCategoriesForSearch,
} from "../services/recipes.js";

export default {
  components: { Multiselect },
  props: {
    show: {
      type: Boolean,
      required: true,
    },
  },
  watch: {
    show(newVal) {
      if (newVal) {
        this.$bvModal.show("new-recipe-modal");
      } else {
        this.$bvModal.hide("new-recipe-modal");
      }
    },
  },
  data() {
    return {
      showSuccessModal: false,
      recipe: {
        name: "",
        preview: "",
        summary: "",
        photo: null,
        cuisine: "",
        diets: [],
        intolerances: [],
        ingredients: [{ name: "", amount: "", unit: "" }],
        instructions: [{ step: "" }],
        servings: "",
        time: "",
      },
      cuisines: [],
      diets: [],
      intolerances: [],
      units: ["tbsp", "tsp", "cup", "gram", "ml", "other"],
      showErrors: false,
      touched: {
        name: false,
        preview: false,
        summary: false,
        photo: false,
        cuisine: false,
        diets: false,
        intolerances: false,
        ingredients: false,
        instructions: false,
        servings: false,
        time: false,
      },
    };
  },
  created() {
    try {
      const { data } = mockGetCategoriesForSearch();
      this.cuisines = data.cuisine;
      this.intolerances = data.intolerance;
      this.diets = data.diets;
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  },
  computed: {
    isFormValid() {
      return (
        this.recipe.name &&
        this.recipe.preview &&
        this.recipe.summary &&
        this.recipe.photo &&
        this.recipe.cuisine &&
        this.recipe.ingredients.length > 0 &&
        this.recipe.instructions.length > 0 &&
        this.recipe.servings &&
        this.recipe.time
      );
    },
  },
  methods: {
    addIngredient() {
      this.recipe.ingredients.push({ name: "", amount: "", unit: "" });
    },
    removeIngredient(index) {
      if (this.recipe.ingredients.length > 1) {
        this.recipe.ingredients.splice(index, 1);
      }
    },
    addInstruction() {
      this.recipe.instructions.push({ step: "" });
    },
    removeInstruction(index) {
      if (this.recipe.instructions.length > 1) {
        this.recipe.instructions.splice(index, 1);
      }
    },
    checkOtherUnit(index) {
      if (this.recipe.ingredients[index].unit !== "other") {
        this.recipe.ingredients[index].otherUnit = "";
      }
    },
    submitForm() {
      this.showErrors = true;
      if (this.isFormValid) {
        mockSaveNewRecipe(this.recipe);
        this.$bvModal.hide("new-recipe-modal");
        this.showSuccessModal = true;
        this.resetForm();
        this.$emit("close");
      } else {
        this.scrollToFirstError();
      }
    },
    scrollToFirstError() {
      this.$nextTick(() => {
        const errorElement = this.$el.querySelector(
          ".has-error input, .has-error select, .has-error textarea"
        );
        if (errorElement) {
          errorElement.scrollIntoView({ behavior: "smooth" });
        }
      });
    },
    closeModal() {
      this.$bvModal.hide("new-recipe-modal");
      this.resetForm();
      this.$emit("close");
    },
    resetForm() {
      this.recipe = {
        name: "",
        preview: "",
        summary: "",
        photo: null,
        cuisine: "",
        diets: [],
        intolerances: [],
        ingredients: [{ name: "", amount: "", unit: "" }],
        instructions: [{ step: "" }],
        servings: "",
        time: "",
      };
      this.showErrors = false;
      this.touched = {
        name: false,
        preview: false,
        summary: false,
        photo: false,
        cuisine: false,
        diets: false,
        intolerances: false,
        ingredients: false,
        instructions: false,
        servings: false,
        time: false,
      };
    },
    closeSuccessModal() {
      this.showSuccessModal = false;
    },
  },
};
</script>

<style scoped>
.modal-background {
  background-image: url("../assets/photos/wood_background.jpg");
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content-wrapper {
  background: rgba(255, 255, 255, 0.9);
  padding: 20px;
  border-radius: 10px;
  width: 100%;
  max-width: 700px;
  margin-bottom: 3%;
  margin-top: 3%;
}

.form-group {
  margin-bottom: 15px;
}

.mandatory {
  color: red;
}

.text-center {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 15px;
}

.has-error input,
.has-error select,
.has-error textarea {
  border-color: red;
}

.b-modal-lg {
  max-width: 80%;
}

.input-width-sm {
  max-width: 150px;
}
</style>
