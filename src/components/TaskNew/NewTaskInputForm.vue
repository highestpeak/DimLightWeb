<template>
  <div>
    <b-form-group>
      <b-form-checkbox v-model="taskForm.startTask"> 启动Task </b-form-checkbox>
    </b-form-group>
    <b-form-group label="Title:">
      <b-form-input
        v-model="taskForm.title"
        placeholder="Enter title text"
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
    <b-form-group label="lifeCycle cron 调度表达式:">
      <b-form-input
        v-model="taskForm.lifeCycle"
        placeholder="Enter cron lifeCycle text"
        required
      ></b-form-input>
    </b-form-group>
    <b-form-group label="cacheCycle cron 调度表达式:">
      <b-form-input
        v-model="taskForm.cacheCycle"
        placeholder="Enter cron cacheCycle text"
        required
      ></b-form-input>
    </b-form-group>
    <b-form-group>
      <b-form-checkbox v-model="taskForm.autoDownload">
        自动下载全文内容
      </b-form-checkbox>
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
export default {
  name: "NewTaskInputForm",
  data() {
    return {
      taskForm: {
        startTask: false,
        title: "",
        desc: "",
        schedule: null,
        lifeCycle: null,
        cacheCycle: null,
        autoDownload: false,
        nextEventSet: "",
      },
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
};
</script>

<style>
</style>