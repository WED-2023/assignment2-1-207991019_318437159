<template>
  <div class="no-results-message">
    <div class="no-results-box">
      <i class="fas fa-ban no-results-icon"></i>
      <h3>{{ title }}</h3>
      <p>{{ message }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "NoResults",
  props: {
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.no-results-message {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px; /* Adjust height as needed */
}

.no-results-box {
  text-align: center;
  background: rgba(255, 255, 255, 0.8); /* Slightly opaque background */
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.no-results-icon {
  font-size: 60px;
  color: #888;
  margin-bottom: 10px;
}
</style>
