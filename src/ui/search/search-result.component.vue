<script setup lang="ts">
import { RouterLink } from "vue-router";

import SearchStorage from "@/services/storage/search.storage";

import Poster from "@/ui/common/cocktail-poster.vue";
import ProgressComponent from "@/ui/common/progress-loader.vue";
</script>

<template>
  <div class="search-results">
    <h1 class="title">Search Results</h1>
    <div v-if="SearchStorage.isSearching.value() === true">
      <ProgressComponent />
    </div>
    <div v-else-if="SearchStorage.getSearchResults.value().length == 0">
      Ohh, seems like there are no cocktails.
    </div>
    <template v-else>
      <ul>
        <li
          v-for="cocktail in SearchStorage.getSearchResults.value()"
          :key="cocktail.idDrink"
        >
          <RouterLink
            :to="`/cocktail/${cocktail.idDrink}`"
            style="text-decoration: none; color: inherit"
          >
            <Poster :src="cocktail.strDrinkThumb" :footer="cocktail.strDrink" />
          </RouterLink>
        </li>
      </ul>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.title {
  margin: 20px;
  color: violet;
}
.search-results {
  ul {
    li {
      display: inline-block;
      margin: 10px;
    }
  }
}
</style>
