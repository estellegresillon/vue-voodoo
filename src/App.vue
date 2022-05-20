<template>
  <ThemeProvider><Home /></ThemeProvider>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ThemeProvider } from "vue3-styled-components";

import Home from "./components/index.vue";

export default defineComponent({
  components: {
    Home,
    ThemeProvider,
  },
});
</script>

<style>
@import "@/assets/styles/base.css";
</style>
