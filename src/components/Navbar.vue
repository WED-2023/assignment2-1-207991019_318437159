<template>
  <b-navbar toggleable="lg" type="dark" variant="dark" fixed="top">
    <div class="container-fluid">
      <!-- Navbar Toggler Button -->
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <!-- Collapsible Navbar Content -->
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item :to="{ name: 'main' }">Home</b-nav-item>
          <b-nav-item :to="{ name: 'search' }">Search</b-nav-item>
          <b-nav-item :to="{ name: 'about' }">About</b-nav-item>
        </b-navbar-nav>

        <div class="d-flex mx-auto">
          <img
            src="../assets/photos/OPR.png"
            alt="Ron's Logo"
            class="navbar-brand-logo mx-auto"
          />
        </div>

        <b-navbar-nav class="ms-auto">
          <template v-if="$root.store.username">
            <b-nav-item-dropdown right>
              <template #button-content>
                {{ $root.store.username }}
              </template>
              <b-dropdown-item :to="{ name: 'favorites' }"
                >Favorites</b-dropdown-item
              >
              <b-dropdown-item :to="{ name: 'private' }"
                >Private</b-dropdown-item
              >
              <b-dropdown-item :to="{ name: 'family' }">Family</b-dropdown-item>
              <b-dropdown-item @click="Logout">Sign Out</b-dropdown-item>
            </b-nav-item-dropdown>
            <b-nav-item>
              <b-button variant="secondary" @click="showNewRecipeModal = true"
                >Create New Recipe</b-button
              >
            </b-nav-item>
          </template>
          <template v-else>
            <b-nav-item>Hello Guest</b-nav-item>
            <b-nav-item :to="{ name: 'login' }">Login</b-nav-item>
            <b-nav-item :to="{ name: 'register' }">Register</b-nav-item>
          </template>
        </b-navbar-nav>
      </b-collapse>
    </div>
    <NewRecipeModal
      :show="showNewRecipeModal"
      @close="showNewRecipeModal = false"
    />
  </b-navbar>
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
}

.navbar-nav > li {
  font-family: "Lato", sans-serif;
  font-weight: 400;
  padding: 0 1.5rem;
  font-size: 22px;
}

.dropdown-menu {
  font-family: "Segoe UI", Tahoma;
  font-size: 22px;
}

.navbar-brand-logo {
  width: 45vh;
  height: 50px;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .navbar-collapse {
    display: flex;
    flex-direction: column;
  }
  .navbar-nav {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
