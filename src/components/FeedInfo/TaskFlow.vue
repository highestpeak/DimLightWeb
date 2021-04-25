<template>
  <div>
    <p>
      <b>jsonOptionalExtraFields:</b>
      <pre class="json-code-show">{{jsonOptionalExtraFields}}</pre>
    </p>
    <img src="@/assets/sample.svg" alt="" style="margin-top:100px">
  </div>
</template>

<script>
export default {
  name: "TaskFlow",
  props: {
    rss: {
      type: Object,
    },
  },
  computed:{
    jsonOptionalExtraFields: function () {
      return this.rss["jsonOptionalExtraFields"];
    },
  }
};
</script>

<style>
</style>