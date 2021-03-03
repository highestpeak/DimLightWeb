<template>
  <div>
    <h2 style="margin: 10px 0px">New Task</h2>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <blockquote class="blockquote-statement">task 的通用的参数</blockquote>
      <NewTaskInputForm v-on:taskValueChange="onBasicTaskValueChange"/>
      <hr />
      <blockquote class="blockquote-statement">
        task 的各自需要的参数
      </blockquote>
      <ViewGroup
        :iconOption="false"
        :viewOptions="viewGroup"
        @change-view="changeNewFeedView"
        style="margin: 10px 0px"
      >
      </ViewGroup>

      <SimpleRSSWatchTask v-if="currViewIndex === 0" v-on:taskValueChange="onOptionalTaskValueChange"/>

      在下面写那些不同的 task 的参数
      <pre>
        定时监控 feed 的task、算法 task 、 正则 task、 筛选 task、打标签的
        task、json rpc to python/js/.. task <br />
        这一系列的 task 其实全用 python 不用 java 写最好，因为这样可以方便的扩展新的
        task <br />
        常见的 task 现在可以想到的 task 能用 java 写的就用 java
        写，但是考虑到很多方面即便利性等等，还是要用 rpc 调用 python 的需要 <br />
        但是，我其实是不需要管对方怎么使用 python 的，他是使用 flask api 也好 ，还是使用 json-rpc 也好，都可以，
        我其实只需要把请求发过去，然后等待结果就可以了
        目前的，跨语言调用的方案：
        1. Runtime.getRuntime()执行python脚本文件
        2. processbuilder
        3. https://www.zhihu.com/question/58495286
        4. json-rpc
      </pre>

      <blockquote class="blockquote-statement">
        task 添加到一个 flow 中
      </blockquote>
      <pre>
        不同的 task 可以在一个链条上串起来，按步骤处理不同的 task 
      </pre>
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
        { index: 1, state: false, text: "Algorithm Task" },
        { index: 2, state: false, text: "Regx Task" },
        { index: 3, state: false, text: "Filter Task" },
        { index: 4, state: false, text: "Tag Task" },
        { index: 5, state: false, text: "Python Task" },
      ],
      currViewIndex: 0,
      show: true,
    };
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      alert(JSON.stringify(this.form));
      // newRSSSource(this.form)
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