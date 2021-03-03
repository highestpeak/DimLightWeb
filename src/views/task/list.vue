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
      description="Leave all unchecked to filter on all data. Corn text is wating to do to filterable"
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

      <template #cell(title)="data">
        <a :href="'/task/'+data.value.id">{{data.value.text}}</a>
      </template>

      <template #cell(autoDownload)="data">
        <b-badge v-if="data.value === true" variant="success"> YES </b-badge>
        <b-badge v-else variant="danger"> NO </b-badge>
      </template>

      <template #cell(operate)="">
        <b-dropdown text="Action" size="sm" variant="outline-secondary">
          <b-dropdown-item href="#">
            <font-awesome-icon :icon="['fas', 'pen']" size="sm" />
            edit
          </b-dropdown-item>
          <b-dropdown-item href="#">
            <font-awesome-icon
              :icon="['fas', 'times']"
              size="sm"
              style="color: #91091e"
            />
            delete
          </b-dropdown-item>
          <b-dropdown-item href="#">
            <font-awesome-icon
              :icon="['fas', 'project-diagram']"
              size="sm"
            />
            Task Flow
          </b-dropdown-item>
        </b-dropdown>
      </template>
      <!-- Optional default data cell scoped slot -->
      <template #cell()="data">
        {{ data.value }}
      </template>
    </b-table>
  </div>
</template>

<script>
import { getTaskList } from "@/util/request";
export default {
  name: "",
  data() {
    return {
      filter: null,
      // filterCols 中的值是 fields 的 key
      filterCols: [],
      pageOptions: [5, 20, 50, { value: 100, text: "Show a lot" }],
      perPage: 20,
      currentPage: 1,
      totalRows: 1,
      fieldsCanFilter: [
        "title",
        "schedule",
        "lifeCycle",
        "cacheCycle",
        "autoDownload",
        "nextEvent",
      ],
      // table
      isBusy: false,
      fields: [
        { key: "id", sortable: false },
        { key: "title", sortable: true },
        // todo: corn 需要自定义一个排序和筛选方式
        { key: "schedule", sortable: false },
        { key: "lifeCycle", sortable: false },
        { key: "cacheCycle", sortable: false },
        { key: "autoDownload", sortable: false },
        { key: "nextEvent", sortable: true },
        { key: "operate", sortable: false },
      ],
      items: [],
    };
  },
  mounted(){
    // Set the initial number of items
    this.items = getTaskList();
    this.totalRows = this.items.length;
  },
  methods: {
    /**
     * todo
     */
    collectInfoNow: function () {},
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
  },
};
</script>

<style>
</style>