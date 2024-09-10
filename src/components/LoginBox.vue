<template>
  <div class="login-box bg-dark">
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
        <b-form-invalid-feedback>Username is required</b-form-invalid-feedback>
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
        <b-form-invalid-feedback>Password is required</b-form-invalid-feedback>
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
</template>

<script>
import { required } from "vuelidate/lib/validators";
import { login } from "../services/auth.js";

export default {
  name: "LoginBox",
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
        await login(this.form.username, this.form.password);
        this.$root.store.login(this.form.username);
        this.$router.push("/").catch(() => {
          this.$forceUpdate();
        });
      } catch (err) {
        console.error(err.response);
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

<style scoped>
.login-box {
  width: 100%;
  max-width: 700px;
  padding: 20px;
  background: #333333;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  color: #ffffff;
}

.title {
  text-align: center;
  margin-bottom: 20px;
  color: #ffffff;
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
  color: #ffffff;
}

.login-label {
  font-size: 1.3rem;
  font-weight: 400;
  margin-bottom: 15px;
  color: #ffffff;
}
</style>
