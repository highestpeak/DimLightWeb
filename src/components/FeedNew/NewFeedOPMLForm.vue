<template>
  <b-container fluid>
    <b-alert show variant="danger" style="margin: 10px 0px">
      <h4 class="alert-heading">OPML</h4>
      <p>这里描写为什么设置这个栏目</p>
      <hr />
      <p class="mb-0">这里描述具体的参数如何填写</p>
    </b-alert>
    <b-form-textarea placeholder="Large textarea" v-model="form">
    </b-form-textarea>
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
export default {
  name: "NewFeedOPMLForm",
  data(){
      return {
          form:""
      }
  }
};
</script>

<style>
</style>