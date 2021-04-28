<template>
  <div>
    <div style="margin: 20px"></div>
    <blockquote style="border-left: 5px solid #e84545; padding: 10px 20px;background-color:#fed049">
      Topic是聚合系统的聚合信息单元，一个Topic包含多个信息源，他们产生的信息可能相同，但是Topic会通过聚合方式去重
    </blockquote>
    <!-- button group -->
    <b-button-group style="margin: 10px 0px" size="sm">
      <b-button variant="outline-secondary" href="#" @click="showNewTopicModal()">
        <font-awesome-icon
          :icon="['fas', 'plus']"
          size="lg"
          style="color: #000"
        />
        New Topic
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

    <!--per page-->
    <b-pagination
      v-if="totalRows!=0"
      v-model="currentPage"
      :total-rows="totalRows"
      :per-page="perPage"
      align="right"
      size="sm"
    ></b-pagination>

    <b-table
      responsive
      small
      :busy="isBusy"
      :items="itemsShowed"
      :fields="fields"
    >
      <template #table-busy>
        <div class="text-center text-danger my-2">
          <b-spinner class="align-middle"></b-spinner>
          <strong>&nbsp;&nbsp;Loading...</strong>
        </div>
      </template>

      <template #cell(mobiusTags)="data">
        <b-badge
          v-for="(type, index) in data.value"
          :key="index"
          :variant="badgeVariantArray[index % badgeVariantArray.length]"
          style="margin-right: 2px"
        >
          {{ type }}
        </b-badge>
      </template>

      <template #cell(operate)="data">
        <b-dropdown text="Action" size="sm" variant="outline-secondary">
          <b-dropdown-item href="#" @click="infoRow(data)">
            <font-awesome-icon :icon="['fas', 'info']" fixed-width style="width:20px"/>
            info
          </b-dropdown-item>
          <b-dropdown-item href="#" @click="showEditTopicModal(data)">
            <font-awesome-icon :icon="['fas', 'pen']" fixed-width />
            edit
          </b-dropdown-item>
          <b-dropdown-item href="#" @click="delTopic(data)">
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

    <b-modal ref="new-topic-modal" hide-footer title="创建Topic">
      <div class="d-block text-center">
        <h3>创建新的Topic!</h3>
        <b-form @submit="onSubmitNewTopic">
          <b-form-input
            id="name"
            v-model="newTopicForm.name"
            type="text"
            placeholder="Enter name"
            required
          ></b-form-input>
          <b-form-input
            id="desc"
            v-model="newTopicForm.desc"
            type="text"
            placeholder="Enter desc"
            required
          ></b-form-input>
        </b-form>
      </div>
      <b-button class="mt-3" variant="outline-primary" block  type="submit">Submit</b-button>
      <b-button class="mt-3" variant="outline-danger" block @click="hideNewTopicModal">Close Me</b-button>
      <b-button class="mt-2" variant="outline-warning" block @click="toggleNewTopicModal">Toggle Me</b-button>
    </b-modal>
    <b-modal ref="edit-topic-modal" hide-footer title="修改Topic">
      <div class="d-block text-center">
        <h3>修改Topic!</h3>
        <b-form @submit="onSubmitEditTopic">
          <b-form-input
            id="name"
            v-model="editTopicForm.name"
            type="text"
            placeholder="Enter name"
            required
          ></b-form-input>
          <b-form-input
            id="desc"
            v-model="editTopicForm.desc"
            type="text"
            placeholder="Enter desc"
            required
          ></b-form-input>
        </b-form>
      </div>
      <b-button class="mt-3" variant="outline-primary" block  type="submit">Submit</b-button>
      <b-button class="mt-3" variant="outline-danger" block @click="hideEditTopicModal">Close Me</b-button>
      <b-button class="mt-2" variant="outline-warning" block @click="toggleEditTopicModal">Toggle Me</b-button>
    </b-modal>
  </div>
</template>

