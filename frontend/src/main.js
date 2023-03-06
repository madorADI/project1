import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import onlyInt from 'vue-input-only-number';

Vue.use(onlyInt);

Vue.config.productionTip = false

Vue.use(BootstrapVue);
new Vue({
  render: h => h(App),
}).$mount('#app')
