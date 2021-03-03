<template>
  <b-container fluid style="margin:20px 0px">
    <b-row>
      <b-col sm="6">
        <b-form @submit="onSubmit" @reset="onReset" v-if="show">
          <!-- todo: 如此多的 form group 写一个数据格式，来用循环搞定 -->
          <b-form-group label="RSS Source Feed Url:">
            <b-form-input
              v-model="form.url"
              type="url"
              placeholder="Enter rss url"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group label="Title:">
            <b-form-input
              v-model="form.title"
              placeholder="Give this service a name"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group label="Description:">
            <b-form-textarea
              v-model="form.desc"
              placeholder="Give this service a description and an introduction"
              rows="3"
              max-rows="6"
              required
            ></b-form-textarea>
          </b-form-group>

          <b-form-group label="Generator:">
            <b-form-input
              v-model="form.generator"
              placeholder="Give the author of this service a name"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group
            label="Image:"
            :description="getImageOption(imageOption).description"
          >
            <b-form-select
              v-model="imageOption"
              :options="imageOptions"
            ></b-form-select>
            <b-row style="margin-top: 5px" class="text-center">
              <!-- text and color -->
              <b-col>
                <b-form-input
                  v-model="form.image"
                  :placeholder="
                    'Enter ' +
                    getImageOptionPlaceholder(imageOption) +
                    ' content'
                  "
                  :disabled="imageOption === null"
                ></b-form-input>
                <!-- color -->
                <b-row
                  v-show="
                    imageOption === 'text' ||
                    imageOption === 'bootstrap' ||
                    imageOption === 'font-awesome'
                  "
                >
                  <b-col>
                    <b-form-input
                      v-model="imageColor"
                      style="margin-top: 5px"
                      :placeholder="'background color in hex'"
                    ></b-form-input>
                  </b-col>
                  <b-col>
                    <b-form-input
                      v-model="imageIconColor"
                      style="margin-top: 5px"
                      :placeholder="'icon/text color in hex'"
                    ></b-form-input>
                  </b-col>
                </b-row>
                <!-- color -->
              </b-col>
              <!-- text and color -->

              <!-- icon -->
              <b-col md="auto">
                <b-avatar v-show="imageOption === null"></b-avatar>
                <b-avatar
                  v-show="imageOption === 'text'"
                  :text="form.image"
                  :style="
                    'background-color:' +
                    imageColor +
                    ';color:' +
                    imageIconColor
                  "
                  size="4rem"
                ></b-avatar>
                <b-avatar
                  v-show="imageOption === 'url'"
                  :src="form.image"
                ></b-avatar>
                <b-avatar
                  v-show="imageOption === 'bootstrap'"
                  :icon="form.image"
                  :style="
                    'background-color:' +
                    imageColor +
                    ';color:' +
                    imageIconColor
                  "
                  size="4rem"
                ></b-avatar>
                <b-avatar
                  v-show="imageOption === 'font-awesome'"
                  :style="
                    'background-color:' +
                    imageColor +
                    ';color:' +
                    imageIconColor
                  "
                  size="4rem"
                >
                  <font-awesome-icon
                    :icon="[fontAwesomeIcon.prefix, fontAwesomeIcon.value]"
                    size="lg"
                  />
                </b-avatar>
              </b-col>
              <!-- icon -->
            </b-row>
          </b-form-group>

          <b-form-group
            label="tags:"
            description="Enter a tag and press enter"
          >
            <b-form-tags
              v-model="form.tags"
              placeholder="Enter the tag of this service"
              required
            ></b-form-tags>
          </b-form-group>

          <b-form-group
            label="topics:"
            description="Enter a topic and press enter"
          >
            <b-form-tags
              v-model="form.topics"
              placeholder="Enter the topic of this service"
              required
            ></b-form-tags>
          </b-form-group>

          <b-form-group label="Json 格式的额外字段:">
            <JSONEditor
              :options="{
                mode: 'code',
                enableSort: false,
                enableTransform: false,
              }"
              :onChange="onJsonChange"
            />
          </b-form-group>

          <b-form-group v-if="showCreateTaskButton()">
            <b-form-checkbox v-model="form.createTask">
              创建Task
            </b-form-checkbox>
          </b-form-group>

          <NewTaskInputForm
            v-if="form.createTask"
            v-on:taskValueChange="onTaskValueChange"
          />

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
import NewTaskInputForm from "@/components/TaskNew/NewTaskInputForm";
import { newRSSSource, updateRSSSource } from "@/util/request";
export default {
  name: "NewFeedInputForm",
  components: {
    JSONEditor,
    NewTaskInputForm,
  },
  data() {
    return {
      form: {
        url: "",
        title: "",
        generator: "",
        image: "", // todo: image 字段需要一个新的格式(如果是icon的话，那h5和android通用嘛？)
        desc: null,
        tags: [],
        topics: [],
        jsonOptionalExtraFields: {},
        createTask: false,
        taskForm: {
          startTask: false,
          title: "",
          desc: "",
          schedule: null,
          lifeCycle: null,
          cacheCycle: null,
          autoDownload: false,
          nextEventSet: "",
        },
      },
      imageOption: null,
      imageColor: "",
      imageIconColor: "",
      imageOptions: [
        {
          text: "Select One",
          value: null,
          description: "代表这个RSS Source的一个图片",
        },
        { text: "text", value: "text" }, // todo 可以输入颜色
        { text: "url", value: "url", description: "输入图片的完整url地址" },
        {
          text: "bootstrap icon",
          value: "bootstrap",
          description:
            "bootstrap icon请查阅: https://bootstrap-vue.org/docs/icons#icons",
        },
        {
          text: "font awesome",
          value: "font-awesome",
          description:
            "font awesome icon请查阅: https://fontawesome.com/icons?d=gallery content示例: fas-home; use ';' to end input",
        },
      ],
      show: true,
    };
  },
  mounted() {
    if(this.$route.name==="feed-edit"){
      // console.log("feed-edit")
      var rssSource = this.$route.params.rssSource
      console.log(rssSource);
      var form = this.form
      form.url = rssSource.url
      form.title = rssSource.titleParse
      form.generator = rssSource.generator
      form.image = rssSource.image
      form.desc = rssSource.descParse
      form.tags = rssSource.tags
      form.topics = rssSource.topics
      form.jsonOptionalExtraFields = rssSource.jsonOptionalExtraFields

      delete form.taskForm;
    }
  },
  computed: {
    fontAwesomeIcon: function () {
      if (this.imageOption !== "font-awesome") {
        return {
          prefix: "fas",
          value: "user",
        };
      }
      var prefixEndIndex = this.form.image.indexOf("-");
      var inputEndIndex = this.form.image.indexOf(";");
      if (inputEndIndex===-1) {
        return {
          prefix: "fas",
          value: "user",
        };
      }
      return {
        prefix: this.form.image.substring(0, prefixEndIndex),
        value: this.form.image.substring(prefixEndIndex + 1,inputEndIndex),
      };
    },
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      // alert(JSON.stringify(this.form));
      if(this.$route.name!=="feed-edit"){
        newRSSSource(this.form, this.$bvToast);
      }else{
        updateRSSSource(this.form, this.succeedCallback)
      }
    },
    onReset(event) {
      event.preventDefault();
      // Reset our form values
      this.form.url = "";
      this.form.title = "";
      this.form.generator = "";
      this.form.desc = null;
      this.form.tags = [];
      this.form.topics = [];
      this.form.jsonOptionalExtraFields = {};
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
    succeedCallback(msg=null){
      this.$bvToast.toast('succeed'+msg, {
        title: 'default',
        variant: 'danger',
        solid: true
      })
    },
    getImageOption(value) {
      for (let index = 0; index < this.imageOptions.length; index++) {
        const option = this.imageOptions[index];
        if (value === option.value) {
          return option;
        }
      }
      return this.imageOptions[0];
    },
    getImageOptionPlaceholder(value) {
      if (value === null) {
        return "";
      }
      return this.getImageOption(value).text;
    },
    isJsonFormat(jsonStrToValid) {
      if (jsonStrToValid === "") {
        return null;
      }
      // 判断是否是 json 格式的内容
      try {
        JSON.parse(jsonStrToValid);
      } catch (e) {
        return false;
      }
      return true;
    },
    onJsonChange(newJson) {
      this.form.jsonOptionalExtraFields = newJson;
    },
    onTaskValueChange(newTask) {
      this.form.taskForm = newTask;
    },
    showCreateTaskButton() {
      return !this.$route.name==="feed-edit"
    }
  },
};
</script>

<style>
</style>