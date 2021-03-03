<template>
    <div>
       <h1>{{rss.titleUser}}</h1>
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
        <!-- {{ rss }} -->
    </div>
</template>

<script>
export default {
  name: "FeedDetail",
  props: {
    rss: {
      type: Object,
    },
  },
  computed: {
    keyValueShowList: function () {
      var result = [];
      for (const key in this.rss) {
        if (Object.hasOwnProperty.call(this.rss, key)) {
          var value = this.rss[key];
          if (value == null) {
            value = "null";
          }
          if (key !== "jsonOptionalExtraFields") {
            result.push({ key: key, value: value });
          }
        }
      }
      return result;
    },
    jsonOptionalExtraFields: function () {
      return this.rss["jsonOptionalExtraFields"];
    },
  },
};
</script>

<style>
</style>