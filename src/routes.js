import Main from "./pages/MainPage";
import NotFound from "./pages/NotFoundPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import SearchPage from "./pages/SearchPage";
import AboutPage from "./pages/AboutPage";
import FamilyRecipesPage from "./pages/FamilyRecipesPage";
import RecipeViewPage from "./pages/RecipeViewPage";
import MyFavoritePage from "./pages/MyFavoritesPage";
import MyRecipesPage from "./pages/MyRecipesPage";
import PrepareRecipePage from "./pages/PrepareRecipePage";
import MealPage from "./pages/MealPage";

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
    path: "/recipe/:recipeId",
    name: "recipe",
    component: RecipeViewPage,
    props: true,
  },
  {
    path: "/favorites",
    name: "favorites",
    component: MyFavoritePage,
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
  {
    path: "/meal",
    name: "meal",
    component: MealPage,
  },
];

export default routes;
