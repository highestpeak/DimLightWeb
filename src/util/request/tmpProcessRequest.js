/* eslint-disable no-unused-vars*/
import axios from "axios";

axios.defaults.timeout = 60000;  //设置超时时间 60s
// axios.defaults.baseURL = 'http://localhost:9091/api'; //这是调用数据接口
axios.defaults.baseURL = '/api'
axios.defaults.headers = {
  'Content-Type': 'application/json;charset=utf-8'
}

const fetchRssAbstractApi = "/api/process/rss_item_summary"
const fetchRssTitleWordSplitApi = "/api/process/rss_item_title_word_segment"
const fecthRssContentWordSplitApi = "/api/process/rss_item_desc_word_segment"
const fetchHtmlTagRemoveApi = "/api/process/rss_item_html_tag_remove"
const fetchRegxFilterApi = "/api/process/rss_item_regx_filter"
const topicDuplicateRemoveApi = "/api/process/topic_duplicate_remove"

function fetchRssAbstract(rssId, succeedCallback = null) {
  axios.get(fetchRssAbstractApi, {
    params: {
      rssId: rssId
    }
  })
  .then(function (reponse) {
    if(succeedCallback!==null) {
      succeedCallback(reponse.data)
    }
  })
  .catch(function (error) {
  })
}

function fetchRssTitleWordSplit(rssId, succeedCallback = null) {
  axios.get(fetchRssTitleWordSplitApi, {
    params: {
      rssId: rssId
    }
  })
  .then(function (reponse) {
    if(succeedCallback!==null) {
      succeedCallback(reponse.data)
    }
  })
  .catch(function (error) {
  })
}

function fecthRssContentWordSplit(rssId, succeedCallback = null) {
  axios.get(fecthRssContentWordSplitApi, {
    params: {
      rssId: rssId
    }
  })
  .then(function (reponse) {
    if(succeedCallback!==null) {
      succeedCallback(reponse.data)
    }
  })
  .catch(function (error) {
  })
}

function fetchHtmlTagRemove(rssId, succeedCallback = null) {
  axios.get(fetchHtmlTagRemoveApi, {
    params: {
      rssId: rssId
    }
  })
  .then(function (reponse) {
    if(succeedCallback!==null) {
      succeedCallback(reponse.data)
    }
  })
  .catch(function (error) {
  })
}

function fetchRegxFilter(rssId, succeedCallback = null) {
  axios.get(fetchRegxFilterApi, {
    params: {
      rssId: rssId
    }
  })
  .then(function (reponse) {
    if(succeedCallback!==null) {
      succeedCallback(reponse.data)
    }
  })
  .catch(function (error) {
  })
}

function topicDuplicateRemove(topicId, succeedCallback = null) {
  axios.get(topicDuplicateRemoveApi, {
    params: {
      topicId: topicId
    }
  })
  .then(function (reponse) {
    if(succeedCallback!==null) {
      succeedCallback(reponse.data)
    }
  })
  .catch(function (error) {
  })
}

export {
  fetchRssAbstract,
  fetchRssTitleWordSplit,
  fecthRssContentWordSplit,
  fetchHtmlTagRemove,
  fetchRegxFilter,
  topicDuplicateRemove,
}