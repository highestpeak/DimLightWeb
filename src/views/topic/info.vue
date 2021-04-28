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
                style="color: #194350;width:20px;height:20px;"
              />
              {{nav.name}}
            </b-nav-item>
          </b-nav>
        </b-col>

        <b-col cols="10" >
          <!-- detail -->
          <template v-if="activeIndex===1">
            <TopicDetail :topic=topic />
          </template>
          <!-- taskFlow -->
          <template v-if="activeIndex===2">
            <!-- <TaskFlow :rss=rss /> -->
          </template>
          <template v-if="activeIndex===3">
            <!-- <SummaryGraph /> -->
          </template>
          <template v-if="activeIndex===4">
            <TopicItemPreview :topic=topic />
          </template>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import TopicDetail from "@/components/TopicInfo/TopicDetail";
// import TaskFlow from "@/components/FeedInfo/TaskFlow";
// import SummaryGraph from "@/components/FeedInfo/SummaryGraph";
import TopicItemPreview from "@/components/TopicInfo/TopicItemPreview";
export default {
  name: "topic-info",
  components:{
    TopicDetail,
    TopicItemPreview,
    // TaskFlow,
    // SummaryGraph,
  },
  data() {
    return {
      navList: [
        { name: "Back", icon: "chevron-left" },
        { name: "Detail", icon: "info-circle" },
        { name: "Task Flow", icon: "water" },
        { name: "Summary", icon: "chart-line" },
        { name: "ItemsPreview", icon: "list" },
        { name: "Events", icon: "random" },
        { name: "Actions", icon: "align-center" },
      ],
      topic: {},
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
    if (this.$route.name === "topic-info") {
      this.topic = this.$route.params.topic;
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
.menu-nav *{
  color:#333333;
}
.menu-nav:hover{
  background: #EEEEEE;
}
</style>