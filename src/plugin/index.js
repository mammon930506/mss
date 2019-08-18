import axios from 'axios';
import {Message, Loading} from "element-ui"

let service = axios.create({
  timeout: 5000,
})

let loadingInstance;
service.interceptors.request.use(
  config => {
    loadingInstance = Loading.service({
      fullscreen:true,
      text: '加载中……',
      // background: 'rgba(0, 0, 0, 0.7)'
    });
    config.headers.Authorization = "authtest";
    setTimeout(() => {
      loadingInstance.close();
    }, 2000)
    return config;
  },
);

export default service
