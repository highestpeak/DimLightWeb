/* eslint-disable no-unused-vars*/
import axios from "axios";

axios.defaults.timeout = 60000;  //设置超时时间 60s
// axios.defaults.baseURL = 'http://localhost:9091/api'; //这是调用数据接口
axios.defaults.baseURL = '/api'
axios.defaults.headers = {
  'Content-Type': 'application/json;charset=utf-8'
}

const getFeedListApi = "/api/rss/source/all";
const newRssApi = "/api/rss/source/";
const updateRssApi = "/api/rss/source/";
const delRssApi = "/api/rss/source/";
const rssOPMLAddApi = '/api/rss/source/opml';
const rssOpmlExportApi = '/api/rss/source/opml';
const rssOpmlFileUpApi = '/api/rss/source/opml/file';
const rssJsonAddApi = '/api/rss/source/json';
const rssJsonExportApi = '/api/rss/source/json';
const rssSearchContentApi = '/api/rss/source/search';

function getFeedList(pageNum,pageSize,succeedCallback = null) {
  axios.get(getFeedListApi, {
    params: {
      pageNum: pageNum,
      pageSize: pageSize,
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

function newRSSSource(formDataArgs, succeedCallback = null) {
  var formDataSend = Object.assign({}, formDataArgs);
  formDataSend.titleUser = formDataSend.title
  delete formDataSend.title
  formDataSend.descUser = formDataSend.desc
  delete formDataSend.desc
  formDataSend.jsonOptionalExtraFields = JSON.stringify(formDataSend.jsonOptionalExtraFields)

  axios.post(newRssApi, formDataSend)
    .then(function (response) {
      if (succeedCallback !== null) {
        succeedCallback(response.data);
      }
    })
    .catch(function (error) {
    });
}

// todo: 这里的parse和user字段应该区分开，否则会把parse作为user输入传到后端
function updateRSSSource(formDataArgs, succeedCallback = null) {
  var formDataSend = Object.assign({}, formDataArgs);
  formDataSend.titleUser = formDataSend.title
  delete formDataSend.title
  formDataSend.descUser = formDataSend.desc
  delete formDataSend.desc
  formDataSend.jsonOptionalExtraFields = JSON.stringify(formDataSend.jsonOptionalExtraFields)

  axios.put(updateRssApi, formDataSend)

    .then(function (response) {
      if (succeedCallback !== null) {
        succeedCallback(response.data);
      }
    })
    .catch(function (error) {
      console.log(error.data);
    });
}

function delRSSSource(rssSource, succeedCallback = null) {
  axios.delete(delRssApi, {
    params: {
      "id": rssSource.id,
    }
  })
    .then(function (response) {
      console.log(response.data);
      if (succeedCallback !== null) {
        succeedCallback();
      }
    })
    .catch(function (response) {
      console.log(response);
    });
}

function rssOPMLAdd(formDataSend, bvToastInstance = null) {
  // string 为空的判断
  formDataSend = {
    "opmlString": formDataSend
  }
  axios.post(rssOPMLAddApi, formDataSend)

    .then(function (response) {
      console.log(response.data);
    })

    .catch(function (error) {
      bvToastInstance.toast('Toast body content', {
        title: 'default',
        variant: 'danger',
        solid: true
      })
    });
}

function rssOpmlExport() {
  axios.get("/api/rss/source/opml", { responseType: 'blob' })
    .then(function (response) {
      // console.log(response);
      const link = document.createElement('a');
      link.href = URL.createObjectURL(response.data);
      link.download = "feeds.opml";
      link.click();
    })
    .catch(function (response) {
      console.log(response);
    });
}

function rssOpmlFileUp(file, succeedCallback = null) {
  var formData = new FormData();
  formData.append("opmlFile", file);
  axios.post(rssOpmlFileUpApi, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }).then(function (response) {
    if (succeedCallback !== null) {
      succeedCallback();
    }
  })
    .catch(function (error) {
      console.log(error.data);
    });
}

function rssJsonAdd(formDataSend, succeedCallback = null) {
  // string 为空的判断
  axios.post(rssJsonAddApi, formDataSend)
    .then(function (response) {
      console.log(response.data);
      if (succeedCallback !== null) {
        succeedCallback();
      }
    })
    .catch(function (error) {
    });
}

function rssJsonExport() {
  axios.get(rssJsonExportApi, {
    responseType: 'blob'
  })
    .then(function (response) {
      // console.log(response.data);
      const link = document.createElement('a');
      link.href = URL.createObjectURL(response.data);
      link.download = "dimlight.json";
      link.click();
    })
    .catch(function (response) {
      console.log(response);
    });
}

function rssSearchContent(search, succeedCallback = null) {
  axios.get(rssSearchContentApi, {
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
  getFeedList,
  newRSSSource,
  updateRSSSource,
  delRSSSource,
  rssOPMLAdd,
  rssOpmlExport,
  rssOpmlFileUp,
  rssJsonAdd,
  rssJsonExport,
  rssSearchContent,
}