<script>
import {newTopic, updateTopic, delTopic, getTopic, topicSearchContent} from "@/util/request/topicRequest";
import {formatDate} from "@/util/commonUtils"
export default {
  name: "topic-list",
  data() {
    return {
      search: "",
      pageOptions: [5, 20, 50, { value: 100, text: "Show a lot" }],
      perPage: 20,
      currentPage: 1,
      totalRows: 0,
      isBusy: false,
      items: [],
      newTopicForm: {name:"",desc:""},
      editTopicForm: {id:-1,name:"",desc:""}
    };
  },
  watch: {
    perPage: function(newPerPage) {
      this.currentPage = 1
      this.isBusy = true
      getTopic(0,newPerPage,this.onTopicsListFetchSucceed);
    },
    currentPage: function(nextPage) {
      this.isBusy = true  
      getTopic(nextPage-1,this.perPage,this.onTopicsListFetchSucceed);
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
        topicSearchContent(newSearchContent, vueApp.onTopicsListFetchSucceed);
      }, 300);
    }
  },
  computed:{
    fields: function(){
      if(this.totalRows<=0){
        return []
      }
      var itemSample = this.items[0]
      var fieldList = []
      var sourceNum = 0
      for (const itemKey in itemSample) {
        if(itemKey==="updateTime" || itemKey === "descUser" || itemKey === "jsonOptionalExtraFields" || itemKey === "rssSources"){
          continue
        } else {
          fieldList.push({
           key: itemKey, sortable: false
          })
        }
      }

      fieldList.push({key: "sourceNum", sortable: true})
      fieldList.push( { key: "operate", sortable: false })

      return fieldList
    },
    itemsShowed: function () {
      var itemsShowed = []
      for (let index = 0; index < this.items.length; index++) {
        const originItem = this.items[index];
        var itemShowed = {}
        for (const itemKey in originItem) {
          itemShowed[itemKey] = originItem[itemKey]
        }
        itemShowed["sourceNum"] = originItem["rssSources"].length
        itemsShowed.push(itemShowed)
      }
      return itemsShowed
    }
  },
  mounted(){
    this.isBusy = true
    getTopic(this.currentPage-1, this.perPage, this.onTopicsListFetchSucceed)
  },
  methods: {
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    onSubmitNewTopic(){
      this.newTopic(this.newTopicForm.name,this.newTopicForm.desc)
    },
    newTopic(name,desc){
      var vueApp = this
      newTopic({ name: name, desc: desc}, function (responseData) {
        // 要返回创建的Topic
        var newTopic = responseData
        vueApp.$forceUpdate();
      })
    },
    delTopic(row){
      var rowItem = row.item
      var rowIndex = row.index
      var vueApp = this
      delTopic({ name: rowItem.name, id: rowItem.id}, function (responseData) {
        if(responseData.errorMsg.length === 0){
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
    onSubmitEditTopic(){
      this.editTopic(this.editTopicForm.id,this.editTopicForm.name,this.editTopicForm.desc)
    },
    editTopic(id, name,desc){
      var vueApp = this
      updateTopic({ id:id, name: name, desc: desc}, function (responseData) {
        // 要返回创建的Topic
        vueApp.$forceUpdate();
      })
    },
    onTopicsListFetchSucceed(responseData){
      this.totalRows = responseData.totalElements
      // console.log(responseData)
      var topicList = responseData.content
      topicList.forEach(function(obj) {
        // delete obj.rssSources;
        // delete obj.rssContentItems;
        obj.createTime = formatDate(obj.createTime)
      });
      this.items = topicList
      this.isBusy = false
    },
    showNewTopicModal() {
      this.$refs['new-topic-modal'].show()
    },
    hideNewTopicModal() {
      this.$refs['new-topic-modal'].hide()
    },
    toggleNewTopicModal() {
      // We pass the ID of the button that we want to return focus to
      // when the modal has hidden
      this.$refs['new-topic-modal'].toggle('#toggle-btn')
    },
    showEditTopicModal(row) {
      // console.log(row);
      this.editTopicForm = row.item
      this.$refs['edit-topic-modal'].show()
    },
    hideEditTopicModal() {
      this.$refs['edit-topic-modal'].hide()
    },
    toggleEditTopicModal() {
      // We pass the ID of the button that we want to return focus to
      // when the modal has hidden
      this.$refs['edit-topic-modal'].toggle('#toggle-btn')
    },
    infoRow(data) {
      // console.log("info row not impl");
      // console.log(data);
      // var topicItem = data.item

      var topic = data.item
      var topicIndex = data.index
      // console.log(rssSource)
      // var vueApp = this
      // console.log(topic);
      this.$router.push({ name: 'topic-info', params: { topic: topic }})
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