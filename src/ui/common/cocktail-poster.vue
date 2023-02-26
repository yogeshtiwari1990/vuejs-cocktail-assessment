<script setup lang="ts">
import {
  POSTER_HEIGHT,
  POSTER_WIDTH,
} from "@/services/helpers/cocktail-poster.size";

export interface IProps {
  src?: string;
  footer: string;
}
defineProps<IProps>();
</script>

<template>
  <div
    :style="{
      width: `${POSTER_WIDTH}px`,
      height: `${POSTER_HEIGHT}px`,
    }"
  >
    <v-card>
      <v-img v-if="!!src" :src="src" :alt="footer" cover>
        <template v-slot:placeholder>
          <div class="d-flex align-center justify-center fill-height">
            <v-progress-circular
              indeterminate
              color="grey-lighten-4"
            ></v-progress-circular>
          </div>
        </template>
      </v-img>
      <v-card-title class="text-body-2">
        {{ footer }}
      </v-card-title>
    </v-card>
  </div>
</template>

<style lang="scss" scoped>
.name {
  background-color: lightcoral;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: x-large;
}
</style>
