<template>
  <div class="app-wrapper">
    <h1>Monetisation Dashboard</h1>
    <p>Displays revenues per game and country in K€ in a specific period.</p>
    <Settings :date="date" :onDateChange="setDate" :os="os" :setOs="setOs" />
    <p v-if="!hasFilteredData" style="margin: 30px">
      Select at least one platform.
    </p>
    <div v-else>
      <Dashboard :data="filteredData" />
    </div>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import { Dayjs } from "dayjs";
import { groupBy } from "lodash";
import {
  computed,
  defineComponent,
  onMounted,
  reactive,
  toRefs,
  watch,
} from "vue";

import { Placement, ReactiveRoot } from "@/types/index";
import {
  API_OPTIONS,
  DEFAULT_DATE_PERIOD,
  IOS_PLATFORM,
} from "@/utils/constants";
import { formatApiDate } from "@/utils/helpers";

import Dashboard from "./Dashboard/index.vue";
import Settings from "./Settings/index.vue";

export default defineComponent({
  components: {
    Dashboard,
    Settings,
  },
  setup() {
    onMounted(() => fetchData(state.date));

    const state: ReactiveRoot = reactive({
      data: [],
      date: DEFAULT_DATE_PERIOD,
      filteredData: [],
      hasFilteredData: computed(() => state.filteredData?.length > 0),
      os: [IOS_PLATFORM],
    });

    watch(
      () => [...state.date],
      (currentValue: Dayjs[]) => fetchData(currentValue)
    );

    watch(
      () => [...state.os],
      (currentValue: string[]) => filterData(state.data, currentValue)
    );

    const filterData = (data: Placement[], os: string[]) => {
      const sortedByOs = groupBy(data, ({ platform }) => platform);
      let newFilteredData: Placement[] = [];

      os.forEach((os) => {
        const data = newFilteredData.concat(sortedByOs[os]);
        newFilteredData = data;
      });

      state.filteredData = newFilteredData;
    };

    const getUrl = (date: Dayjs[]): string =>
      `${process.env.VUE_APP_API_URL}monetizations?start=${formatApiDate(
        0,
        date
      )}&end=${formatApiDate(
        1,
        date
      )}&dimensions=game,country,os&aggregates=revenue`;

    const fetchData = (date: Dayjs[]) => {
      axios.get(getUrl(date), API_OPTIONS).then((response) => {
        state.data = response.data;
        filterData(response.data, state.os);
      });
    };

    const setDate = (date: Dayjs[]) => {
      state.date = date;
    };

    const setOs = (os: string[]) => {
      state.os = os;
    };

    return { ...toRefs(state), setDate, setOs };
  },
});
</script>

<style scoped>
.app-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 50px;
  width: 100%;
}

h1 {
  font-weight: bolder;
  margin-bottom: 15px;
}

p {
  margin-bottom: 30px;
}
</style>
