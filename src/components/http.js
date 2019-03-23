import axios from 'axios'


const HttpServer = {};

HttpServer.install = function (Vue) {
  // 添加实例方法



  axios.defaults.baseURL = "http://localhost:8888/api/private/v1/"

  axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么

    if (config.url !== "login") {
      const AUTH_TOKEN = localStorage.getItem("token");
      config.headers["Authorization"] = AUTH_TOKEN
      // axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;
    }


    return config;

  }, function (error) {
    // 对请求错误做些什么

    return Promise.reject(error);
  });


  Vue.prototype.$http = axios

  //   Vue.prototype.$myMethod = function (methodOptions) {
  //     // 逻辑...
  //   }
}
export default HttpServer
