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
    
    <hr>

    <!-- button group -->
    <b-button-group style="margin: 10px 0px" size="sm">
      <b-button variant="outline-secondary" href="#" @click="fetchRssAbstract">
        <font-awesome-icon
          :icon="['fas', 'eraser']"
          size="lg"
          style="color: #000"
        />
        摘要生成
      </b-button>
      <b-button variant="outline-secondary" href="#" @click="fetchRssTitleWordSplit">
        <font-awesome-icon
          :icon="['fas', 'eraser']"
          size="lg"
          style="color: #000"
        />
        标题分词
      </b-button>
      <b-button variant="outline-secondary" href="#" @click="fecthRssContentWordSplit">
        <font-awesome-icon
          :icon="['fas', 'eraser']"
          size="lg"
          style="color: #000"
        />
        内容分词
      </b-button>
      <b-button variant="outline-secondary" href="#" @click="fetchHtmlTagRemove">
        <font-awesome-icon
          :icon="['fas', 'eraser']"
          size="lg"
          style="color: #000"
        />
        HTML标签去除
      </b-button>
      <b-button variant="outline-secondary" href="#" @click="fetchRegxFilter">
        <font-awesome-icon
          :icon="['fas', 'eraser']"
          size="lg"
          style="color: #000"
        />
        正则过滤
      </b-button>
    </b-button-group>

    <hr>

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
        :extraInfo = item.extraInfo
        style="margin:10px 0px;" 
        />
    </b-overlay>
  </div>
</template>

<script>
import FeedItemCard from "@/components/FeedInfo/FeedItemCard";
import { getRssContentItem,clearTargetRssContentItem,fetchRssContentItemNow } from "@/util/request/contentItemRequest";
import { fetchRssAbstract,fetchRssTitleWordSplit,fecthRssContentWordSplit,fetchHtmlTagRemove,fetchRegxFilter } from "@/util/request/tmpProcessRequest";
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
      extraInfo: null
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
    },
    fetchRssAbstract() {
      var vueApp = this
      fetchRssAbstract(this.rss.id, function (responseData) {
        console.log("fetchRssAbstract");
        console.log(responseData);
        vueApp.itemList = responseData.originContentItem
        var summary = responseData.summary
        for (let index = 0; index < vueApp.itemList.length; index++) {
          const item = vueApp.itemList[index];
          item["extraInfo"] = summary[item.id]
        }
      });
    },
    fetchRssTitleWordSplit() {
      var vueApp = this
      fetchRssTitleWordSplit(this.rss.id, function (responseData) {
        console.log("fetchRssTitleWordSplit");
        console.log(responseData);
        vueApp.itemList = responseData.originContentItem
        var wordSegment = responseData.wordSegment
        for (let index = 0; index < vueApp.itemList.length; index++) {
          const item = vueApp.itemList[index];
          item["extraInfo"] = wordSegment[item.id]
        }
      });
    },
    fecthRssContentWordSplit() {
      var vueApp = this
      fecthRssContentWordSplit(this.rss.id, function (responseData) {
        console.log("fecthRssContentWordSplit");
        console.log(responseData);
        vueApp.itemList = responseData.originContentItem
        var wordSegment = responseData.wordSegment
        for (let index = 0; index < vueApp.itemList.length; index++) {
          const item = vueApp.itemList[index];
          item["extraInfo"] = wordSegment[item.id]
        }
      });
    },
    fetchHtmlTagRemove() {
      var vueApp = this
      fetchHtmlTagRemove(this.rss.id, function (responseData) {
        console.log("fetchHtmlTagRemove");
        console.log(responseData);
        vueApp.itemList = responseData.originContentItem
        var descAfterTagRemove = responseData.descAfterTagRemove
        for (let index = 0; index < vueApp.itemList.length; index++) {
          const item = vueApp.itemList[index];
          item["extraInfo"] = descAfterTagRemove[item.id]
        }
      });
    },
    fetchRegxFilter() {
      var vueApp = this
      fetchRegxFilter(this.rss.id, function (responseData) {
        console.log("fetchRegxFilter");
        console.log(responseData);
        vueApp.itemList = responseData
      });
    },
    getExtraInfo(itemId) {
      return this.extraInfo[itemId]
    }
  }
};
</script>

<style>
</style>