<script setup lang="ts">
import { useRoute } from "vue-router";
import { onMounted, onUnmounted, ref } from "vue";

import CocktailsStorage from "@/services/storage/cocktails.storage";

import Poster from "@/ui/common/cocktail-poster.vue";
import ProgressComponent from "@/ui/common/progress-loader.vue";
import type { CocktailDetail } from "@/services/cocktail-types";

// Get the id of the movie from the url
const route = useRoute();
const id = route.params.id as unknown as string;

// Load the cocktail details
const currentCocktail = ref<CocktailDetail | undefined>(undefined);
const isLoading = ref<boolean>(true);

onMounted(async () => {
  isLoading.value = true;
  try {
    currentCocktail.value = await CocktailsStorage.getCocktailDetails(id);
    CocktailsStorage.setCurrentCocktailTitle(
      currentCocktail.value?.strDrink || ""
    );
  } finally {
    isLoading.value = false;
  }
});

onUnmounted(() => {
  CocktailsStorage.setCurrentCocktailTitle("");
});
</script>

<template>
  <div class="cocktail-page">
    <div v-if="isLoading">
      <ProgressComponent />
    </div>
    <div v-else-if="CocktailsStorage.getError.value() || !currentCocktail">
      Cannot load the cocktail. Please refresh the page.
    </div>
    <template v-else>
      <v-card>
        <v-container>
          <v-row>
            <v-col cols="3">
              <Poster
                :src="currentCocktail.strDrinkThumb"
                :footer="currentCocktail.strCategory"
              />
            </v-col>
            <v-col cols="9">
              <v-container>
                <v-row>
                  <v-col>
                    <h1>{{ currentCocktail.strDrink }}</h1>
                  </v-col>
                </v-row>
                <v-row v-if="currentCocktail.strTags">
                  <v-col>
                    <span v-for="tag in currentCocktail.strTags" :key="tag">
                      <v-chip class="text-caption" style="margin-right: 5px">{{
                        tag
                      }}</v-chip>
                    </span>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col>
                    <span v-if="currentCocktail.strAlcoholic">
                      This is an {{ currentCocktail.strAlcoholic }} cocktail.
                    </span>
                    <span v-if="currentCocktail.strGlass">
                      It is served in {{ currentCocktail.strGlass }}.
                    </span>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col>
                    <h2 class="text-h6">Ingredients</h2>
                    <div>
                      <div
                        v-for="ingredient in currentCocktail.strIngredientsAndMeasure"
                        :key="ingredient.ingredient"
                      >
                        {{ ingredient.ingredient + ": " + ingredient.measure }}
                      </div>
                    </div>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col>
                    <h2 class="text-h6">Instructions</h2>
                    <div>
                      <span v-html="currentCocktail.strInstructions" />
                    </div>
                  </v-col>
                </v-row>
              </v-container>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.cocktail-page {
  margin: 50px;
}
</style>
