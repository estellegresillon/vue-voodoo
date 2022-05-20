<template>
  <div class="header-wrapper">
    <div class="header-item">Game name</div>
    <div v-for="country in countryNames" class="header-item" :key="country">
      {{ country }}
    </div>
    <div class="header-item">Total</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  props: {
    countryNames: {
      required: true,
      type: Array as PropType<String[]>,
    },
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
