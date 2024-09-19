import Vue from "vue";
import App from "./App.vue";
import VueAxios from "vue-axios";
import axios from "axios";

import routes from "./routes";
import VueRouter from "vue-router";
import Vuelidate from "vuelidate";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faHeart as fasHeart,
  faEye,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import Multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.min.css";
import VModal from "vue-js-modal";
import { ProgressPlugin } from "bootstrap-vue";

library.add(fasHeart, farHeart, faStar, faEye);

Vue.use(VueRouter);
const router = new VueRouter({
  routes,
});

Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Vue.use(VModal);
Vue.use(ProgressPlugin);

Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.component("multiselect", Multiselect);

import {
  FormGroupPlugin,
  FormPlugin,
  FormInputPlugin,
  ButtonPlugin,
  CardPlugin,
  NavbarPlugin,
  FormSelectPlugin,
  AlertPlugin,
  ToastPlugin,
  LayoutPlugin,
} from "bootstrap-vue";
[
  FormGroupPlugin,
  FormPlugin,
  FormInputPlugin,
  ButtonPlugin,
  CardPlugin,
  NavbarPlugin,
  FormSelectPlugin,
  AlertPlugin,
  ToastPlugin,
  LayoutPlugin,
].forEach((x) => Vue.use(x));
Vue.use(Vuelidate);

Vue.use(VueAxios, axios);

Vue.config.productionTip = false;

const shared_data = {
  username: localStorage.username,
  login(username) {
    localStorage.setItem("username", username);
    this.username = username;
  },
  logout() {
    localStorage.removeItem("username");
    this.username = undefined;
  },
};

new Vue({
  router,
  data() {
    return {
      store: shared_data,
    };
  },
  methods: {
    toast(title, content, variant = null, append = false) {
      this.$bvToast.toast(`${content}`, {
        title: `${title}`,
        toaster: "b-toaster-top-center",
        variant: variant,
        solid: true,
        appendToast: append,
        autoHideDelay: 3000,
      });
    },
  },
  render: (h) => h(App),
}).$mount("#app");

const SERVER_DOMAIN = "https:///one-piece-recipes.cs.bgu.ac.il";

const api = axios.create({
  baseURL: SERVER_DOMAIN,
  withCredentials: true,
});

export default api;
