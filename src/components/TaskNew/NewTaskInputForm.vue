<template>
  <div>
    <b-form-group>
      <b-form-checkbox v-model="taskForm.startTask"> 启动Task </b-form-checkbox>
    </b-form-group>
    <b-form-group>
      <b-form-checkbox v-model="taskForm.autoDownload">
        自动下载全文内容
      </b-form-checkbox>
    </b-form-group>
    <b-form-group label="Title:">
      <b-form-input
        v-model="taskForm.title"
        placeholder="Enter title text"
        required
      ></b-form-input>
    </b-form-group>
    <b-form-group label="group:">
      <b-form-input
        v-model="taskForm.group"
        placeholder="Enter group text"
        required
      ></b-form-input>
    </b-form-group>
    <b-form-group label="Description:">
      <b-form-input
        v-model="taskForm.desc"
        placeholder="Enter description text"
        required
      ></b-form-input>
    </b-form-group>

    <b-form-group label="schedule cron 调度表达式:">
      <b-form-input
        v-model="taskForm.schedule"
        placeholder="Enter cron schedule text"
        required
      ></b-form-input>
    </b-form-group>
    <b-form-group label="cacheCycle 缓存周期:">
      <b-form-select v-model="taskForm.cacheCycle" :options="cacheCycleOptions"></b-form-select>
      <!-- <b-form-input
        v-model="taskForm.cacheCycle"
        placeholder="Enter cron cacheCycle text"
        required
      ></b-form-input> -->
    </b-form-group>
    <b-form-group label="下次事件时间:">
      <b-form-input
        v-model="taskForm.nextEventSet"
        placeholder="Enter nextEventSet text"
      ></b-form-input>
    </b-form-group>
  </div>
</template>

<script>
import { 
  getTaskOutputCacheCycle
} from "@/util/request";
export default {
  name: "NewTaskInputForm",
  data() {
    return {
      taskForm: {
        startTask: false,
        title: "",
        group: "",
        desc: "",
        schedule: null,
        cacheCycle: null,
        autoDownload: false,
        nextEventSet: "",
      },
      cacheCycleEnum: null, // days desc
    };
  },
  watch: {
    taskForm: {
      // eslint-disable-next-line no-unused-vars
      handler(oldTask, newTask) {
        // this.taskForm = newTask;
        this.$emit("taskValueChange", this.taskForm);
      },
      immediate: true,
      deep: true,
    },
  },
  computed:{
    cacheCycleOptions: function() {
      if(this.cacheCycleEnum===null){
        return [];
      }
      var cacheCptions = []
      for (let index = 0; index < this.cacheCycleEnum.length; index++) {
        const cacheCycle = this.cacheCycleEnum[index];
        cacheCptions.push({
          "value": cacheCycle.days,
          "text": cacheCycle.desc
        })
      }
      return cacheCptions
    }
  },
  created(){
    this.getCacheCycle()
  },
  methods: {
    getCacheCycle(){
      var vueApp = this
      getTaskOutputCacheCycle(function (responseData) {
        // console.log(responseData)
        vueApp.cacheCycleEnum = responseData.cacheCycleEnum
      })
    }
  }
};
</script>

<style>
</style>