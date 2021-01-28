import Vue from 'vue'
import App from './App.vue'
import store from './store'

import { VueMaskDirective } from 'v-mask'
Vue.directive('mask', VueMaskDirective);

import Vuelidate from 'vuelidate';
Vue.use(Vuelidate);

import {
  Button,
  Field,
  Input,
  Select,
  Icon,
  Modal,
  Loading,
  Toast,
  Pagination
} from 'buefy'

[Button,
  Field,
  Input,
  Select,
  Icon,
  Modal,
  Loading,
  Toast,
  Pagination]
  .forEach((componentElement) => Vue.use(componentElement));

Vue.config.productionTip = false

import '@/styles/bootstrap.scss'

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
