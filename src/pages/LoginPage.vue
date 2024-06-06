<template>
  <div class="login-container">
    <div class="login-left">
      <div class="welcome-text">
        <p>Welcome Back!</p>
      </div>
    </div>
    <div class="login-right">
      <div class="login-form bg-dark">
        <h1 class="title">Login</h1>
        <b-form @submit.prevent="onLogin">
          <b-form-group
            class="login-label"
            id="input-group-Username"
            label="Username:"
            label-for="Username"
          >
            <b-form-input
              id="Username"
              v-model="$v.form.username.$model"
              type="text"
              :state="validateState('username')"
            ></b-form-input>
            <b-form-invalid-feedback
              >Username is required</b-form-invalid-feedback
            >
          </b-form-group>

          <b-form-group
            class="login-label"
            id="input-group-Password"
            label="Password:"
            label-for="Password"
          >
            <b-form-input
              id="Password"
              type="password"
              v-model="$v.form.password.$model"
              :state="validateState('password')"
            ></b-form-input>
            <b-form-invalid-feedback
              >Password is required</b-form-invalid-feedback
            >
          </b-form-group>

          <b-button type="submit" variant="primary" class="login-button">
            Submit
          </b-button>
          <div class="register-link">
            Don't have an account yet?
            <router-link to="register">Register here</router-link>
          </div>
        </b-form>
        <b-alert
          class="mt-2"
          v-if="form.submitError"
          variant="warning"
          dismissible
          show
        >
          Login failed: {{ form.submitError }}
        </b-alert>
      </div>
    </div>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import { mockLogin } from "../services/auth.js";

export default {
  name: "Login",
  data() {
    return {
      form: {
        username: "",
        password: "",
        submitError: undefined,
      },
    };
  },
  validations: {
    form: {
      username: {
        required,
      },
      password: {
        required,
      },
    },
  },
  methods: {
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
    async Login() {
      try {
        const success = true; // Modify this to test the error handling
        const response = mockLogin(
          this.form.username,
          this.form.password,
          success
        );

        this.$root.store.login(this.form.username);
        this.$router.push("/");
      } catch (err) {
        console.log(err.response);
        this.form.submitError = err.response.data.message;
      }
    },
    onLogin() {
      this.form.submitError = undefined;
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      this.Login();
    },
  },
};
</script>

<style lang="scss" scoped>
.login-container {
  display: flex;
  height: 100vh;
}

.login-left {
  background-image: url("../assets/login-pic.jpeg");
  background-size: cover;
  background-repeat: no-repeat; // Prevent the image from repeating
  background-position: center; // Center the image
  background-color: #474c51; // Adjust the color to match the example
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.welcome-text {
  color: #f5f6f5; // White text color
  font-size: 3rem;
  font-weight: bold;
}

.login-right {
  flex: 1;
  background-color: #d0cfca; // Revised background color
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-form {
  width: 100%;
  max-width: 700px; // Increased max-width for larger form
  padding: 20px;
  background: #333333; // Dark background for the form
  border-radius: 8px; // Rounded corners
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); // Subtle shadow
  color: #ffffff; // Set text color to white to match navbar
}

.title {
  text-align: center;
  margin-bottom: 20px;
  color: #ffffff; // White text color for the title
}

.login-button {
  width: 100%;
  margin-top: 20px;
  font-size: 1.3rem;
  font-weight: 500;
}

.register-link {
  margin-top: 10px;
  text-align: center;
  color: #ffffff; // White text color for the register link
}
.login-label {
  font-size: 1.3rem;
  font-weight: 400;
  margin-bottom: 15px;
  color: #ffffff; // White text color for the labels
}
</style>
