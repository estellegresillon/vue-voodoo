<template>
  <a-range-picker :allowClear="false" v-model:value="value" />
</template>

<script lang="ts">
import type { Dayjs } from "dayjs";
import { defineComponent, ref } from "vue";

type RangeValue = [Dayjs, Dayjs];

export default defineComponent({
  setup() {
    return {
      value: ref<RangeValue>(),
    };
  },
});
</script>
