import axios from 'axios'

const baseURL = ''
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    // store.commit("changeLoading",true)
    // console.log("拦截器token=>", store.state.token);
    // config.headers.token = store.state.token;
    console.log(config)
    return config;
}, function (error) {
    return Promise.reject(error);
});
// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    console.log("响应拦截器", response)
    // store.commit("changeLoading",false)
    if (response.data.code == 47002) {
        Toast("登录过期，请重新登录")
        router.push("login")
    }else if(response.data.code == 46002){
        router.push("scan")
    }
    return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

function http(url, data, method, params) {
    if (method == "GET"||method=="get") {
        return axios({
            url: baseURL + url,
            data,
            method,
            params,
        })
    }

}

export default http