<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
    <div class="container-fluid d-flex justify-content-between align-items-center">
      <!-- Home button at the most left -->
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link class="nav-link" :to="{ name: 'main' }">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" :to="{ name: 'search' }">Search</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" :to="{ name: 'about' }">About</router-link>
        </li>
      </ul>
      
      <div class="navbar-logo-container">
        <img
          src="../assets/photos/OPR.png"
          alt="Ron's Logo"
          class="navbar-brand-logo"
        />
      </div>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ml-auto">
          <template v-if="$root.store.username">
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdownMenuLink2"
                role="button"
                aria-haspopup="true"
                :aria-expanded="isUserDropdownOpen"
                @click.prevent="toggleUserDropdown"
              >
                {{ $root.store.username }}
              </a>
              <div
                class="dropdown-menu dropdown-menu-right"
                :class="{ show: isUserDropdownOpen }"
                aria-labelledby="navbarDropdownMenuLink2"
              >
                <router-link class="dropdown-item" :to="{ name: 'favorites' }">Favorites</router-link>
                <router-link class="dropdown-item" :to="{ name: 'private' }">Private</router-link>
                <router-link class="dropdown-item" :to="{ name: 'family' }">Family</router-link>
                <button class="dropdown-item" @click="Logout">Sign Out</button>
              </div>
            </li>
            <li class="nav-item">
              <button
                class="nav-link btn btn-link btn-create-recipe"
                @click="showNewRecipeModal = true"
              >
                Create New Recipe
              </button>
            </li>
          </template>
          <template v-else>
            <li class="nav-item">
              <span class="navbar-text">Hello Guest</span>
            </li>
            <li class="nav-item">
              <router-link class="nav-link circular-btn" :to="{ name: 'login' }">Login</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link circular-btn" :to="{ name: 'register' }">Register</router-link>
            </li>
          </template>
        </ul>
      </div>
    </div>
    <NewRecipeModal
      :show="showNewRecipeModal"
      @close="showNewRecipeModal = false"
    />
  </nav>
</template>

<script>
import NewRecipeModal from "./NewRecipeModal.vue";
export default {
  name: "Navbar",
  components: {
    NewRecipeModal,
  },
  data() {
    return {
      isUserDropdownOpen: false,
      showNewRecipeModal: false,
    };
  },
  methods: {
    Logout() {
      this.$root.store.logout();
      this.$root.$toast("Logout", "User logged out successfully", "success");
      this.$router.push("/").catch(() => {
        this.$forceUpdate();
      });
    },
    toggleUserDropdown() {
      this.isUserDropdownOpen = !this.isUserDropdownOpen;
    },
    handleRouteChange() {
      // Close dropdown when route changes
      this.isUserDropdownOpen = false;
    },
  },
  created() {
    // Listen for route changes
    this.$router.beforeEach((to, from, next) => {
      this.handleRouteChange();
      next();
    });
  },
};
</script>

<style scoped>
.navbar {
  z-index: 1000; /* Ensure the navbar is above other elements */
  width: 100%;
  top: 0; /* Align it to the top of the page */
  left: 0;
  right: 0;
  max-height: 65px;
}

.navbar-nav > li {
  font-family: "Lato", sans-serif;
  font-weight: 400;
  padding: 0% 1.5rem; /* Adjust padding for better spacing */
  font-size: 22px; /* Improve font size */
}

.dropdown-menu {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana;
  font-size: 22px; /* Improve font size */
}


.navbar-brand-logo {
  width: 50vh;
  height: 8vh; /* Adjust height to stretch logo */
  margin-left: 22vh;
}

.btn-create-recipe {
  font-size: 22px; /* Increase font size for the Create New Recipe button */
  border: none;
  box-shadow: none;
  cursor: pointer;
}

.btn-create-recipe:focus {
  box-shadow: none; /* Remove the box-shadow */
}

</style>
