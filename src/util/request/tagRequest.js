/* eslint-disable no-unused-vars*/
import axios from "axios";

axios.defaults.timeout = 60000;  //设置超时时间 60s
// axios.defaults.baseURL = 'http://localhost:9091/api'; //这是调用数据接口
axios.defaults.baseURL = '/api'
axios.defaults.headers = {
  'Content-Type': 'application/json;charset=utf-8'
}

const newTagApi = "/api/rss/tag/";
const updateTagApi = "/api/rss/tag/";
const delTagApi = "/api/rss/tag/";
const getTagsApi = "/api/rss/tag/get";

function newTag(formDataSend, succeedCallback = null) {
  axios.post(newTagApi, {
    name: formDataSend.name,
    desc: formDataSend.desc
  })
    .then(function (response) {
      if (succeedCallback !== null) {
        succeedCallback(response.data);
      }
    })
    .catch(function (error) {
    });
}

function updateTag(formDataSend, succeedCallback = null) {
  axios.put(updateTagApi, {
    name: formDataSend.name,
    desc: formDataSend.desc
  })
    .then(function (response) {
      if (succeedCallback !== null) {
        succeedCallback(response.data);
      }
    })
    .catch(function (error) {
    });
}

function delTag(formDataSend, succeedCallback = null) {
  axios.delete(delTagApi, {
    data: {
      name: formDataSend.name,
      id: formDataSend.id
    }
  })
    .then(function (response) {
      if (succeedCallback !== null) {
        succeedCallback(response.data);
      }
    })
    .catch(function (error) {
    });
}

function getTags(formDataSend, succeedCallback = null) {
  axios.post(getTagsApi, {
    pageNum: 0,
    pageSize: 100,
    type: 1,
    typeValue: {}
  })
    .then(function (response) {
      if (succeedCallback !== null) {
        succeedCallback(response.data);
      }
    })
    .catch(function (error) {
    });
}

export {
  newTag,
  updateTag,
  delTag,
  getTags,
}