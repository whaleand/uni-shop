import App from './App'
import {$http} from '@escook/request-miniprogram'
// 挂载到uni
uni.$http=$http
// 请求根路径
$http.baseUrl='https://www.uinav.com'
// 请求拦截器
$http.beforeRequest=function(options){
	uni.showLoading({
		title:'数据加载中...'
	})
}

$http.afterRequest=function(options){
	uni.hideLoading()
}

// 封装弹框方法
uni.$showMsg=function(title="数据请求失败！",duration=1500){
	uni.showToast({
		title,
		duration,
		icon:'none'
	})
}
// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif