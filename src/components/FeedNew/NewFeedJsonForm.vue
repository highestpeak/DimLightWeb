<template>
  <b-container fluid>
    <!--rsshub-->
    <b-alert show variant="danger" style="margin: 10px 0px">
      <h4 class="alert-heading">JSON</h4>
      <p>这里描写为什么设置这个栏目</p>
      <hr />
      <pre class="mb-0">
        1. json 格式和 one new feed 的格式相同
        2. 如果输入多个Feed，则单个Feed的格式和1相同，多个Feed按照json数组格式传送，即 {[{},{},{}...]}
      </pre>
    </b-alert>
    <b-row>
      <b-col sm="6">
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
  }
};
</script>

<style>
</style>