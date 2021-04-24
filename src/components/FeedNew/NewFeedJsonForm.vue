<template>
  <b-container fluid>
    <!--rsshub-->
    <b-alert show variant="info " style="margin: 10px 0px">
      <h4 class="alert-heading">JSON</h4>
      <p>通过下面输入框输入本系统支持的Json格式的数据，本系统将自动导入数据</p>
      <hr />
      <p>支持json输入的原因：</p>
      <pre class="mb-0">
        1. opml进行topic和tag对应不方便
        2. json格式更容易查看，可读性更好，处理更方便，更为结构化
      </pre>
    </b-alert>
    <b-row>
      <b-col sm="6">
        <b-form @submit="onSubmit" @reset="onReset">
          <JSONEditor
              :options="{
                mode: 'code',
                enableSort: false,
                enableTransform: false,
              }"
              :onChange="onJsonChange"
              style="margin-top: 1rem !important;"
            />

          <hr>
          <b-button type="reset" variant="danger">Reset</b-button>
          &nbsp;
          <b-button type="submit" variant="primary">Submit</b-button>
        </b-form>
      </b-col>
      <b-col sm="6">
        <b-card class="mt-3" header="Form Data Result">
          <pre class="m-0">{{ form }}</pre>
          <!-- <pre class="m-0" v-if="taskForm.createTask">{{ taskForm }}</pre> -->
        </b-card>
      </b-col>
    </b-row>
  </b-container>

</template>

<script>
import JSONEditor from "@/components/JsonEditor";
import { rssJsonAdd } from "@/util/request";
export default {
  name: "NewFeedJsonForm",
  components: {
    JSONEditor,
  },
  data() {
    return {
      form: {
      },
    };
  },
  methods:{
    onJsonChange(newJson) {
      this.form = newJson;
    },
    onSubmit(event) {
      event.preventDefault();
      var vueApp = this
      rssJsonAdd(this.form, function (variant = null) {
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
    },
  }
};
</script>

<style>
</style>