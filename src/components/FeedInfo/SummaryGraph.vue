<template>
  <div>
    <h3>每日Feed获取量变化</h3>
    <div id="oneFlightWeek" style="width:700px;height:200px;"></div>
    统计平均内容长度，内容新鲜度，内容在所有feed的热度，内容数量，内容频率
  </div>
</template>

<script>
import {
  initEchart,
  buildLineChartOption,
  buildSeries,
} from "@/util/EchartsOption.js";
export default {
  name: "SummaryGraph",
  mounted() {
    this.initAllLineEchart();
  },
  methods: {
    initAllLineEchart() {
      var dayOfWk = ["4.1", "4.2", "4.3", "4.4", "4.5", "4.6", "4.7"];
      var wkSeries = [10, 32, 9, 24, 5, 22, 23];
      var seriesArray = [];
      seriesArray.push(buildSeries("wkFly", wkSeries));
      var option = buildLineChartOption(dayOfWk, seriesArray);
      initEchart(this.$echarts, "oneFlightWeek", option);

    },
  },
};
</script>

<style>
</style>