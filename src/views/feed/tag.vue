<template>
  <div>
    <div style="margin: 20px"></div>
    <blockquote style="border-left: 5px solid #e84545; padding: 10px 20px;background-color:#fed049">
      一个 Tag 可以包含多个 Feed,一个 Feed 可以包含多个 Tag, Tag 用来帮助分组并且组织信息
    </blockquote>
    <!-- button group -->
    <b-button-group style="margin: 10px 0px" size="sm">
      <b-button variant="outline-secondary" href="#" @click="showNewTagModal()">
        <font-awesome-icon
          :icon="['fas', 'plus']"
          size="lg"
          style="color: #000"
        />
        New Tag
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

      <template #cell(operate)="data">
        <b-dropdown text="Action" size="sm" variant="outline-secondary">
          <b-dropdown-item href="#" @click="infoRow(data)">
            <font-awesome-icon :icon="['fas', 'info']" fixed-width style="width:20px"/>
            info
          </b-dropdown-item>
          <b-dropdown-item href="#" @click="showEditTagModal(data)">
            <font-awesome-icon :icon="['fas', 'pen']" fixed-width />
            edit
          </b-dropdown-item>
          <b-dropdown-item href="#" @click="delTag(data)">
            <font-awesome-icon
              :icon="['fas', 'times']"
              fixed-width
              style="color: #91091e"
            />
            delete
          </b-dropdown-item>
        </b-dropdown>
      </template>

      <template #cell()="data">
        <i>{{ data.value }}</i>
      </template>
    </b-table>

    <b-modal ref="new-tag-modal" hide-footer title="创建Tag">
      <div class="d-block text-center">
        <h3>创建新的Tag!</h3>
        <b-form @submit="onSubmitNewTag">
          <b-form-input
            id="name"
            v-model="newTagForm.name"
            type="text"
            placeholder="Enter name"
            required
          ></b-form-input>
          <b-form-input
            id="desc"
            v-model="newTagForm.desc"
            type="text"
            placeholder="Enter desc"
            required
          ></b-form-input>
        </b-form>
      </div>
      <b-button class="mt-3" variant="outline-primary" block  type="submit">Submit</b-button>
      <b-button class="mt-3" variant="outline-danger" block @click="hideNewTagModal">Close Me</b-button>
      <b-button class="mt-2" variant="outline-warning" block @click="toggleNewTagModal">Toggle Me</b-button>
    </b-modal>
    <b-modal ref="edit-tag-modal" hide-footer title="修改Tag">
      <div class="d-block text-center">
        <h3>修改Tag!</h3>
        <b-form @submit="onSubmitEditTag">
          <b-form-input
            id="name"
            v-model="editTagForm.name"
            type="text"
            placeholder="Enter name"
            required
          ></b-form-input>
          <b-form-input
            id="desc"
            v-model="editTagForm.desc"
            type="text"
            placeholder="Enter desc"
            required
          ></b-form-input>
        </b-form>
      </div>
      <b-button class="mt-3" variant="outline-primary" block  type="submit">Submit</b-button>
      <b-button class="mt-3" variant="outline-danger" block @click="hideEditTagModal">Close Me</b-button>
      <b-button class="mt-2" variant="outline-warning" block @click="toggleEditTagModal">Toggle Me</b-button>
    </b-modal>
  </div>
</template>

<script>
import {newTag, updateTag, delTag, getTags} from "@/util/request/tagRequest";
export default {
  name: "feed-tag",
  data() {
    return {
      filter: null,
      // filterCols 中的值是 fields 的 key
      filterCols: [],
      isBusy: false,
      items: [],
      newTagForm: {name:"",desc:""},
      editTagForm: {id:-1,name:"",desc:""}
    };
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
        fieldList.push({
           key: itemKey, sortable: false
        })
      }

      fieldList.push( { key: "operate", sortable: false })

      return fieldList
    }
  },
  mounted(){
    this.getTagsList()
  },
  methods: {
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    onSubmitNewTag(){
      this.newTag(this.newTagForm.name,this.newTagForm.desc)
    },
    newTag(name,desc){
      var vueApp = this
      newTag({ name: name, desc: desc}, function (responseData) {
        // 要返回创建的Tag
        var newTag = responseData
        vueApp.$forceUpdate();
      })
    },
    getTagsList(){
      this.isBusy = true
      getTags(null, this.onTagsListFetchSucceed)
    },
    delTag(row){
      var rowItem = row.item
      var rowIndex = row.index
      var vueApp = this
      delTag({ name: rowItem.name, id: rowItem.id}, function (responseData) {
        if(responseData.messages.length == 0){
          vueApp.items.splice(rowIndex, 1);
        }else{
          // 发生错误
          var variant = null
          vueApp.$bvToast.toast("Toast body content", {
            title: `Variant ${variant || "default"}`,
            variant: variant,
            solid: true,
          });
        }
      })
    },
    onSubmitEditTag(){
      this.editTag(this.editTagForm.id,this.editTagForm.name,this.editTagForm.desc)
    },
    editTag(id, name,desc){
      var vueApp = this
      updateTag({ id:id, name: name, desc: desc}, function (responseData) {
        // 要返回创建的Tag
        vueApp.$forceUpdate();
      })
    },
    onTagsListFetchSucceed(responseData){
      // console.log(responseData)
      var tagList = responseData.content
      tagList.forEach(function(obj) {
        delete obj.rssSources;
        delete obj.rssContentItems;
      });
      this.items = tagList
      this.isBusy = false
    },
    showNewTagModal() {
      this.$refs['new-tag-modal'].show()
    },
    hideNewTagModal() {
      this.$refs['new-tag-modal'].hide()
    },
    toggleNewTagModal() {
      // We pass the ID of the button that we want to return focus to
      // when the modal has hidden
      this.$refs['new-tag-modal'].toggle('#toggle-btn')
    },
    showEditTagModal(row) {
      // console.log(row);
      this.editTagForm = row.item
      this.$refs['edit-tag-modal'].show()
    },
    hideEditTagModal() {
      this.$refs['edit-tag-modal'].hide()
    },
    toggleEditTagModal() {
      // We pass the ID of the button that we want to return focus to
      // when the modal has hidden
      this.$refs['edit-tag-modal'].toggle('#toggle-btn')
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
</style>