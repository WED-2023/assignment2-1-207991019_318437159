<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <!-- Logo -->
    <img
      src="../assets/photos/ron-chili-removebg.png"
      alt="Ron's Logo"
      class="navbar-brand-logo"
    />

      <!-- Brand name -->
      <router-link class="navbar-brand pl-3" :to="{ name: 'main' }"
        >Ron's Matkonim</router-link
      >
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'search' }"
              >Search</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'about' }"
              >About</router-link
            >
          </li>
          <li class="nav-item dropdown" v-if="$root.store.username">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdownMenuLink1"
              role="button"
              aria-haspopup="true"
              :aria-expanded="isMyRecipesDropdownOpen"
              @click.prevent="toggleMyRecipesDropdown"
            >
              My Recipes
            </a>
            <div
              class="dropdown-menu"
              :class="{ show: isMyRecipesDropdownOpen }"
              aria-labelledby="navbarDropdownMenuLink1"
            >
              <router-link class="dropdown-item" :to="{ name: 'favorites' }"
                >Favorites</router-link
              >
              <router-link class="dropdown-item" :to="{ name: 'private' }"
                >Private</router-link
              >
              <router-link class="dropdown-item" :to="{ name: 'family' }"
                >Family</router-link
              >
            </div>
          </li>
        </ul>
        <ul class="navbar-nav ml-auto pr-3">
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
                <router-link
                  class="dropdown-item"
                  @click="toggleUserDropdown"
                  :to="{ name: 'profile' }"
                  >Profile</router-link
                >
                <button class="dropdown-item" @click="Logout">Sign Out</button>
              </div>
            </li>
            <li class="nav-item">
              <button
                class="nav-link btn btn-link"
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
              <router-link class="nav-link circular-btn" :to="{ name: 'login' }"
                >Login</router-link
              >
            </li>
            <li class="nav-item">
              <router-link
                class="nav-link circular-btn"
                :to="{ name: 'register' }"
                >Register</router-link
              >
            </li>
          </template>
        </ul>
      </div>
    </nav>
    <NewRecipeModal
      :show="showNewRecipeModal"
      @close="showNewRecipeModal = false"
    />
  </div>
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
      isMyRecipesDropdownOpen: false,
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
    toggleMyRecipesDropdown() {
      this.isMyRecipesDropdownOpen = !this.isMyRecipesDropdownOpen;
      this.isUserDropdownOpen = false; // Close the user dropdown when opening my recipes dropdown
    },
    toggleUserDropdown() {
      this.isUserDropdownOpen = !this.isUserDropdownOpen;
      this.isMyRecipesDropdownOpen = false; // Close the my recipes dropdown when opening user dropdown
    },
    handleRouteChange() {
      // Close dropdown when route changes
      this.isUserDropdownOpen = false;
      this.isMyRecipesDropdownOpen = false;
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
.navbar-nav > li {
  font-family: "Lato", sans-serif;
  font-weight: 400;
  padding: 0.2rem 1.2rem; /* Adjust padding for better spacing */
  font-size: 20px; /* Improve font size */
}
.dropdown-menu {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana;
  font-size: 20px; /* Improve font size */
}
.navbar-brand-logo {
  width: px;
  height: 50px;
  margin-right: 10px; /* Adjust spacing */
}
</style>
