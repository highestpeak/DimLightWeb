<template>
  <div ref="jsoneditor"></div>
</template>

<script>
// todo: 之后可以尝试 vscode 的 Monaco editor
// https://github.com/josdejong/jsoneditor
import JSONEditor from "jsoneditor/dist/jsoneditor-minimalist.js";
import "jsoneditor/dist/jsoneditor.min.css";
import _ from "lodash";
export default {
  name: "json-editor",
  data() {
    return {
      editor: null,
    };
  },
  props: {
    json: {
      type: Object,
      default: () => {
        return {};
      },
      // required: true,
    },
    options: {
      type: Object,
      default: () => {
        return {};
      },
    },
    onChange: {
      type: Function,
    },
  },
  watch: {
    json: {
      handler(newJson) {
        if (this.editor) {
          this.editor.set(newJson);
        }
      },
      deep: true,
    },
  },
  methods: {
    // eslint-disable-next-line no-unused-vars
    _onChange(e) {
      try {
        if (this.onChange && this.editor) {
          this.onChange(this.editor.get());
        }
      } catch (error) {
        // eslint-disable-next-line no-empty
      }
    },
  },
  mounted() {
    const container = this.$refs.jsoneditor;
    const options = _.extend(
      {
        onChange: this._onChange
      },
      this.options
    );
    this.editor = new JSONEditor(container, options);
    this.editor.set(this.json);
  },
  beforeDestroy() {
    if (this.editor) {
      this.editor.destroy();
      this.editor = null;
    }
  },
};
</script>

<style>
</style>
