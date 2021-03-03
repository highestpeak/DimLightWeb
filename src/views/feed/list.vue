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
      label="Filter"
      label-for="filter-input"
      label-cols-sm="3"
      label-align-sm="right"
      label-size="sm"
    >
      <b-input-group size="sm">
        <b-form-input
          id="filter-input"
          v-model="filter"
          type="search"
          placeholder="Type to Search"
        />
        <b-input-group-append>
          <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
        </b-input-group-append>
      </b-input-group>
    </b-form-group>
    <b-form-group
      label="Filter On"
      description="Leave all unchecked to filter on all data. Start-task used true and false to filter"
      label-cols-sm="3"
      label-align-sm="right"
      label-size="sm"
    >
      <b-form-checkbox-group v-model="filterCols" class="mt-1">
        <b-form-checkbox
          v-for="(field, index) in fieldsCanFilter"
          :key="index"
          :value="field"
        >
          {{ field }}
        </b-form-checkbox>
      </b-form-checkbox-group>
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
      :filter="filter"
      :filter-included-fields="filterCols"
      @filtered="onFiltered"
      :busy="isBusy"
      :items="items"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
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
import { getFeedList, delRSSSource, rssJsonExport, rssOpmlExport } from "@/util/request";
export default {
  name: "feed-list",
  data() {
    return {
      filter: null,
      // filterCols 中的值是 fields 的 key
      filterCols: [],
      pageOptions: [5, 20, 50, { value: 100, text: "Show a lot" }],
      perPage: 20,
      currentPage: 1,
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
      fieldsCanFilter: ["titleParse", "titleUser", "generator", "tags", "fetchAble"],
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
    };
  },
  computed:{
    totalRows: function(){
      return this.items.length
    }
  },
  mounted() {
    this.isBusy = true
    getFeedList(this.onFeedListFetchSucceed);
  },
  methods: {
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.currentPage = 1;
    },
    onFeedListFetchSucceed(responseData){
      var feedList = responseData.content
      // console.log(feedList);
      feedList.forEach(function(obj) {
        obj.tags = obj.rssSourceTags.map(a => a.name) ;
        delete obj.rssSourceTags;
        obj.topics = obj.rssTopics.map(a => a.name) ;
        delete obj.rssTopics;
      });
      this.isBusy = false
      this.items = feedList
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