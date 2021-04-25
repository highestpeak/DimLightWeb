<template>
  <div>
    <h2 style="margin: 10px 0px">Your Feeds</h2>
    <!-- button group -->
    <b-button-group style="margin: 10px 0px" size="sm">
      <b-button variant="outline-secondary" href="/feed/new">
        <font-awesome-icon
          :icon="['fas', 'plus']"
          size="lg"
          style="color: #000"
        />
        New Feed
      </b-button>
      <b-button variant="outline-secondary" href="#" @click="exportJson">
        <font-awesome-icon
          :icon="['fas', 'download']"
          size="lg"
          style="color: #000"
        />
        Export Json
      </b-button>
      <b-button variant="outline-secondary" href="#" @click="exportOpml">
        <font-awesome-icon
          :icon="['fas', 'download']"
          size="lg"
          style="color: #000"
        />
        Export Opml
      </b-button>
    </b-button-group>
    <!-- button group -->
    <hr />

    <!-- filter -->
    <b-form-group
      label="Search"
      label-for="search-input"
      label-cols-sm="3"
      label-align-sm="right"
      label-size="sm"
    >
      <b-input-group size="sm">
        <b-form-input
          id="search-input"
          v-model="search"
          type="search"
          placeholder="Type to Search"
        />
      </b-input-group>
    </b-form-group>
    <!-- filter -->

    <!--per page-->
    <b-form-group
      label="Per page"
      label-for="per-page-select"
      label-cols-sm="6"
      label-cols-md="4"
      label-cols-lg="3"
      label-align-sm="right"
      label-size="sm"
    >
      <b-form-select
        id="per-page-select"
        v-model="perPage"
        :options="pageOptions"
        size="sm"
      ></b-form-select>
    </b-form-group>
    <b-pagination
      v-if="totalRows!=0"
      v-model="currentPage"
      :total-rows="totalRows"
      :per-page="perPage"
      align="right"
      size="sm"
    ></b-pagination>
    <!--per page-->

    <b-table
      striped
      hover
      responsive
      small
      :busy="isBusy"
      :items="items"
      :fields="fields"
      style="margin-bottom: 50px"
    >
      <template #table-busy>
        <div class="text-center text-danger my-2">
          <b-spinner class="align-middle"></b-spinner>
          <strong>&nbsp;&nbsp;Loading...</strong>
        </div>
      </template>

      <template #cell(image)="data">
        <b-avatar
          :src="data.value"
          size="2rem"
        ></b-avatar>
      </template>

      <!-- type tag -->
      <template #cell(tags)="data">
        <b-badge
          v-for="(type, index) in data.value"
          :key="index"
          :variant="badgeVariantArray[index % badgeVariantArray.length]"
          style="margin-right: 2px"
        >
          {{ type }}
        </b-badge>
      </template>

      <!-- type topic -->
      <template #cell(topics)="data">
        <b-badge
          v-for="(type, index) in data.value"
          :key="index"
          :variant="badgeVariantArray[index % badgeVariantArray.length]"
          style="margin-right: 2px"
        >
          {{ type }}
        </b-badge>
      </template>

      <template #cell(fetchAble)="data" >
        <div style="text-align:center">
          <b-badge v-if="data.value === true" variant="success" > Y </b-badge>
          <b-badge v-else variant="danger" > N </b-badge>
        </div>
      </template>
      <!-- eslint-disable-next-line no-unused-vars -->
      <template #cell(operate)="data">
        <b-dropdown text="Action" size="sm" variant="outline-secondary">
          <b-dropdown-item href="#" @click="infoRssSource(data)">
            <font-awesome-icon :icon="['fas', 'info']" fixed-width style="width:20px"/>
            info
          </b-dropdown-item>
          <b-dropdown-item href="#" @click="editRssSource(data)">
            <font-awesome-icon :icon="['fas', 'pen']" fixed-width />
            edit
          </b-dropdown-item>
          <b-dropdown-item href="#" @click="delRssSource(data)">
            <font-awesome-icon
              :icon="['fas', 'times']"
              fixed-width
              style="color: #91091e"
            />
            delete
          </b-dropdown-item>
        </b-dropdown>
      </template>

      <!-- Optional default data cell scoped slot -->
      <template #cell()="data">
        <p style="white-space: nowrap;">
          {{ data.value }}
        </p>
      </template>
    </b-table>

    <b-pagination
      v-if="totalRows!=0"
      v-model="currentPage"
      :total-rows="totalRows"
      :per-page="perPage"
      align="right"
      size="sm"
    ></b-pagination>
    <div v-if="totalRows==0">
      <b-alert show variant="danger">当前没有Feed</b-alert>
    </div>
  </div>
