import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faBomb } from '@fortawesome/free-solid-svg-icons'
import store from './store'

Vue.use(BootstrapVue);

library.add(faBomb)

Vue.component('font-awesome-icon', FontAwesomeIcon)


Vue.config.productionTip = false

Vue.use(BootstrapVue);
new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
