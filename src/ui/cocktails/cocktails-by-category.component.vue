<script setup lang="ts">
import { ref, computed } from "vue";
import { RouterLink } from "vue-router";

import type { CocktailShort } from "@/services/cocktail-types";
import { useWindowSize } from "@/services/helpers/window-size";
import { POSTER_WIDTH } from "@/services/helpers/cocktail-poster.size";

import Poster from "@/ui/common/cocktail-poster.vue";

export interface IProps {
  cocktails: CocktailShort[];
  title?: string;
}
const props = defineProps<IProps>();

const { windowWidth } = useWindowSize();

const firstItemIndex = ref<number>(0);
const totalCocktails = computed(() => props.cocktails.length);
const hasPreviousItems = computed(() => firstItemIndex.value > 0);

//Calculated number of items shown in a page according to screen width and poster sie
const itemsInAPage = computed(() => {
  //Reduce 100 for margin and 100 for navigation buttons
  const windowWidthReduced = windowWidth.value - 200;

  //Increase 20 for margin
  const posterWidthIncreased = POSTER_WIDTH + 20;

  return Math.floor(windowWidthReduced / posterWidthIncreased) || 1;
});

const hasMoreItemsOnRight = computed(
  () => firstItemIndex.value + itemsInAPage.value < totalCocktails.value
);

const currentPageCocktails = computed(() => {
  return props.cocktails.slice(
    firstItemIndex.value,
    firstItemIndex.value + itemsInAPage.value
  );
});

const setFirstItemShownIndex = (offset: number) => {
  if (offset < 0) {
    return;
  }
  if (offset > totalCocktails.value) {
    return;
  }

  firstItemIndex.value = offset;
};
</script>

<template>
  <div class="cocktails-by-category">
    <h2 class="title">{{ title }}</h2>

    <div class="cocktails">
      <div class="navigation">
        <div
          class="left"
          :class="{
            disabled: !hasPreviousItems,
          }"
          @click.stop="setFirstItemShownIndex(firstItemIndex - itemsInAPage)"
        >
          <v-icon size="x-large" icon="mdi-chevron-left"></v-icon>
        </div>
      </div>

      <div class="cocktail">
        <div
          class="cocktail-card"
          v-for="cocktail in currentPageCocktails"
          :key="cocktail.idDrink"
        >
          <RouterLink
            :to="`/cocktail/${cocktail.idDrink}`"
            style="text-decoration: none; color: inherit"
          >
            <Poster :src="cocktail.strDrinkThumb" :footer="cocktail.strDrink" />
          </RouterLink>
        </div>
      </div>

      <div class="navigation">
        <div
          class="right"
          :class="{
            disabled: !hasMoreItemsOnRight,
          }"
        >
          <v-icon
            size="x-large"
            icon="mdi-chevron-right"
            @click.stop="
              () => setFirstItemShownIndex(firstItemIndex + itemsInAPage)
            "
          ></v-icon>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.cocktails-by-category {
  margin-bottom: 50px;

  .title {
    margin: 20px;
    color: violet;
  }

  .cocktails {
    display: flex;
    flex-direction: row;
    justify-content: left;

    .navigation {
      display: flex;
      justify-content: center;
      align-items: center;

      .left,
      .right {
        width: 50px;
        cursor: pointer;

        &.disabled {
          pointer-events: none;
          opacity: 0.4;
        }
      }
    }
  }

  .cocktail {
    display: flex;
    flex-direction: row;

    .cocktail-card {
      margin: 10px;
    }
  }
}
</style>
