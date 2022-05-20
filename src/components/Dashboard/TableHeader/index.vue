<template>
  <div class="header-wrapper">
    <div class="header-item">Game name</div>
    <div
      v-for="country in formatedCountries"
      class="header-item"
      :key="country"
    >
      {{ country }}
    </div>
    <div class="header-item">Total</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

import { Placement } from "@/types/index";

export default defineComponent({
  props: {
    countries: {
      required: true,
      type: Object as PropType<Placement[]>,
    },
  },
  data() {
    return {
      formatedCountries: Object.keys(this.countries),
    };
  },
});
</script>

<style scoped>
.header-wrapper {
  border-bottom: 1px solid #f2f2f2;
  display: flex;
  padding: 0 20px 20px 20px;
}

.header-item {
  align-items: center;
  color: #b5b6c5;
  display: flex;
  font-size: 12px;
  font-weight: bolder;
  justify-content: center;
  text-transform: uppercase;
  width: calc(100% / 8);
}
</style>
