<script setup lang="ts">
import { onMounted, ref } from "vue";

import CocktailsStorage from "@/services/storage/cocktails.storage";
import SearchStorage from "@/services/storage/search.storage";

import CocktailsByCategoryComponent from "@/ui/cocktails/cocktails-by-category.component.vue";
import SearchResultsComponent from "@/ui/search/search-result.component.vue";
import ProgressComponent from "@/ui/common/progress-loader.vue";

const isLoading = ref<boolean>(true);

onMounted(async () => {
  isLoading.value = true;
  try {
    if (CocktailsStorage.getCategories.value().length === 0) {
      await CocktailsStorage.setup();
    }
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <div class="cocktails">
    <SearchResultsComponent v-if="SearchStorage.getSearchTerm.value()" />

    <div
      v-else-if="
        !isLoading && CocktailsStorage.getCategories.value().length === 0
      "
    >
      There are no cocktails.
    </div>

    <div v-else-if="isLoading">
      <ProgressComponent />
    </div>

    <template v-else>
      <CocktailsByCategoryComponent
        v-for="category in CocktailsStorage.getCategories.value()"
        :key="category.strCategory"
        :title="category.strCategory"
        :cocktails="CocktailsStorage.getCocktails.value(category)"
      />
    </template>
  </div>
</template>

<style lang="scss" scoped>
.cocktails {
  margin: 50px;
}
</style>
