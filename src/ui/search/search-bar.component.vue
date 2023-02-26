<script setup lang="ts">
import { ref, watch } from "vue";

import SearchStorage from "@/services/storage/search.storage";

// Search
let _timerId: any = 0;
const search = ref<string>("");

const fetchSearchResultsDebounced = () => {
  // cancel pending call
  clearTimeout(_timerId);

  // delay new call 500ms
  _timerId = setTimeout(() => {
    SearchStorage.searchCocktails(search.value);
  }, 500);
};

watch(
  () => search.value,
  (value) => {
    if (value) {
      fetchSearchResultsDebounced();
    }
  }
);
</script>

<template>
  <v-text-field
    density="compact"
    single-line
    type="text"
    variant="outlined"
    v-model="search"
    clearable
    placeholder="Search for a cocktail"
    @click:clear="() => SearchStorage.closeSearch()"
    prepend-icon="mdi-magnify"
  >
  </v-text-field>
</template>
