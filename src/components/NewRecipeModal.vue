<template>
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
    body-bg-variant="light"
    body-text-variant="dark"
  >
    <p>Fields marked with <span class="mandatory">*</span> are mandatory</p>
    <form @submit.prevent="submitForm">
      <div
        class="form-group row"
        :class="{ 'has-error': (showErrors || touched.name) && !recipe.name }"
      >
        <label class="col-sm-4 col-form-label"
          >Name <span class="mandatory">*</span></label
        >
        <div class="col-sm-8">
          <b-form-input
            type="text"
            v-model="recipe.name"
            @blur="touched.name = true"
            placeholder="Enter recipe name"
            :state="showErrors || touched.name ? !!recipe.name : null"
            required
          ></b-form-input>
        </div>
      </div>
      <div
        class="form-group row"
        :class="{
          'has-error': (showErrors || touched.preview) && !recipe.preview,
        }"
      >
        <label class="col-sm-4 col-form-label"
          >Preview <span class="mandatory">*</span></label
        >
        <div class="col-sm-8">
          <b-form-input
            type="text"
            v-model="recipe.preview"
            @blur="touched.preview = true"
            placeholder="Write a short preview"
            :state="showErrors || touched.preview ? !!recipe.preview : null"
            required
          ></b-form-input>
        </div>
      </div>
      <div
        class="form-group row"
        :class="{
          'has-error': (showErrors || touched.summary) && !recipe.summary,
        }"
      >
        <label class="col-sm-4 col-form-label"
          >Summary <span class="mandatory">*</span></label
        >
        <div class="col-sm-8">
          <b-form-textarea
            v-model="recipe.summary"
            @blur="touched.summary = true"
            placeholder="Write the recipe summary"
            :state="showErrors || touched.summary ? !!recipe.summary : null"
            required
          ></b-form-textarea>
        </div>
      </div>
      <div
        class="form-group row"
        :class="{ 'has-error': (showErrors || touched.photo) && !recipe.photo }"
      >
        <label class="col-sm-4 col-form-label"
          >Photo <span class="mandatory">*</span></label
        >
        <div class="col-sm-8">
          <b-form-file
            v-model="recipe.photo"
            @blur="touched.photo = true"
            accept="image/*"
            placeholder="Upload a photo"
            :state="showErrors || touched.photo ? !!recipe.photo : null"
            required
          ></b-form-file>
        </div>
      </div>
      <div
        class="form-group row"
        :class="{
          'has-error': (showErrors || touched.cuisine) && !recipe.cuisine,
        }"
      >
        <label class="col-sm-4 col-form-label"
          >Cuisine <span class="mandatory">*</span></label
        >
        <div class="col-sm-8">
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
      </div>
      <div
        class="form-group row"
        :class="{
          'has-error': (showErrors || touched.diets) && !recipe.diets.length,
        }"
      >
        <label class="col-sm-4 col-form-label">Diets</label>
        <div class="col-sm-8">
          <multiselect
            v-model="recipe.diets"
            @blur="touched.diets = true"
            :options="diets"
            :multiple="true"
            :close-on-select="false"
            :clear-on-select="false"
            :preserve-search="true"
            placeholder="Select diets"
            label="name"
            track-by="name"
            :state="showErrors || touched.diets ? !!recipe.diets.length : null"
          ></multiselect>
        </div>
      </div>
      <div
        class="form-group row"
        :class="{
          'has-error':
            (showErrors || touched.intolerances) && !recipe.intolerances.length,
        }"
      >
        <label class="col-sm-4 col-form-label">Intolerances</label>
        <div class="col-sm-8">
          <multiselect
            v-model="recipe.intolerances"
            @blur="touched.intolerances = true"
            :options="intolerances"
            :multiple="true"
            :close-on-select="false"
            :clear-on-select="false"
            :preserve-search="true"
            placeholder="Select intolerances"
            label="name"
            track-by="name"
            :state="
              showErrors || touched.intolerances
                ? !!recipe.intolerances.length
                : null
            "
          ></multiselect>
        </div>
      </div>
      <div
        class="form-group row"
        :class="{
          'has-error':
            (showErrors || touched.ingredients) && !recipe.ingredients.length,
        }"
      >
        <label class="col-sm-4 col-form-label"
          >Ingredients <span class="mandatory">*</span></label
        >
        <div class="col-sm-8">
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
                showErrors || touched.ingredients ? !!ingredient.amount : null
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
            <b-button variant="danger" @click="removeIngredient(index)"
              >-</b-button
            >
          </div>
          <b-button variant="info" @click="addIngredient"
            >+ Add Ingredient</b-button
          >
        </div>
      </div>
      <div
        class="form-group row"
        :class="{
          'has-error':
            (showErrors || touched.instructions) && !recipe.instructions.length,
        }"
      >
        <label class="col-sm-4 col-form-label"
          >Instructions <span class="mandatory">*</span></label
        >
        <div class="col-sm-8">
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
                showErrors || touched.instructions ? !!instruction.step : null
              "
              required
            ></b-form-textarea>
            <b-button variant="danger" @click="removeInstruction(index)"
              >-</b-button
            >
          </div>
          <b-button variant="info" @click="addInstruction">+ Add Step</b-button>
        </div>
      </div>
      <div
        class="form-group row"
        :class="{
          'has-error': (showErrors || touched.servings) && !recipe.servings,
        }"
      >
        <label class="col-sm-4 col-form-label"
          >Number of servings <span class="mandatory">*</span></label
        >
        <div class="col-sm-8">
          <b-form-input
            type="number"
            v-model="recipe.servings"
            @blur="touched.servings = true"
            class="input-width-sm"
            :state="showErrors || touched.servings ? !!recipe.servings : null"
            required
          ></b-form-input>
        </div>
      </div>
      <div
        class="form-group row"
        :class="{ 'has-error': (showErrors || touched.time) && !recipe.time }"
      >
        <label class="col-sm-4 col-form-label"
          >Time to make (in minutes) <span class="mandatory">*</span></label
        >
        <div class="col-sm-8">
          <b-form-input
            type="number"
            v-model="recipe.time"
            @blur="touched.time = true"
            class="input-width-sm"
            :state="showErrors || touched.time ? !!recipe.time : null"
            required
          ></b-form-input>
        </div>
      </div>
      <div class="text-center">
        <b-button type="submit" variant="success">Create</b-button>
        <b-button variant="secondary" @click="closeModal">Cancel</b-button>
      </div>
    </form>
  </b-modal>
