<template>
  <div class="dashboard-wrapper">
    <TableHeader :countries="sortedByCountries" />
    <Row
      v-for="game in formatedGames"
      :countries="sortGamesByCountries(game)"
      :key="game"
      :rowName="game"
    />
    <Row rowName="All games" :countries="sortedByCountries" />
  </div>
</template>

<script lang="ts">
import { groupBy } from "lodash";
import { defineComponent, PropType } from "vue";

import { Placement } from "@/types/index";

import TableHeader from "./TableHeader/index.vue";
import Row from "./Row/index.vue";

export default defineComponent({
  components: {
    TableHeader,
    Row,
  },
  props: {
    data: {
      required: true,
      type: Array as PropType<Placement[]>,
    },
  },
  computed: {
    formatedGames(): string[] {
      return Object.keys(this.games);
    },
    games() {
      return groupBy(this.data, ({ game }) => game);
    },
    sortedByCountries() {
      return groupBy(this.data, ({ country }) => country);
    },
  },
  methods: {
    sortGamesByCountries(game: string) {
      return groupBy(this.games[game], "country");
    },
  },
});
</script>

<style scoped>
.dashboard-wrapper {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 5px 5px 40px rgb(23 14 94 / 8%);
  font-size: 12px;
  margin-top: 20px;
  padding: 30px 40px;
}
</style>
