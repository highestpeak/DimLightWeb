<template>
  <div>
    <div style="margin: 20px"></div>
    <blockquote style="border-left: 5px solid #eeeeee; padding: 10px 20px">
      一个 Group 包含多个 Feed, Group 用来帮助分组并且组织信息
    </blockquote>
    <!-- button group -->
    <b-button-group style="margin: 10px 0px" size="sm">
      <b-button variant="outline-secondary" href="/feed/new">
        <font-awesome-icon
          :icon="['fas', 'plus']"
          size="lg"
          style="color: #000"
        />
        New Group
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
      description="Leave all unchecked to filter on all data"
      label-cols-sm="3"
      label-align-sm="right"
      label-size="sm"
    >
      <b-form-checkbox-group v-model="filterCols" class="mt-1">
        <b-form-checkbox
          v-for="(field, index) in fields"
          :key="index"
          :value="field.key"
        >
          {{ field.key }}
        </b-form-checkbox>
      </b-form-checkbox-group>
    </b-form-group>
    <!-- filter -->

    <b-table
      responsive
      small
      :filter="filter"
      :filter-included-fields="filterCols"
      @filtered="onFiltered"
      :busy="isBusy"
      :items="items"
      :fields="fields"
    >
      <template #table-busy>
        <div class="text-center text-danger my-2">
          <b-spinner class="align-middle"></b-spinner>
          <strong>&nbsp;&nbsp;Loading...</strong>
        </div>
      </template>

      <!-- <template #cell(name)="data">
        <b class="text-info">{{ data.value.last.toUpperCase() }}</b>
        ,
        <b>{{ data.value.first }}</b>
      </template> -->

      <!-- Optional default data cell scoped slot -->
      <template #cell()="data">
        <i>{{ data.value }}</i>
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  name: "feed-topic",
  data() {
    return {
      filter: null,
      // filterCols 中的值是 fields 的 key
      filterCols: [],
      isBusy: false,
      fields: [
        { key: "name", sortable: true },
        { key: "age", sortable: true },
        { key: "schedule", sortable: false },
        { key: "last event", sortable: true },
        { key: "events created", sortable: true },
        { key: "working?", sortable: false },
      ],
      items: [
        {
          name: {
            name: "Feed 名字",
            group: "Group 名字",
            tag: "",
          },
        },
      ],
    };
  },
  methods: {
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