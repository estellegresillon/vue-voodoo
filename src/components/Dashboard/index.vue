<template>
  <div class="dashboard-wrapper">
    <TableHeader :countryNames="countryNames" />
    <Row
      v-for="game in gameNames"
      :countries="groupCountriesByGame(game)"
      :countryNames="countryNames"
      :key="game"
      :rowName="game"
    />
    <Row
      rowName="All games"
      :countries="groupedCountries"
      :countryNames="countryNames"
    />
  </div>
</template>

<script lang="ts">
import { groupBy } from "lodash";
import { computed, defineComponent, PropType, reactive, toRefs } from "vue";

import { Placement, ReactiveDashboard } from "@/types/index";

import Row from "./Row/index.vue";
import TableHeader from "./TableHeader/index.vue";

export default defineComponent({
  components: {
    Row,
    TableHeader,
  },
  props: {
    data: {
      required: true,
      type: Array as PropType<Placement[]>,
    },
  },
  setup(props) {
    const event: ReactiveDashboard = reactive({
      countryNames: computed(() => Object.keys(event.groupedCountries)),
      gameNames: computed(() => Object.keys(event.groupedGames)),
      groupedCountries: computed(() =>
        groupBy(props.data, ({ country }) => country)
      ),
      groupedGames: computed(() => groupBy(props.data, ({ game }) => game)),
    });

    const groupCountriesByGame = (game: string) =>
      groupBy(event.groupedGames[game], "country");

    return { ...toRefs(event), groupCountriesByGame };
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
