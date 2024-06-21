import Main from "./pages/MainPage";
import NotFound from "./pages/NotFoundPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import SearchPage from "./pages/SearchPage";
import AboutPage from "./pages/AboutPage";
import FamilyRecipesPage from "./pages/FamilyRecipesPage";
import RecipeViewPage from "./pages/RecipeViewPage";
import MyFaviortesPage from "./pages/MyFaviortesPage";
import MyRecipesPage from "./pages/MyRecipesPage";
import PrepareRecipePage from "./pages/PrepareRecipePage";

const routes = [
  {
    path: "/",
    name: "main",
    component: Main,
  },
  {
    path: "/register",
    name: "register",
    component: RegisterPage,
  },
  {
    path: "/login",
    name: "login",
    component: LoginPage,
  },
  {
    path: "/search",
    name: "search",
    component: SearchPage,
  },
  {
    path: "/about",
    name: "about",
    component: AboutPage,
  },
  {
    path: "/family",
    name: "family",
    component: FamilyRecipesPage,
  },
  {
    path: "/recipe",
    name: "recipe",
    component: RecipeViewPage,
  },
  {
    path: "/favorites",
    name: "favorites",
    component: MyFaviortesPage,
  },
  {
    path: "/private",
    name: "private",
    component: MyRecipesPage,
  },
  {
    path: "*",
    name: "notFound",
    component: NotFound,
  },
  {
    path: "/prepare",
    name: "prepare",
    component: PrepareRecipePage,
  },
];

export default routes;
