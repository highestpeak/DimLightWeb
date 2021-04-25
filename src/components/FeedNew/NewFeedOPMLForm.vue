<template>
  <b-container fluid>
    <b-alert show variant="secondary" style="margin: 10px 0px">
      <h4 class="alert-heading">OPML</h4>
      <p>通过下面输入框输入本系统支持OPML格式的数据，本系统将自动导入数据，注意：OPML暂不支持导入一系列的Tag、Topic等类型</p>
      <hr />
      <p class="mb-0">支持OPML输入的原因：</p>
      <pre class="mb-0">
        尽管使用JSON支持更为丰富的内容格式，但是由于以下原因还是需要OPML：
        1. 大多数RSS阅读器均支持OPML导出所有订阅源，可以快速导出原有数据
        2. 可以便于向其他RSS阅读器转移数据
      </pre>
    </b-alert>
    <b-form @submit="onSubmit" @reset="onReset">
      <b-form-textarea placeholder="Large textarea" v-model="form">
      </b-form-textarea>
    </b-form>
    <!-- todo: 这里先默认的生成一系列的 rsshub 的 new feed 的参数，然后用户可以单独修改任意一个 feed 的参数，这个东西可以用现有的
    通用的，也可以用到下一个 OPML 上去 -->
    <b-row>
      <b-col>
        <hr />
        <b-button type="reset" variant="danger">Reset</b-button>
        &nbsp;
        <b-button type="submit" variant="primary">Submit</b-button>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { rssOPMLAdd } from "@/util/request/rssRequest";
export default {
  name: "NewFeedOPMLForm",
  data(){
      return {
          form:""
      }
  },
  methods:{
    onSubmit(event) {
      event.preventDefault();
      var vueApp = this
      rssOPMLAdd(this.form, function (variant = null) {
        vueApp.toast("Toast body content", {
          title: `Variant ${variant || "default"}`,
          variant: variant,
          solid: true,
        });
      })
    },
    onReset(event) {
      event.preventDefault();
      // Reset our form values
      this.form = ""
    }
  }
};
</script>

<style>
</style>