import Vue from 'vue'
import App from './App.vue'
import store from './store'

import { VueMaskDirective } from 'v-mask'
Vue.directive('mask', VueMaskDirective);

import Vuelidate from 'vuelidate';
Vue.use(Vuelidate);

import { Button, Field, Input, Select, Icon, Modal, Loading, Toast } from 'buefy'

Vue.use(Button);
Vue.use(Field);
Vue.use(Input);
Vue.use(Select);
Vue.use(Icon);
Vue.use(Modal);
Vue.use(Loading);
Vue.use(Toast);

Vue.config.productionTip = false

import '@/styles/bootstrap.scss'

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
