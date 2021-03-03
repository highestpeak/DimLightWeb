/* eslint-disable no-unused-vars*/
import axios from "axios";

axios.defaults.timeout = 60000;  //设置超时时间 60s
// axios.defaults.baseURL = 'http://localhost:9091/api'; //这是调用数据接口
axios.defaults.baseURL = '/api'
axios.defaults.headers = {
  'Content-Type': 'application/json;charset=utf-8'
}
const token = "lxhjoi2974o0snxgt"

function randomString(e) {
  e = e || 32;
  var t = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678",
    a = t.length,
    n = "";
  for (let i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a));
  return n
}

function randomHexColor() { //随机生成十六进制颜色
  var hex = Math.floor(Math.random() * 16777216).toString(16); //生成ffffff以内16进制数
  while (hex.length < 6) { //while循环判断hex位数，少于6位前面加0凑够6位
    hex = '0' + hex;
  }
  return '#' + hex; //返回‘#’开头16进制颜色
}

/* rss */

function getFeedList(succeedCallback = null) {
  axios.post('/api/rss/source/get', {
    pageNum: 0,
    pageSize: 100,
    type: 1,
    typeValue: {}
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

  axios.post('/api/rss/source/', formDataSend)
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
  // formDataSend.jsonOptionalExtraFields = JSON.stringify(formDataSend.jsonOptionalExtraFields)

  axios.put('/api/rss/source/', formDataSend)

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
  axios.delete('/api/rss/source/' + token, {
    data: {
      "id": rssSource.id,
      "titleParse": rssSource.titleParse,
      "titleUser": rssSource.titleUser
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
  axios.post('/api/rss/source/opml', formDataSend)

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
  axios.post('/api/rss/source/opml/file', formData, {
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
  axios.post('/api/rss/source/json', formDataSend)
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
  axios.get("/api/rss/source/json", {
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

/* tag */

function newTag(formDataSend, succeedCallback = null) {
  axios.post('/api/rss/tag/', {
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
  axios.put('/api/rss/tag/', {
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
  axios.delete('/api/rss/tag/' + token, {
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
  axios.post('/api/rss/tag/get', {
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

/* topic */

function newTopic(formDataSend, succeedCallback = null) {
  axios.post('/api/rss/topic/', {
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
  axios.put('/api/rss/topic/', {
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
  axios.delete('/api/rss/topic/' + token, {
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

function getTopic(formDataSend, succeedCallback = null) {
  axios.post('/api/rss/topic/get', {
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

/* task */

function getTaskList() {
  var mockData = []
  for (let index = 0; index < 100; index++) {
    var len = Math.ceil(Math.random() * 5)
    var randomType = []
    for (let index = 0; index < len; index++) {
      randomType.push(randomString(5))
    }
    mockData.push({
      id: index,
      title: {
        text: randomString(10),
        id: index
      },
      schedule: randomString(10),
      lifeCycle: randomString(10),
      cacheCycle: randomString(10),
      autoDownload: Boolean(Math.round(Math.random())),
      nextEvent: randomString(10),
    })
  }

  return mockData
}

function getTask(succeedCallback = null) {
  axios.post('/api/rss/task/get',{
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

function newTask(formDataSend, succeedCallback = null) {
  // console.log(formDataSend);
  axios.post('/api/rss/task/', {
    schedule: formDataSend.schedule,
    name: formDataSend.name,
    group: formDataSend.group,
    descUser: formDataSend.descUser,
    cacheCycle: formDataSend.cacheCycle,
    lastEvent: formDataSend.lastEvent,
    autoDownload: formDataSend.autoDownload,
    startTask: formDataSend.startTask,
    rssSourceId: formDataSend.rssSourceId,
    fetchNow: formDataSend.fetchNow,
  })
    .then(function (response) {
      if (succeedCallback !== null) {
        succeedCallback(response.data);
      }
    })
    .catch(function (error) {
    });
}

function delTask(formDataSend, succeedCallback = null) {
  axios.delete('/api/rss/task/' + token, {
    data: {
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

function updateTask(formDataSend, succeedCallback = null) {
  axios.put('/api/rss/task/', {
    id: formDataSend.id,
    schedule: formDataSend.schedule,
    name: formDataSend.name,
    group: formDataSend.group,
    descUser: formDataSend.descUser,
    cacheCycle: formDataSend.cacheCycle,
    lastEvent: formDataSend.lastEvent,
    autoDownload: formDataSend.autoDownload,
    startTask: formDataSend.startTask,
    rssSourceId: formDataSend.rssSourceId,
  })
    .then(function (response) {
      if (succeedCallback !== null) {
        succeedCallback(response.data);
      }
    })
    .catch(function (error) {
    });
}

function allRssTaskFetchNow(succeedCallback = null) {
  axios.put('/api/rss/task/update_all_rss')
    .then(function (response) {
      if (succeedCallback !== null) {
        succeedCallback(response.data);
      }
    })
    .catch(function (error) {
    });
}

/* 枚举值 */
function getTaskOutputCacheCycle(succeedCallback = null) {
  axios.get('/api/common/task_output_cache_cycle')
    .then(function (response) {
      if (succeedCallback !== null) {
        succeedCallback(response.data);
      }
    })
    .catch(function (error) {
    });
}

/** 通过rss来进行操作 */

function pauseTask(formDataSend, succeedCallback = null) {
  
}

function resumeTask(formDataSend, succeedCallback = null) {

}

/* contentitem */
function getContentItem(formDataSend, succeedCallback = null) {
  axios.get('/api/rss/content_item/list',{
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

function getEventsList(succeedCallback = null) {
  axios.get('/api/events/list',{
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

function clearEvents(succeedCallback = null) {
  axios.post('/api/events/clear')
    .then(function (response) {
      if (succeedCallback !== null) {
        succeedCallback(response.data);
      }
    })
    .catch(function (error) {
    });
}

/*todo: 设置足够长的拉取时间，防止后面正在拉取然后超时 */
export {
  newRSSSource, getFeedList, rssOPMLAdd, delRSSSource, rssOpmlExport, updateRSSSource, rssOpmlFileUp, rssJsonAdd, rssJsonExport,
  newTag, updateTag, delTag, getTags,
  newTopic, updateTopic, delTopic, getTopic,
  getTaskList, getTask, newTask, delTask, updateTask,
  getContentItem, getTaskOutputCacheCycle, getEventsList, clearEvents, allRssTaskFetchNow
}