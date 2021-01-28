import Vue from 'vue'
import App from './App.vue'
import store from './store'

import { VueMaskDirective } from 'v-mask'
Vue.directive('mask', VueMaskDirective);

import { Button, Field, Input, Select, Icon, Modal, Loading } from 'buefy'

Vue.use(Button);
Vue.use(Field);
Vue.use(Input);
Vue.use(Select);
Vue.use(Icon);
Vue.use(Modal);
Vue.use(Loading);

Vue.config.productionTip = false

import '@/styles/bootstrap.scss'

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
