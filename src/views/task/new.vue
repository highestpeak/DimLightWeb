<template>
  <div>
    <h2 style="margin: 10px 0px">New Task</h2>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <ViewGroup
        :iconOption="false"
        :viewOptions="viewGroup"
        @change-view="changeNewFeedView"
        style="margin: 10px 0px"
      >
      </ViewGroup>
      <blockquote class="blockquote-statement">task 的通用的参数</blockquote>
      <b-button-group style="margin:10px auto;">
        <b-button squared variant="dark" disabled>快捷输入</b-button>
        <b-button squared variant="outline-secondary" @click="quickInput(1)">每日任务</b-button>
        <b-button squared variant="outline-secondary" @click="quickInput(2)">每周任务</b-button>
        <b-button squared variant="outline-secondary" @click="quickInput(3)">每月任务</b-button>
      </b-button-group>
      <NewTaskInputForm v-on:taskValueChange="onBasicTaskValueChange"/>
      <template v-if="showBelowDiffTask">
        <hr />
        <blockquote class="blockquote-statement">
          task 的各自需要的参数
        </blockquote>

        <SimpleRSSWatchTask v-if="currViewIndex === 0" v-on:taskValueChange="onOptionalTaskValueChange"/>

        在下面写那些不同的 task 的参数
        <pre>
          
        </pre>
      </template>
      <b-button type="reset" variant="danger">Reset</b-button>
      &nbsp;
      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
  </div>
</template>

<script>
import ViewGroup from "@/components/ViewGroup";
import NewTaskInputForm from "@/components/TaskNew/NewTaskInputForm";
import SimpleRSSWatchTask from "@/components/TaskNew/SimpleRSSWatchTask";
import { 
  newTask 
} from "@/util/request/taskRequest";
export default {
  name: "",
  components: {
    NewTaskInputForm,
    ViewGroup,
    SimpleRSSWatchTask,
  },
  data() {
    return {
      form: {
        basicTask: {},
        // todo: 不同类型的 form 的参数要加进去
        taskType:"",
        optionalTask: {},
      },
      viewGroup: [
        { index: 0, state: true, text: "Simple Watching Task" }, // 一个  task 的最基本参数
        // 历史数据爬虫，一次性爬完，定时提供一些内容
        { index: 1, state: false, text: "History Crawl Task" }, 
        // 主题聚合时间: 写一个界面，拖动不同的
        { index: 2, state: false, text: "Topic Aggregation Task" },
        { index: 3, state: false, text: "Filter Task" },
        { index: 4, state: false, text: "Tag Task" },
        { index: 5, state: false, text: "Python Task" },
      ],
      currViewIndex: 0,
      show: true,
    };
  },
  computed:{
    showBelowDiffTask: function(){
      return this.$route.name!=="task-edit";
    }
  },
  mounted() {
    if(this.$route.name==="task-edit") { 
      var task = this.$route.params.task
      var basicTask = this.form.basicTask
      basicTask.title = task.name
      basicTask.group = task.group
      basicTask.desc = task.descUser
      basicTask.schedule = task.schedule
      basicTask.cacheCycle = task.cacheCycle
      basicTask.autoDownload = task.autoDownload
      basicTask.startTask = task.status === 1
    }
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      // alert(JSON.stringify(this.form));
      var form = this.form
      newTask({
        name: form.basicTask.title,
        group: form.basicTask.group,
        descUser: form.basicTask.desc,
        schedule: form.basicTask.schedule,
        cacheCycle: form.basicTask.cacheCycle,
        autoDownload: form.basicTask.autoDownload,
        startTask: form.basicTask.startTask,
        rssSourceId: form.optionalTask.rssId,
        fetchNow: form.basicTask.fetchNow,
      },this.succeedCallback);
    },
    succeedCallback(responseData){
      var msg = responseData.messages
      // console.log(msg);
      this.$bvToast.toast('succeed'+msg, {
        title: 'succeed new/update rss',
        variant: 'success',
        solid: true
      })
    },
    onReset(event) {
      event.preventDefault();
      // Reset our form values
      this.form={}
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
    // eslint-disable-next-line no-unused-vars
    changeNewFeedView: function (index) {
      this.currViewIndex = index;
    },
    onBasicTaskValueChange(basicTask){
      this.form.basicTask = basicTask
    },
    onOptionalTaskValueChange(optionalTaskParam) {
      this.form.optionalTask = optionalTaskParam;
    },
    quickInput(option){
      var basicTask = this.form.basicTask
      basicTask.cacheCycle = 7
      basicTask.autoDownload = false
      basicTask.startTask = true
      switch (option) {
        case 1:
          basicTask.schedule = "0 0 2 * * ?"
          break;
        case 2:
          basicTask.schedule = "0 0 2 ? * WED"
          break;
        case 3:
          basicTask.schedule = "0 0 2 L * ?"
          break;
        default:
          break;
      }
    }
  },
};
</script>

<style>
.blockquote-statement {
  border-left: 5px solid #383e56;
  padding: 10px 20px;
  background-color: #f4f9f9;
}
</style>