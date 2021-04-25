/* eslint-disable no-unused-vars*/
import axios from "axios";

axios.defaults.timeout = 60000;  //设置超时时间 60s
// axios.defaults.baseURL = 'http://localhost:9091/api'; //这是调用数据接口
axios.defaults.baseURL = '/api'
axios.defaults.headers = {
  'Content-Type': 'application/json;charset=utf-8'
}

const newTopicApi = "/api/rss/topic/";
const updateTopicApi = "/api/rss/topic/";
const delTopicApi = "/api/rss/topic/";
const getTopicApi = "/api/rss/topic/all";
const topicSearchContentApi = "/api/rss/topic/search"

function newTopic(formDataSend, succeedCallback = null) {
  axios.post(newTopicApi, {
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

function updateTopic(formDataSend, succeedCallback = null) {
  axios.put(updateTopicApi, {
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

function delTopic(formDataSend, succeedCallback = null) {
  axios.delete(delTopicApi, {
    params: {
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

function getTopic(pageNum,pageSize, succeedCallback = null) {
  axios.get(getTopicApi, {
    params: {
      pageNum: pageNum,
      pageSize: pageSize,
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

function topicSearchContent(search, succeedCallback = null) {
  axios.get(topicSearchContentApi, {
    params: {
      content: search
    }
  })

    .then(function (response) {
      // console.log(response.data)
      if (succeedCallback !== null) {
        succeedCallback(response.data);
      }
    })

    .catch(function (error) {
    });
}

export {
  newTopic,
  updateTopic,
  delTopic,
  getTopic,
  topicSearchContent,
}