</template>

<script>
import { getFeedList, delRSSSource, rssJsonExport, rssOpmlExport, rssSearchContent } from "@/util/request/rssRequest";
export default {
  name: "feed-list",
  data() {
    return {
      search: "",
      pageOptions: [5, 20, 50, { value: 100, text: "Show a lot" }],
      perPage: 20,
      currentPage: 1,
      totalRows: 0,
      // table
      isBusy: false,
      fields: [
        { key: "id", sortable: false },
        { key: "image", sortable: false , tdClass: 'imagetd'},
        // { key: "titleParse", sortable: true },
        { key: "titleUser", sortable: true , tdClass: 'titleUsertd'},
        // { key: "generator", sortable: true },
        // { key: "descParse", sortable: false },
        // { key: "descUser", sortable: false },
        { key: "tags", sortable: false },
        { key: "topics", sortable: false },
        { key: "fetchAble", sortable: false , tdClass: 'fetchabletb'},
        { key: "operate", sortable: false },
      ],
      badgeVariantArray: [
        "primary",
        "secondary",
        "success",
        "danger",
        "warning",
        "info",
        "light",
        "dark",
      ],
      items: [
      ],
      timeout: null,
    };
  },
  watch: {
    perPage: function(newPerPage) {
      this.currentPage = 1
      this.isBusy = true
      getFeedList(0,newPerPage,this.onFeedListFetchSucceed);
    },
    currentPage: function(nextPage) {
      this.isBusy = true  
      getFeedList(nextPage-1,this.perPage,this.onFeedListFetchSucceed);
    },
    search: function(newSearchContent) {
      if (newSearchContent==="") {
        return;
      }
      // 实现input连续输入，只发一次请求
      clearTimeout(this.timeout);
      var vueApp = this
      this.timeout = setTimeout(() => {
        // console.log(newSearchContent);
        rssSearchContent(newSearchContent, vueApp.onFeedListFetchSucceed);
      }, 300);
    }
  },
  computed:{
  },
  mounted() {
    this.isBusy = true
    getFeedList(this.currentPage-1,this.perPage,this.onFeedListFetchSucceed);
  },
  methods: {
    onFeedListFetchSucceed(responseData){
      this.totalRows = responseData.totalElements
      // console.log(this.totalRows);
      var feedList = responseData.content
      // console.log(feedList);
      feedList.forEach(function(obj) {
        obj.tags = obj.mobiusTags.map(a => a.name) ;
        delete obj.mobiusTags;
        obj.topics = obj.rssMobiusTopics.map(a => a.name) ;
        delete obj.rssMobiusTopics;
      });
      // console.log(feedList);
      this.items = feedList
      this.isBusy = false
      // console.log(this.totalRows)
    },
    editRssSource(row){
      // eslint-disable-next-line no-unused-vars
      var rssSource = row.item
      this.$router.push({ name: 'feed-edit', params: { rssSource: rssSource }})
    },
    delRssSource(row){
      var rssSource = row.item
      var rssIndex = row.index
      // console.log(rssSource)
      var vueApp = this
      delRSSSource(rssSource,function() {
        vueApp.items.splice(rssIndex, 1);
      })
    },
    infoRssSource(row){
      var rssSource = row.item
      var rssIndex = row.index
      // console.log(rssSource)
      var vueApp = this
      this.$router.push({ name: 'feed-info', params: { rssSource: rssSource }})
    },
    exportJson(){
      rssJsonExport()
    },
    exportOpml(){
      rssOpmlExport()
    }
  },
};
</script>

<style>
.table-responsive {
  overflow-y: visible;
  overflow-x: visible;
}
.table th, .table td{
  vertical-align: inherit;
}
.table p{
  margin: 0;
}
.imagetd{
  width: 2rem;
}
.fetchabletb{
  width: 1rem;
}
.titleUsertd{
}
</style>