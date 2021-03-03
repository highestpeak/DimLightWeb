<template>
  <div>
    <ViewGroup
      :iconOption="false"
      :viewOptions="viewGroup"
      @change-view="changeNewFeedView"
      style="margin: 10px 0px"
    >
    </ViewGroup>

    <div v-if="currViewIndex === 0">
      <h2 style="margin: 10px 0px">New Feed</h2>
      <NewFeedInputForm />
      <hr />
    </div>

    <div v-if="currViewIndex === 1"><NewFeedJsonForm /></div>

    <div v-if="currViewIndex === 2"><NewFeedRSSHubForm /></div>

    <div v-if="currViewIndex === 3"><NewFeedOPMLForm /></div>
  </div>
</template>

<script>
import NewFeedInputForm from "@/components/FeedNew/NewFeedInputForm";
import NewFeedJsonForm from "@/components/FeedNew/NewFeedJsonForm";
import NewFeedOPMLForm from "@/components/FeedNew/NewFeedOPMLForm";
import NewFeedRSSHubForm from "@/components/FeedNew/NewFeedRSSHubForm";
import ViewGroup from "@/components/ViewGroup";
export default {
  name: "feed-new",
  components: {
    NewFeedInputForm,
    NewFeedJsonForm,
    NewFeedOPMLForm,
    NewFeedRSSHubForm,
    ViewGroup,
  },
  data() {
    return {
      viewGroup: [
        { index: 0, state: true, text: "One New Feed" }, // 只输入一个
        { index: 1, state: false, text: "Json New Feed" }, // 输入 json 格式的 一个 或者 一个列表
        { index: 2, state: false, text: "RSSHub Text" }, // rsshub 相关的
        { index: 3, state: false, text: "OPML Text" }, // opml相关的
      ],
      currViewIndex: 0,
    };
  },
  methods: {
    // eslint-disable-next-line no-unused-vars
    changeNewFeedView: function (index) {
      this.currViewIndex = index;
    },
  },
};
</script>

<style>
</style>