</template>

<script>
import Multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.min.css";
import { mockSaveNewRecipe } from "../services/recipes.js";

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
      recipe: {
        name: "",
        preview: "",
        summary: "",
        photo: null,
        cuisine: "",
        diets: [],
        intolerances: [],
        ingredients: [],
        instructions: [],
        servings: "",
        time: "",
      },
      cuisines: ["Italian", "Chinese", "Indian"],
      diets: [
        { name: "Vegan" },
        { name: "Vegetarian" },
        { name: "Gluten-Free" },
      ],
      intolerances: [
        { name: "Dairy" },
        { name: "Egg" },
        { name: "Peanut" },
        { name: "Seafood" },
        { name: "Sesame" },
        { name: "Soy" },
        { name: "Tree Nut" },
        { name: "Wheat" },
      ],
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
      this.recipe.ingredients.splice(index, 1);
    },
    addInstruction() {
      this.recipe.instructions.push({ step: "" });
    },
    removeInstruction(index) {
      this.recipe.instructions.splice(index, 1);
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
        ingredients: [],
        instructions: [],
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
  },
};
</script>

<style scoped>
.form-group {
  margin-bottom: 15px;
}

.mandatory {
  color: red;
}

.text-center {
  display: flex;
  justify-content: center;
  gap: 10px; /* Adjust as needed for spacing */
  margin-top: 15px; /* Add some top margin */
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
