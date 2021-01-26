import Vue from 'vue'
import App from './App.vue'
import store from './store'

//import { Table, Input } from 'buefy'

Vue.config.productionTip = false

import '@/styles/start.scss'

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
