<template>
  <div class="checkbox-wrapper">
    <input
      @change="onChange"
      :checked="isChecked"
      :id="label"
      type="checkbox"
    />
    <label>{{ label }}</label>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    isChecked: {
      type: Boolean,
    },
    label: {
      type: String,
    },
    onChange: {
      type: Function,
    },
  },
});
</script>

<style scoped>
.checkbox-wrapper {
  font-size: 14px;
  margin-right: 15px;
}

label {
  margin-left: 5px;
}

input {
  cursor: pointer;
}
</style>
