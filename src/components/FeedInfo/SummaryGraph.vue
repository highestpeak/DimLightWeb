<template>
  <div>
    <hr>
    <h5 style="text-align:center;">每日Feed获取量变化</h5>
    <div id="oneFlightWeek" style="width:700px;height:200px;margin:0 auto;"></div>
    <b-card-group deck>
      <b-card bg-variant="secondary" text-variant="white" header="平均内容长度" class="text-center">
        <b-row>
          <b-col style="margin: auto;">
            <font-awesome-icon
              :icon="['fas', 'ruler']"
              size="3x"
              style="color: #fff;"
            />
          </b-col>
          <b-col style="font-size:50px">
            1.5k
          </b-col>
        </b-row>
      </b-card>

      <b-card bg-variant="info" text-variant="white" header="内容新鲜度" class="text-center">
        <b-row>
          <b-col style="margin: auto;">
            <font-awesome-icon
              :icon="['fas', 'fan']"
              size="3x"
              style="color: #9ddfd3;"
            />
          </b-col>
          <b-col style="font-size:50px">
            85%
          </b-col>
        </b-row>
      </b-card>

      <b-card bg-variant="dark" header="内容在所有feed的热度" text-variant="white" class="text-center">
        <b-row>
          <b-col style="margin: auto;">
            <font-awesome-icon
              :icon="['fas', 'fire']"
              size="3x"
              style="color: #f21170;"
            />
          </b-col>
          <b-col style="font-size:50px">
            344
          </b-col>
        </b-row>
      </b-card>

    </b-card-group>
    <b-card-group deck style="margin-top:10px">
      <b-card bg-variant="secondary" text-variant="white" header="内容数量" class="text-center">
        <b-row>
          <b-col style="margin: auto;">
            <font-awesome-icon
              :icon="['fas', 'flag']"
              size="3x"
              style="color: #ce1f6a;"
            />
          </b-col>
          <b-col style="font-size:50px">
            67条
          </b-col>
        </b-row>
      </b-card>

      <b-card bg-variant="info" text-variant="white" header="内容频率" class="text-center">
        <b-row>
          <b-col style="margin: auto;">
            <font-awesome-icon
              :icon="['fas', 'wave-square']"
              size="3x"
              style="color: #000;"
            />
          </b-col>
          <b-col style="font-size:50px">
            20/天
          </b-col>
        </b-row>
      </b-card>

    </b-card-group>
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