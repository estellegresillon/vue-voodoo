<template>
  <div class="row-wrapper">
    <div class="row-item">{{ rowName }}</div>
    <div v-for="country in formatedCountries" class="row-item" :key="country">
      <ItemContent :bestRevenue="getRoundedTotal(country) === bestRevenue">
        {{ getRoundedTotal(country) }}k
      </ItemContent>
    </div>

    <div class="row-item">
      <ItemContent isTotal>{{ total }}k</ItemContent>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

import { Placement } from "@/types/index";
import { sumNumbers, sumRevenues } from "@/utils/helpers";

import { ItemContent } from "../style";

export default defineComponent({
  components: {
    ItemContent,
  },
  props: {
    countries: {
      required: true,
      type: Object as PropType<Placement[]>,
    },
    rowName: {
      required: true,
      type: String,
    },
  },
  computed: {
    allRevenues() {
      return this.formatedCountries.map((country) =>
        sumRevenues(this.countries[country])
      );
    },
    bestRevenue() {
      const revenues = this.allRevenues;
      revenues.sort((a: number, b: number) => b - a);

      return Math.floor(revenues[0]);
    },
    formatedCountries() {
      return Object.keys(this.countries);
    },
    total() {
      return sumNumbers(this.allRevenues);
    },
  },
  methods: {
    getRoundedTotal(country: string) {
      const perCountry = sumRevenues(this.countries[country]);
      return Math.floor(perCountry);
    },
  },
});
</script>

<style scoped>
.row-wrapper {
  display: flex;
  padding: 20px;
}

.row-item {
  align-items: center;
  display: flex;
  justify-content: center;
  width: calc(100% / 8);
}
</style>
