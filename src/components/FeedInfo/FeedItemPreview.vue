<template>
  <div>
    <!-- button group -->
    <b-button-group style="margin: 10px 0px" size="sm">
      <b-button variant="outline-secondary" href="#" @click="fetchRssNow">
        <font-awesome-icon
          :icon="['fas', 'download']"
          size="lg"
          style="color: #000"
        />
        Fetch Now
      </b-button>
      <b-button variant="outline-secondary" href="#" @click="clearRssContentItem">
        <font-awesome-icon
          :icon="['fas', 'trash-alt']"
          size="lg"
          style="color: #000"
        />
        Clear all
      </b-button>
    </b-button-group>
    <b-form-input v-model="previewNum" placeholder="FetchNum" style="margin: 10px 0px;float:right;width:auto" type="number"></b-form-input>
    <!-- button group -->
    <b-overlay :show="isBusy" rounded="sm">
      <b-alert :show="itemTotalNum===0" variant="danger" style="margin:10px 0px;">当前没有Item</b-alert>

      <!-- <FeedItemCard /> -->
      <FeedItemCard 
        v-for="(item,index) in itemList"
        :key="index" 
        :imgSrc = rss.image
        :itemTitle = item.titleParse
        :itemDesc = item.descParse
        style="margin:10px 0px;" 
        />
    </b-overlay>
  </div>
</template>

<script>
import FeedItemCard from "@/components/FeedInfo/FeedItemCard";
import { getRssContentItem,clearTargetRssContentItem,fetchRssContentItemNow } from "@/util/request/contentItemRequest";
export default {
  name: "FeedItemPreview",
  components: {
    FeedItemCard
  },
  props: {
    rss: {
      type: Object,
    }
  },
  data(){
    return {
      previewNum: 20,
      itemList: [],
      isBusy: false,
    }
  },
  computed: {
    itemTotalNum: function() {
      if (this.itemList==null) {
        return 0;
      }
      return this.itemList.length;
    }
  },
  mounted() {
    this.isBusy = true
    getRssContentItem(this.rss.id,this.previewNum, this.onListFetchSucceed);
  },
  methods: {
    fetchRssNow() {
      this.isBusy = true
      // 下面这个调用有依赖顺序
      fetchRssContentItemNow(this.rss.id, this.onEmitFetchSucceed);
    },
    clearRssContentItem() {
      clearTargetRssContentItem(this.rss.id, this.onEmitFetchSucceed)
    },
    onListFetchSucceed(responseData) {
      var contentList = responseData
      this.itemList = contentList
      this.isBusy = false
    },
    onEmitFetchSucceed(responseData) {
      console.log(responseData);
      if (responseData.errorMsg!=null && responseData.errorMsg.length!=0 ) {
        this.$bvToast.toast(responseData.errorMsg, {
          title: 'get failed',
          variant: 'danger',
          solid: true
        })
      } else {
        this.$bvToast.toast('succeed', {
          title: 'succeed new/update rss',
          variant: 'success',
          solid: true
        })
        getRssContentItem(this.rss.id,this.previewNum, this.onListFetchSucceed);
      }
    }
  }
};
</script>

<style>
</style>