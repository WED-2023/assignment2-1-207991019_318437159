<template>
  <div class="login-container">
    <div class="login-left">
      <div class="welcome-text">
        <p>Welcome Back!</p>
      </div>
    </div>
    <div class="login-right">
      <LoginBox />
    </div>
  </div>
</template>

<script>
import LoginBox from "../components/LoginBox.vue"; 

export default {
  name: "Login",
  components: {
    LoginBox,
  },
};
</script>

<style lang="scss" scoped>
.login-container {
  display: flex;
  height: 100vh;
}

.login-left {
  background-image: url("../assets/photos/login-pic.jpeg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-color: #474c51;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.welcome-text {
  color: #f5f6f5;
  font-size: 3rem;
  font-weight: bold;
}

.login-right {
  flex: 1;
  background-color: #ababa6;
  display: flex;
  padding: 10px;
  justify-content: center;
  align-items: center;
}
</style>
