/* eslint-disable no-unused-vars*/
import axios from "axios";

axios.defaults.timeout = 60000;  //设置超时时间 60s
// axios.defaults.baseURL = 'http://localhost:9091/api'; //这是调用数据接口
axios.defaults.baseURL = '/api'
axios.defaults.headers = {
  'Content-Type': 'application/json;charset=utf-8'
}

const getContentItemApi = '/api/rss/content_item/list'
const getRssContentItemApi = '/api/rss/content_item/target_rss'
const clearTargetRssContentItemApi = '/api/rss/content_item/del_target_rss'
const fetchRssContentItemNowApi = '/api/process/fetch_rss_now'

const getTopicContentItemApi = '/api/content_item/target_topic'

function getContentItem(formDataSend, succeedCallback = null) {
  axios.get(getContentItemApi,{
    params: {
      pageNum: 0,
      pageSize: 100
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

function getRssContentItem(rssId,num, succeedCallback = null) {
  axios.get(getRssContentItemApi,{
    params: {
      rssId: rssId,
      num: num,
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

function clearTargetRssContentItem(rssId, succeedCallback=null) {
  console.log(rssId);
  axios.get(clearTargetRssContentItemApi,{
    params: {
      id: rssId,
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

function fetchRssContentItemNow(rssId, succeedCallback=null) {
  axios.get(fetchRssContentItemNowApi,{
    params: {
      id: rssId,
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

/* topic */

function getTopicContentItem(topicId, num, succeedCallback=null) {
  axios.get(getTopicContentItemApi,{
    params: {
      topicId: topicId,
      num: num,
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
function clearTargetTopicContentItem(topicId, succeedCallback=null) {

}
function fetchTopicContentItemNow(topicId, succeedCallback=null) {

}

export {
  getContentItem,
  getRssContentItem,
  clearTargetRssContentItem,
  fetchRssContentItemNow,
  getTopicContentItem,
  clearTargetTopicContentItem,
  fetchTopicContentItemNow,
}
