<template>
  <div style="margin-top:10px;">
    <div v-if="totalRows==0">
      <b-alert show variant="danger">当前没有Events</b-alert>
    </div>
    <div v-else>
      <b-button-group style="margin: 10px 0px" size="sm">
        <b-button variant="outline-secondary" href="#" @click="clearEvents()">
          <font-awesome-icon
            :icon="['fas', 'trash-alt']"
            size="lg"
            style="color: #000"
          />
          Clear Events
        </b-button>
      </b-button-group>
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
      <!--per page-->
      <b-pagination
        v-model="currentPage"
        :total-rows="totalRows"
        :per-page="perPage"
        align="center"
        size="sm"
      ></b-pagination>
      <b-table
        striped
        hover
        responsive
        small
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
        <template #cell(jsonMsg)="data">
          <p class="json-msg">
            {{ data.value }}
          </p>
        </template>
        <template #cell(hasError)="data" >
          <div style="text-align:center">
            <b-badge v-if="data.value === true" variant="danger" > Y </b-badge>
            <b-badge v-else variant="success" > N </b-badge>
          </div>
        </template>
        <!-- Optional default data cell scoped slot -->
        <template #cell()="data">
          <p style="white-space: nowrap;">
            {{ data.value }}
          </p>
        </template>
      </b-table>
      <b-pagination
        v-model="currentPage"
        :total-rows="totalRows"
        :per-page="perPage"
        align="center"
        size="sm"
      ></b-pagination>
    </div>
  </div>
</template>

<script>
import { getEventsList,clearEvents } from "@/util/request";
export default {
  name: "Events",
  data(){
    return {
      pageOptions: [5, 20, 50, { value: 100, text: "Show a lot" }],
      perPage: 20,
      currentPage: 1,
      isBusy: false,
      items: [],
      originItems: [],
    }
  },
  computed:{
    totalRows: function(){
      return this.items.length
    },
    fields: function(){
      if(this.totalRows<=0){
        return []
      }
      var itemSample = this.items[0]
      var fieldList = []
      for (const itemKey in itemSample) {
        if(itemKey==="updateTime"){
          continue
        }
        if(itemKey==="JsonMsg"){
          fieldList.push({
             key: itemKey, sortable: false
          })
        }else{
          fieldList.push({
             key: itemKey, sortable: false
          })
        }
      }
      return fieldList
    }
  },
  mounted() {
    this.isBusy = true
    getEventsList(this.onEventsListFetchSucceed);
  },
  methods:{
    onEventsListFetchSucceed(responseData){
      var eventList = responseData.content
      this.isBusy = false
      this.originItems = eventList
      this.items = eventList
    },
    clearEvents(){
      this.isBusy = true
      var vueApp = this
      clearEvents(function(responseData){
        // 清除成功
        vueApp.isBusy = false
        vueApp.items = null
      })
    }
  }
};
</script>

<style>
.json-msg{
  width: 30ch;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>