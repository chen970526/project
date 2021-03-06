import Vue from 'vue'
import App from './App.vue'
import router from '@/router/index.js'
import '@/styles/reset.css'
import {
  Toast,
  Icon,
  Uploader,
  Dialog,
  Field,
  Picker,
  Tab,
  Tabs,
  List,
  PullRefresh
} from 'vant'
Vue.config.productionTip = false
Vue.use(Toast)
Vue.use(Icon)
Vue.use(Uploader)
Vue.use(Dialog)
Vue.use(Field)
Vue.use(Picker)
Vue.use(Tab)
Vue.use(Tabs)
Vue.use(List)
Vue.use(PullRefresh)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
