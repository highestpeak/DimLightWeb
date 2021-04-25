<template>
    <div>
      <b-card bg-variant="dark" header="Json字段说明" text-variant="white" class="text-left" style="margin-top:31px;">
      <code style="color:white;">
        1. 可选Process: {{optionalProcess}} <br> <br>
        2. process的字符串是有顺序的 process字段在json中的示例：{...,"process":["xxx","yyy",...],...} <br> <br>
        3. process赋值是json的其他字段，示例：{...,"infoProcess":{"key1":value1,"key2":value2,...},...} <br> <br>
        4. 当前阶段process仅是单链条，暂不支持多分支
      </code>
      </b-card>
    </div>
</template>

<script>
import { getProcessOptional } from "@/util/request/commonRequest";
export default {
    name: "FeedJsonTutorialCard",
    data() {
      return {
        optionalProcess: [],
      }
    },
    created() {

    },
    mounted() {
      getProcessOptional(this.processNameSucceedCallback)
    },
    methods: {
      processNameSucceedCallback (responseData) {
        // console.log(responseData);
        this.optionalProcess = responseData
        this.$bvToast.toast("succeed", {
          title: "succeed",
          variant: "success",
          solid: true,
        });
      }
    }
}
</script>

<style>

</style>