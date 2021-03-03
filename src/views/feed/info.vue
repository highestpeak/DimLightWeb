<template>
  <div style="margin:10px 0px;">
    <b-container class="bv-example-row">
      <b-row>
        <b-col cols="2">
          <b-nav vertical pills>
            <b-nav-item v-for="(nav,index) in navList" :key="index" :active="activeIndex===index"
             class="menu-nav"
             @click="activeIndex=index">
              <font-awesome-icon
                :icon="['fas', nav.icon]"
                size="lg"
                style="color: #194350"
              />
              {{nav.name}}
            </b-nav-item>
          </b-nav>
        </b-col>

        <b-col cols="10" >
          <!-- detail -->
          <template v-if="activeIndex===1">
            <FeedDetail :rss=rss />
          </template>
          <!-- taskFlow -->
          <template v-if="activeIndex===2">
            <TaskFlow :rss=rss />
          </template>
          <template v-if="activeIndex===3">
            <SummaryGraph />
          </template>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import FeedDetail from "@/components/FeedInfo/FeedDetail";
import TaskFlow from "@/components/FeedInfo/TaskFlow";
import SummaryGraph from "@/components/FeedInfo/SummaryGraph";
export default {
  name: "feed-info",
  components:{
    FeedDetail,
    TaskFlow,
    SummaryGraph
  },
  data() {
    return {
      navList: [
        { name: "Back", icon: "chevron-left" },
        { name: "Detail", icon: "info-circle" },
        { name: "Task Flow", icon: "water" },
        { name: "Summary", icon: "chart-line" },
        { name: "Logs", icon: "file-alt" },
        { name: "Events", icon: "random" },
        { name: "Actions", icon: "align-center" },
      ],
      rss: {},
      activeIndex: 1,
    };
  },
  watch:{
    activeIndex: function(newIndex){
      if(newIndex===0){
       this.$router.go(-1)
      }
    }
  },
  created() {},
  mounted() {
    if (this.$route.name === "feed-info") {
      this.rss = this.$route.params.rssSource;
    }
  },
};
</script>

<style>
.json-code-show {
  display: block;
  padding: 9.5px;
  margin: 0 0 10px;
  font-size: 13px;
  line-height: 1.428571429;
  word-break: break-all;
  word-wrap: break-word;
  color: #333333;
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.nav-pills .nav-link.active,
.nav-pills .show > .nav-link {
  background-color: #428bca !important;
}
.menu-nav:hover{
  background: #EEEEEE;
}
</style>