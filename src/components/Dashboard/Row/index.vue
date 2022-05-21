<template>
  <div class="row-wrapper">
    <div class="row-item">{{ rowName }}</div>
    <div v-for="country in countryNames" class="row-item" :key="country">
      <ItemContent :bestRevenue="getRoundedTotal(country) === bestRevenue">
        {{ formatNumber(getRoundedTotal(country)) }}
      </ItemContent>
    </div>

    <div class="row-item">
      <ItemContent isTotal>{{ formatNumber(total) }}</ItemContent>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, reactive, toRefs } from "vue";

import { Dictionary, Placement, ReactiveRow } from "@/types";
import { sumNumbers, sumRevenues } from "@/utils/helpers";

import { ItemContent } from "../style";

export default defineComponent({
  components: {
    ItemContent,
  },
  props: {
    countries: {
      required: true,
      type: Object as PropType<Dictionary<Placement[]>>,
    },
    countryNames: {
      required: true,
      type: Array as PropType<string[]>,
    },
    rowName: {
      required: true,
      type: String,
    },
  },
  setup(props) {
    const state: ReactiveRow = reactive({
      allRevenues: computed(() =>
        props.countryNames.map((country) =>
          sumRevenues(props.countries[country])
        )
      ),
      bestRevenue: computed(() => {
        const revenues = state.allRevenues;
        revenues.sort((a: number, b: number) => b - a);

        return Math.floor(revenues[0]);
      }),
      total: computed(() => sumNumbers(state.allRevenues)),
    });

    const getRoundedTotal = (country: string) => {
      const totalPerCountry = sumRevenues(props.countries[country]);
      return Math.floor(totalPerCountry);
    };

    const formatNumber = (number: number) => {
      if (number < 1000) {
        return `${number.toLocaleString()}k`;
      }

      const millions = Math.round(number / 1000);
      return `${millions.toLocaleString()}M`;
    };

    return { ...toRefs(state), formatNumber, getRoundedTotal };
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
