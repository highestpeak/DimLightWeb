<template>
  <div>
    <b-form-checkbox v-model="multi"> 多个Rss？ </b-form-checkbox>
    <b-form-group label="RSS ID:">
      <b-form-input
        v-model="taskForm.rssId"
        v-if="!multi"
        placeholder="Input rss id to watching"
        required
      ></b-form-input>
    </b-form-group>
    <b-form-group>
      <b-form-tags
        v-model="taskForm.rssIds"
        v-if="multi"
        placeholder="Enter the rssIds to stark task"
        required
      ></b-form-tags>
    </b-form-group>
    <b-form-group>
      <b-form-checkbox v-model="taskForm.fetchNow"> 立即抓取一次 </b-form-checkbox>
    </b-form-group>
  </div>
</template>

<script>
export default {
  name: "SimpleRSSWatchTask",
  data(){
    return {
      taskForm:{
        rssId:"",
        fetchNow:true,
        rssIds:[],
      },
      multi: false
    }
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
};
</script>

<style>
</style>