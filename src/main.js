import Vue from 'vue'
import App from './App.vue'
import store from './store'

import { Button, Field, Input, Select, Icon, Modal } from 'buefy'

Vue.use(Button);
Vue.use(Field);
Vue.use(Input);
Vue.use(Select);
Vue.use(Icon);
Vue.use(Modal);

Vue.config.productionTip = false

import '@/styles/start.scss'

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
