<template>
  <div>
    <!-- button group -->
    <b-button-group style="margin: 10px 0px" size="sm">
      <b-button variant="outline-secondary" href="#" @click="fetchTopicNow">
        <font-awesome-icon
          :icon="['fas', 'download']"
          size="lg"
          style="color: #000"
        />
        Fetch Now
      </b-button>
      <b-button variant="outline-secondary" href="#" @click="clearTopicContentItem">
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

    <b-button-group style="margin: 10px 0px;display: block;" size="sm">
      <b-button variant="outline-secondary" href="#" 
        v-for="(rssSource,index) in sourceList"
        :key="index"
        @click="clickRssSource(rssSource.id)">
        {{rssSource.name}}
      </b-button>
    </b-button-group>

    <hr>

    <!-- button group -->
    <b-button-group style="margin: 10px 0px" size="sm">
      <b-button variant="outline-secondary" href="#" @click="fetchTopicRemoveDupli">
        <font-awesome-icon
          :icon="['fas', 'eraser']"
          size="lg"
          style="color: #000"
        />
        内容去重
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
        :imgSrc = item.rssSource.image
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
import { getTopicContentItem,clearTargetTopicContentItem,fetchTopicNow } from "@/util/request/contentItemRequest";
import { topicDuplicateRemove } from "@/util/request/tmpProcessRequest";
export default {
  name: "FeedItemPreview",
  components: {
    FeedItemCard
  },
  props: {
    topic: {
      type: Object,
    }
  },
  data(){
    return {
      previewNum: 20,
      originResponse: {},
      // itemList: [],
      isBusy: false,
      sourceSelectedId: 0,
      isDupliRemove: false,
    }
  },
  computed: {
    itemTotalNum: function() {
      if (this.itemList==null) {
        return 0;
      }
      return this.itemList.length;
    },
    sourceList: function () {
      var nextSourceList = []
      nextSourceList.push({
        name: "All In Topic",
        id: 0
      })
      for (const index in this.originResponse.rssSource) {
        if (Object.hasOwnProperty.call(this.originResponse.rssSource, index)) {
          const rssSource = this.originResponse.rssSource[index];
          nextSourceList.push({
            name: rssSource.titleUser,
            id: rssSource.id
          })
        }
      }
      return nextSourceList
    },
    itemList: function () {
      if(this.isDupliRemove) {
        return this.parseDupliData()
      }
      if(this.sourceSelectedId===0){
        return this.originResponse.contentItem
      }else{
        var tmpItemList = this.originResponse.contentItem
        var rssWithItsItems = new Set(this.originResponse.rssWithItsItems[this.sourceSelectedId])
        var currItemList = []
        for (let index = 0; index < tmpItemList.length; index++) {
          const item = tmpItemList[index];
          if(rssWithItsItems.has(item.id)) {
            currItemList.push(item)
          }
        }
        return currItemList
      }
    },
  },
  mounted() {
    this.isBusy = true
    getTopicContentItem(this.topic.id,this.previewNum, this.onListFetchSucceed);
  },
  methods: {
    fetchTopicNow() {
      this.isBusy = true
      // 下面这个调用有依赖顺序
      getTopicContentItem(this.topic.id,this.previewNum, this.onListFetchSucceed);
    },
    clearTopicContentItem() {
      clearTargetTopicContentItem(this.topic.id, this.onEmitFetchSucceed)
    },
    onListFetchSucceed(responseData) {
      this.originResponse = responseData
      // var contentList = responseData.contentItem
      // this.itemList = contentList
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
          title: 'succeed new/update topic',
          variant: 'success',
          solid: true
        })
        getTopicContentItem(this.topic.id,this.previewNum, this.onListFetchSucceed);
      }
    },
    fetchTopicRemoveDupli() {
      this.isBusy = true
      topicDuplicateRemove(this.topic.id, this.onFetchTopicRemoveDupliSucceed);
    },
    onFetchTopicRemoveDupliSucceed(responseData){
      console.log(responseData)
      this.originResponse = responseData
      this.isDupliRemove = true
      this.isBusy = false
    },
    parseDupliData() {
      // :imgSrc = item.rssSource.image
      // :itemTitle = item.titleParse
      // :itemDesc = item.descParse
      // :extraInfo = item.extraInfo
      var nextItemList = []
      var remainContent = this.originResponse.remainContent
      var originContent = this.originResponse.originContent
      var duplisContent = this.originResponse.duplisContent
      for (const originId in originContent) {
        if (originId in remainContent) {
          const originItem = originContent[originId];
          nextItemList.push(originItem)
        } 
      }
      for (const dupliId in duplisContent) {
        if (Object.hasOwnProperty.call(duplisContent, dupliId)) {
          const dupliItemList = duplisContent[dupliId];
          
          var extraInfo = "重复的新闻："
          for (let index = 0; index < dupliItemList.length; index++) {
            const dupliItem = dupliItemList[index];
            extraInfo += index + ":" + originContent[dupliItem].titleParse
          }

          var dupliItem = originContent[dupliId]
          dupliItem.extraInfo = extraInfo
          nextItemList.push(dupliItem);
        }
      }

      return nextItemList

    },
    clickRssSource(rssId) {
      this.sourceSelectedId = rssId
    },
  }
};
</script>

<style>
</style>