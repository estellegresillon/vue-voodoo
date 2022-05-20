<template>
  <div class="settings-wrapper">
    <div class="select-os-wrapper">
      <Checkbox
        v-for="opt in options"
        @change="handleChange(opt)"
        :isChecked="os.includes(opt)"
        :key="opt"
        :label="opt"
      />
    </div>
    <DatePicker @change="onDateChange" :value="date" />
    <div class="legend-wrapper">
      <div class="square" />
      Highest revenue
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import Checkbox from "@/components/common/Checkbox/index.vue";
import DatePicker from "@/components/common/DatePicker/index.vue";
import { ANDROID_PLATFORM, IOS_PLATFORM } from "@/utils/constants";

export default defineComponent({
  components: {
    Checkbox,
    DatePicker,
  },
  props: {
    date: {
      default: () => [],
      type: Array,
    },
    onDateChange: {
      required: true,
      type: Function,
    },
    os: {
      default: () => [],
      type: Array,
    },
    setOs: {
      required: true,
      type: Function,
    },
  },
  data() {
    return {
      isChecked: false,
      options: [ANDROID_PLATFORM, IOS_PLATFORM],
    };
  },
  methods: {
    handleChange(opt: string) {
      const newValue = !this.os.includes(opt);

      if (newValue) {
        this.setOs([...this.os, opt]);
      } else {
        const newOsState = [...this.os].filter((el) => el !== opt);
        this.setOs(newOsState);
      }
    },
  },
});
</script>

<style scoped>
.settings-wrapper {
  align-items: center;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 5px 5px 40px rgb(23 14 94 / 8%);
  display: flex;
  padding: 30px 40px;
}

.select-os-wrapper {
  align-items: center;
  display: flex;
  width: 200px;
}

.legend-wrapper {
  align-items: center;
  display: flex;
}

.square {
  background-color: #0175ff;
  border-radius: 3px;
  height: 10px;
  margin-left: 50px;
  margin-right: 10px;
  width: 10px;
}
</style>
