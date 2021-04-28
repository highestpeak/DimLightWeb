<template>
    <div>
       <h1>{{topic.titleUser}}</h1>
        <p v-for="(field,index) in keyValueShowList" :key="index" style="margin-bottom:10px;">
          <b> {{field.key}}: </b>
          <template v-if="['url','image','link'].indexOf(field.key)>-1">
            <a :href="field.value" target="_blank">{{field.value}}</a>
          </template>
          <template v-else>
            {{field.value}}
          </template>
        </p>
        <p>
          <b>jsonOptionalExtraFields:</b>
          <pre class="json-code-show">{{jsonOptionalExtraFields}}</pre>
        </p>
    </div>
</template>

<script>
export default {
  name: "TopicDetail",
  props: {
    topic: {
      type: Object,
    },
  },
  computed: {
    keyValueShowList: function () {
      var result = [];
      for (const key in this.topic) {
        if (Object.hasOwnProperty.call(this.topic, key)) {
          var value = this.topic[key];
          if (value == null) {
            value = "null";
          }
          if (key === "jsonOptionalExtraFields" || key === "rssSources") {
            continue
          } else {
            result.push({ key: key, value: value });
          }
          
        }
      }
      return result;
    },
    jsonOptionalExtraFields: function () {
      return this.topic["jsonOptionalExtraFields"];
    },
  },
};
</script>

<style>
</style>