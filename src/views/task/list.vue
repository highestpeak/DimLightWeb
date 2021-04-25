<template>
  <div>
    <h2 style="margin: 10px 0px">Your Tasks</h2>
    <!-- button group -->
    <b-button-group style="margin: 10px 0px" size="sm">
      <b-button variant="outline-secondary" href="/task/new">
        <font-awesome-icon
          :icon="['fas', 'plus']"
          size="lg"
          style="color: #000"
        />
        New Task
      </b-button>
      <b-button variant="outline-secondary" @click="collectInfoNow">
        <font-awesome-icon
          :icon="['fas', 'sync-alt']"
          size="lg"
          style="color: #000"
        />
        Collect information now
      </b-button>
    </b-button-group>
    <!-- button group -->
    <hr />

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

      <template #cell(title)="data">
        <a :href="'/task/'+data.value.id">{{data.value.text}}</a>
      </template>

      <template #cell(cacheCycle)="data">
        {{data.value}}天
      </template>

      <template #cell(autoDownload)="data">
        <b-badge v-if="data.value === true" variant="success"> YES </b-badge>
        <b-badge v-else variant="danger"> NO </b-badge>
      </template>

      <template #cell(operate)="data">
        <b-dropdown text="Action" size="sm" variant="outline-secondary">
          <b-dropdown-item href="#" @click="editTask(data)">
            <font-awesome-icon :icon="['fas', 'pen']" size="sm" />
            edit
          </b-dropdown-item>
          <b-dropdown-item href="#" @click="delTask(data)">
            <font-awesome-icon
              :icon="['fas', 'times']"
              size="sm"
              style="color: #91091e"
            />
            delete
          </b-dropdown-item>
        </b-dropdown>
      </template>
      <!-- Optional default data cell scoped slot -->
      <template #cell()="data">
        {{ data.value }}
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
      <b-alert show variant="danger">当前没有Task</b-alert>
    </div>
  </div>
</template>

<script>
import { 
  // getTaskList,
  getTask , delTask, allRssTaskFetchNow
} from "@/util/request/taskRequest";
export default {
  name: "",
  data() {
    return {
      pageOptions: [5, 20, 50, { value: 100, text: "Show a lot" }],
      perPage: 20,
      currentPage: 1,
      // table
      isBusy: false,
      fields: [
        { key: "id", sortable: false },
        { key: "name", sortable: true },
        { key: "descUser", sortable: false },
        { key: "group", sortable: false },
        { key: "schedule", sortable: false },
        { key: "cacheCycle", sortable: false },
        { key: "autoDownload", sortable: false },
        { key: "nextEvent", sortable: true },
        { key: "operate", sortable: false },
      ],
      items: [],
    };
  },
  computed:{
    totalRows: function() {
      return this.items.length
    }
  },
  mounted() {
    // Set the initial number of items
    this.isBusy = true
    getTask(this.currentPage-1,this.perPage,this.onTaskListFetchSucceed)
    // this.items = getTaskList();
    // this.totalRows = this.items.length;
  },
  methods: {
    collectInfoNow() {
      allRssTaskFetchNow(this.onTaskListFetchSucceed)
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    onTaskListFetchSucceed(responseData) {
      // console.log(responseData)
      this.items = responseData
      this.isBusy = false
    },
    editTask(row){
      // eslint-disable-next-line no-unused-vars
      var task = row.item
      this.$router.push({ name: 'task-edit', params: { task: task }})
    },
    delTask(row){
      var task = row.item
      var taskIndex = row.index
      var vueApp = this
      delTask(task,function() {
        vueApp.items.splice(taskIndex, 1);
      })
    }
  },
};
</script>

<style>
.table-responsive {
  overflow-y: visible;
  overflow-x: visible;
}
</style>