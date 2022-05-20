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
import { defineComponent } from "vue";

import { Placement } from "@/types/index";
import {
  API_OPTIONS,
  DEFAULT_DATE_PERIOD,
  IOS_PLATFORM,
} from "@/utils/constants";
import { formatApiDate, parseDate } from "@/utils/helpers";

import Dashboard from "./Dashboard/index.vue";
import Settings from "./Settings/index.vue";

export default defineComponent({
  components: {
    Dashboard,
    Settings,
  },
  data() {
    return {
      data: [] as Placement[],
      date: parseDate(DEFAULT_DATE_PERIOD) as Dayjs[],
      filteredData: [] as Placement[],
      os: [IOS_PLATFORM] as string[],
    };
  },
  created() {
    this.fetchData(this.date);
  },
  computed: {
    hasFilteredData(): boolean {
      return this.filteredData?.length > 0;
    },
  },
  watch: {
    date(newValue: Dayjs[]) {
      this.fetchData(newValue);
    },
    os(newValue: string[]) {
      this.filterData(this.data, newValue);
    },
  },
  methods: {
    fetchData(date: Dayjs[]) {
      axios.get(this.getUrl(date), API_OPTIONS).then((response) => {
        this.data = response.data;
        this.filterData(response.data, this.os);
      });
    },
    filterData(data: Placement[], os: string[]) {
      const sortedByOs = groupBy(data, ({ platform }) => platform);
      let newFilteredData: Placement[] = [];

      os.forEach((os) => {
        const data = newFilteredData.concat(sortedByOs[os]);
        newFilteredData = data;
      });

      this.filteredData = newFilteredData;
    },
    getUrl(date: Dayjs[]): string {
      return `${process.env.VUE_APP_API_URL}monetizations?start=${formatApiDate(
        0,
        date
      )}&end=${formatApiDate(
        1,
        date
      )}&dimensions=game,country,os&aggregates=revenue`;
    },
    setDate(date: Dayjs[]) {
      this.date = date;
    },
    setOs(os: string[]) {
      this.os = os;
    },
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
