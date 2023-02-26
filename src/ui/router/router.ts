import { createRouter, createWebHistory } from "vue-router";

import CocktailsView from "../cocktails/cocktails.page.component.vue";
import CocktailView from "../cocktail/cocktail.page.component.vue";

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "cocktails",
      component: CocktailsView,
    },
    {
      path: "/cocktail/:id",
      name: "cocktail",
      component: CocktailView,
    },
    {
      path: "/:catchAll(.*)",
      redirect: () => {
        return "/";
      },
    },
  ],
});
