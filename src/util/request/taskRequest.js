/* eslint-disable no-unused-vars*/
import axios from "axios";

axios.defaults.timeout = 60000;  //设置超时时间 60s
// axios.defaults.baseURL = 'http://localhost:9091/api'; //这是调用数据接口
axios.defaults.baseURL = '/api'
axios.defaults.headers = {
  'Content-Type': 'application/json;charset=utf-8'
}

const getTaskApi = "/api/task/all";
const newTaskApi = "/api/task/rss_task/new";
const delTaskApi = "/api/task/";
const updateTaskApi = "/api/task/";
const allRssTaskFetchNowApi = "/api/task/update_all_rss";
const pauseTaskApi = "";
const resumeTaskApi = "";

function getTask(pageNum,pageSize,succeedCallback = null) {
  axios.get(getTaskApi,{
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

function newTask(formDataSend, succeedCallback = null) {
  // console.log(formDataSend);
  axios.post(newTaskApi, {
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
  axios.delete(delTaskApi, {
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

function updateTask(formDataSend, succeedCallback = null) {
  axios.put(updateTaskApi, {
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
  axios.put(allRssTaskFetchNowApi)
    .then(function (response) {
      if (succeedCallback !== null) {
        succeedCallback(response.data);
      }
    })
    .catch(function (error) {
    });
}

function pauseTask(formDataSend, succeedCallback = null) {
  
}

function resumeTask(formDataSend, succeedCallback = null) {

}

export {
  getTask,
  newTask,
  delTask,
  updateTask,
  allRssTaskFetchNow,
  pauseTask,
  resumeTask,
}