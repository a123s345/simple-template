import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import '@/plugins/axios'
import '@/plugins/element.js'
import '@/directive'
import '@/plugins/echarts'

Vue.config.productionTip = false

Vue.config.errorHandler = function (err, vm) {
  console.error(`[Error]:${err}`)
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
