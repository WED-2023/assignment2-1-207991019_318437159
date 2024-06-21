<template>
  <div class="register-container">
    <b-card text-variant="light" class="b-card bg-dark">
      <b-card-title class="mb-4 text-center">
        <h1 class="title">Register</h1>
      </b-card-title>
      <b-form @submit.prevent="onRegister" @reset.prevent="onReset">
        <b-form-group
          id="input-group-username"
          label-size="lg"
          label-cols-sm="3"
          label="Username:"
          label-for="username"
        >
          <b-form-input
            id="username"
            v-model="$v.form.username.$model"
            type="text"
            size="lg"
            :state="validateState('username')"
            @blur="$v.form.username.$touch()"
            placeholder="Enter your username"
          ></b-form-input>
          <b-form-invalid-feedback v-if="!$v.form.username.required">
            Username is required
          </b-form-invalid-feedback>
          <b-form-invalid-feedback v-else-if="!$v.form.username.length">
            Username length should be between 3-8 characters long
          </b-form-invalid-feedback>
          <b-form-invalid-feedback v-if="!$v.form.username.alpha">
            Username should be alphabetic
          </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group
          id="input-group-firstName"
          label-size="lg"
          label-cols-sm="3"
          label="First Name:"
          label-for="firstName"
        >
          <b-form-input
            id="firstName"
            v-model="$v.form.firstName.$model"
            type="text"
            size="lg"
            :state="validateState('firstName')"
            @blur="$v.form.firstName.$touch()"
            placeholder="Enter your first name"
          ></b-form-input>
          <b-form-invalid-feedback v-if="!$v.form.firstName.required">
            First name is required
          </b-form-invalid-feedback>
          <b-form-invalid-feedback v-else-if="!$v.form.firstName.alpha">
            First name must include letters only
          </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group
          id="input-group-lastName"
          label-size="lg"
          label-cols-sm="3"
          label="Last Name:"
          label-for="lastName"
        >
          <b-form-input
            id="lastName"
            v-model="$v.form.lastName.$model"
            type="text"
            size="lg"
            :state="validateState('lastName')"
            @blur="$v.form.lastName.$touch()"
            placeholder="Enter your last name"
          ></b-form-input>
          <b-form-invalid-feedback v-if="!$v.form.lastName.required">
            Last name is required
          </b-form-invalid-feedback>
          <b-form-invalid-feedback v-else-if="!$v.form.lastName.alpha">
            Last name must include letters only
          </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group
          id="input-group-country"
          label-size="lg"
          label-cols-sm="3"
          label="Country:"
          label-for="country"
        >
          <b-form-select
            id="country"
            v-model="$v.form.country.$model"
            :options="countries"
            size="lg"
            :state="validateState('country')"
            @blur="$v.form.country.$touch()"
          ></b-form-select>
          <b-form-invalid-feedback v-if="!$v.form.country.required">
            Country is required
          </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group
          id="input-group-password"
          label-size="lg"
          label-cols-sm="3"
          label="Password:"
          label-for="password"
        >
          <b-form-input
            id="password"
            type="password"
            size="lg"
            v-model="$v.form.password.$model"
            :state="validateState('password')"
            @blur="$v.form.password.$touch()"
            placeholder="Enter your password"
          ></b-form-input>
          <b-form-invalid-feedback v-if="!$v.form.password.required">
            Password is required
          </b-form-invalid-feedback>
          <b-form-text v-else-if="$v.form.password.$error" text-variant="info">
            Your password should be <strong>strong</strong>. <br />
            For that your password should be:
          </b-form-text>
          <b-form-invalid-feedback
            v-if="$v.form.password.required && !$v.form.password.valid"
          >
            5-10 characters long, at least one digit, and one special character
          </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group
          id="input-group-confirmedPassword"
          label-size="lg"
          label-cols-sm="3"
          label="Confirm Password:"
          label-for="confirmedPassword"
        >
          <b-form-input
            id="confirmedPassword"
            type="password"
            size="lg"
            v-model="$v.form.confirmedPassword.$model"
            :state="validateState('confirmedPassword')"
            @blur="$v.form.confirmedPassword.$touch()"
            placeholder="Confirm your password"
          ></b-form-input>
          <b-form-invalid-feedback v-if="!$v.form.confirmedPassword.required">
            Password confirmation is required
          </b-form-invalid-feedback>
          <b-form-invalid-feedback
            v-else-if="!$v.form.confirmedPassword.sameAsPassword"
          >
            Passwords do not match
          </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group
          id="input-group-email"
          label-cols-sm="3"
          label-size="lg"
          label="Email:"
          label-for="email"
        >
          <b-form-input
            id="email"
            v-model="$v.form.email.$model"
            type="email"
            size="lg"
            :state="validateState('email')"
            @blur="$v.form.email.$touch()"
            placeholder="Enter your email"
          ></b-form-input>
          <b-form-invalid-feedback v-if="!$v.form.email.required">
            Email is required
          </b-form-invalid-feedback>
          <b-form-invalid-feedback v-else-if="!$v.form.email.email">
            Please enter a valid email address
          </b-form-invalid-feedback>
        </b-form-group>

        <b-button type="reset" variant="danger" class="register-btn"
          >Reset</b-button
        >
        <b-button type="submit" variant="primary" class="register-btn"
          >Register</b-button
        >
        <div class="mt-4 text-center lead">
          Already have an account?
          <router-link to="login"> Log in here</router-link>
        </div>
      </b-form>
    </b-card>

    <!-- Error Modal -->
    <b-modal
      v-model="showModal"
      hide-footer
      centered
      title="Registration Error"
      header-class="bg-danger text-white"
      content-class="bg-white text-center"
    >
      <div class="text-black">
        {{ errorMessage }}
      </div>
      <b-button class="mt-3" variant="dark" @click="showModal = false"
        >Close</b-button
      >
    </b-modal>
  </div>
