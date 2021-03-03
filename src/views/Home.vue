<template>
  <div class="home">
    <h2 style="margin: 10px 0px">Welcome to DimLight!</h2>
    <hr />
    <blockquote style="border-left: 5px solid #eeeeee; padding: 10px 20px">
      这是一个尚在完善中的信息聚合系统，欢迎使用
    </blockquote>
    <b-form-textarea
      id="textarea"
      v-model="text"
      placeholder="Enter something..."
      rows="3"
      max-rows="6"
    ></b-form-textarea>
    <b-button squared variant="outline-secondary" @click="newOPMLFeed()">
      Test send OPML content
    </b-button>
    <b-button squared variant="outline-secondary" @click="rssOpmlExport()">
      get opml
    </b-button>

    <hr>
    <hr>
    <b-form-file
      v-model="file1"
      :state="Boolean(file1)"
      placeholder="Choose a file or drop it here..."
      drop-placeholder="Drop file here..."
    ></b-form-file>
    <div class="mt-3">Selected file: {{ file1 ? file1.name : '' }}</div>
    <b-button squared variant="outline-danger" @click="opmlFile()">
      Test OPML file up NOT WORKING!!!!
    </b-button>

    <hr>
    <hr>
    <b-form-textarea
      id="textarea"
      v-model="json"
      placeholder="Enter something..."
      rows="3"
      max-rows="6"
    ></b-form-textarea>
    <b-button squared variant="outline-secondary" @click="newJsonFeed()">
      Test send json content
    </b-button>
    <b-button squared variant="outline-secondary" @click="rssJsonExport()">
      get json
    </b-button>
    
    <hr>
    <hr>
    <b-button squared variant="outline-secondary" @click="getMyFeed()">
      Test Get source list
    </b-button>

    <hr>
    <hr>
    <hr>
    <b-button squared variant="secondary" @click="home_newTag()">
      home_newTag
    </b-button>
    <b-button squared variant="secondary" @click="home_updateTag()">
      home_updateTag
    </b-button>
    <b-button squared variant="secondary" @click="home_delTag()">
      home_delTag
    </b-button>
    <b-button squared variant="secondary" @click="home_getTags()">
      home_getTags
    </b-button>

    <hr>
    <hr>
    <hr>
    <b-button squared variant="secondary" @click="home_newTopic()">
      home_newTopic
    </b-button> 
    <b-button squared variant="secondary" @click="home_updateTopic()">
      home_updateTopic
    </b-button> 
    <b-button squared variant="secondary" @click="home_delTopic()">
      home_delTopic
    </b-button> 
    <b-button squared variant="secondary" @click="home_getTopic()">
      home_getTopic
    </b-button> 

    <hr>
    <hr>
    <hr>
    <b-button squared variant="outline-secondary" @click="newMyTask()">
      Test New Task
    </b-button>
    <b-button squared variant="danger" @click="home_getTask()" >
      home_getTask
    </b-button>
    <b-button squared variant="danger" @click="home_delTask()" >
      home_delTask
    </b-button>
    <b-button squared variant="danger" @click="home_updateTask()" >
      home_updateTask
    </b-button>

    <hr>
    <hr>
    <hr>
    <b-button squared variant="info" @click="home_getContentItem()">
      home_getContentItem
    </b-button>
  </div>
</template>

<script>
// @ is an alias to /src
import { 
  newRSSSource, rssOPMLAdd, getFeedList, rssOpmlExport, rssOpmlFileUp, rssJsonAdd, rssJsonExport ,
  newTag, updateTag, delTag, getTags,
  newTopic, updateTopic, delTopic, getTopic,
  getTask, newTask, delTask, updateTask,
  getContentItem
} from "@/util/request";
export default {
  name: "Home",
  data() {
    return {
      text: "",
      file1: null,
      json: ""
    };
  },
  methods: {
    newFeed() {
      newRSSSource(null, this.$bvToast);
    },
    getMyFeed() {
      // eslint-disable-next-line no-unused-vars
      var feedData = getFeedList()
    },
    newOPMLFeed() {
      rssOPMLAdd(this.text, this.$bvToast)
    },
    opmlFile(){ // not working!!!
      rssOpmlFileUp(this.file1,this.makeToast);
    }, 
    rssOpmlExport(){
      rssOpmlExport();
    },
    newJsonFeed(){
      rssJsonAdd(this.json, this.makeToast)
    },
    rssJsonExport(){
      rssJsonExport();
    },

    home_newTag() {
      newTag({
        name: "testName",
        desc: "testDesc"
      });
    },
    home_updateTag() {
      updateTag({
        name: "testName",
        desc: "testDescnew2"
      });
    },
    home_delTag() {
      delTag({
        name: "testName",
        id: 14
      });
    },
    home_getTags() {
      getTags();
    },

    home_newTopic() {
      newTopic({
        name: "testTopic",
        desc: "topic test desc"
      })
    },
    home_updateTopic() {
      updateTopic({
        name: "testTopic",
        desc: "topic test desc 2"
      })
    },
    home_delTopic() {
      delTopic({
        name: "testTopic",
        id: 6
      })
    },
    home_getTopic() {
      getTopic()
    },

    newMyTask() {
      newTask({
        schedule: "0 */1 * * * ?", // 每1分钟一次
        name: "测试任务",
        group: "测试",
        descUser: "测试任务描述",
        cacheCycle: -1,
        autoDownload: true,
        startTask: true,
        rssSourceId: 1,
      });
    },

    home_getTask() {
      getTask()
    },
    home_delTask() {
      delTask({
        id:1
      })
    },
    home_updateTask() {
      updateTask({
        id: 1,
        schedule: "0 */2 * * * ?", // 每2分钟一次
        name: "测试任务120",
        group: "测试120",
        descUser: "测试任务描述120",
        cacheCycle: -1,
        autoDownload: true,
        startTask: true,
        rssSourceId: 1,
      })
    },

    home_getContentItem() {
      getContentItem()
    },

    makeToast(variant = null) {
      this.$bvToast.toast("Toast body content", {
        title: `Variant ${variant || "default"}`,
        variant: variant,
        solid: true,
      });
    },
  },
};
</script>
