<template>
  <div>
    <b-form-group label="RSS ID:">
      <b-form-input
        v-model="taskForm.RSSId"
        placeholder="Input rss id to watching"
        required
      ></b-form-input>
    </b-form-group>
  </div>
</template>

<script>
export default {
  name: "SimpleRSSWatchTask",
  data(){
    return {
      taskForm:{
        RSSId:""
      }
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