</template>

<script>
import {
  required,
  minLength,
  maxLength,
  alpha,
  sameAs,
  email,
} from "vuelidate/lib/validators";
import { mockRegister } from "../services/auth.js";
import countries from "../assets/countries";

export default {
  name: "Register",
  data() {
    return {
      form: {
        username: "",
        firstName: "",
        lastName: "",
        country: null,
        password: "",
        confirmedPassword: "",
        email: "",
      },
      errorMessage: "",
      showModal: false,
      countries: [{ value: null, text: "Select your country", disabled: true }],
    };
  },
  validations: {
    form: {
      username: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(8),
        alpha,
      },
      firstName: {
        required,
        alpha,
      },
      lastName: {
        required,
        alpha,
      },
      email: {
        required,
        email,
      },
      country: {
        required,
      },
      password: {
        required,
        valid: function(value) {
          const containsNumber = /[0-9]/.test(value);
          const containsSpecial = /[#?!@$%^&*-.]/.test(value);
          return containsNumber && containsSpecial;
        },
        minLength: minLength(5),
        maxLength: maxLength(10),
      },
      confirmedPassword: {
        required,
        sameAsPassword: sameAs("password"),
      },
    },
  },
  mounted() {
    this.countries.push(...countries);
  },
  methods: {
    validateState(param) {
      const { $error } = this.$v.form[param];
      return !$error ? null : false;
    },
    async Register() {
      try {
        const userDetails = {
          username: this.form.username,
          firstName: this.form.firstName,
          lastName: this.form.lastName,
          email: this.form.email,
          password: this.form.password,
        };
        const isSuccessful = false;
        //const isSuccessful = Math.random() >= 0.5; // Randomly set isSuccessful to true or false
        const response = await mockRegister(userDetails, isSuccessful);

        if (response.status === 200 && response.response.data.success) {
          this.$router.push("/login");
        } else {
          console.log("aaa");
          this.errorMessage = response.response.data.message;
          this.showModal = true;
        }
      } catch (err) {
        console.log(err.response);
        console.log("aaa");
        this.errorMessage = err.response.data.message;
        this.showModal = true;
      }
    },
    onRegister() {
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      this.Register();
    },
    onReset() {
      this.form = {
        username: "",
        firstName: "",
        lastName: "",
        country: null,
        password: "",
        confirmedPassword: "",
        email: "",
      };
      this.errorMessage = "";
      this.showModal = false;
      this.$nextTick(() => {
        this.$v.$reset();
      });
    },
  },
};
</script>

<style scoped>
.register-container {
  background-image: url("../assets/photos/register-pic.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 120vh;
  padding: 20px;
  box-sizing: border-box;
}

.b-card {
  width: 100%;
  max-width: 800px;
  border: 2px solid #ccc;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.1);
  opacity: 0.9; /* Adjust opacity here */
}

.register-btn {
  width: 100%;
  margin-top: 15px;
  font-size: larger;
  font-weight: 600;
}

@media (max-width: 768px) {
  .b-card {
    padding: 10px;
  }
}
</style>
