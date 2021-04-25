/* eslint-disable no-unused-vars*/
import axios from "axios";

axios.defaults.timeout = 60000;  //设置超时时间 60s
// axios.defaults.baseURL = 'http://localhost:9091/api'; //这是调用数据接口
axios.defaults.baseURL = '/api'
axios.defaults.headers = {
  'Content-Type': 'application/json;charset=utf-8'
}

const getTaskOutputCacheCycleApi = '/api/common/task_output_cache_cycle'
const getProcessOptionalApi = '/api/process/optional'

function getTaskOutputCacheCycle(succeedCallback = null) {
  axios.get(getTaskOutputCacheCycleApi)
    .then(function (response) {
      if (succeedCallback !== null) {
        succeedCallback(response.data);
      }
    })
    .catch(function (error) {
    });
}

function getProcessOptional(succeedCallback = null) {
  axios.get(getProcessOptionalApi)
    .then(function (response) {
      if (succeedCallback !== null) {
        succeedCallback(response.data);
      }
    })
    .catch(function (error) {
    });
}

export {
  getTaskOutputCacheCycle,
  getProcessOptional,
}