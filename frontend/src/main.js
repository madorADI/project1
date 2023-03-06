import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import onlyInt from 'vue-input-only-number';

/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

/* import specific icons */
import { faCirclePlus, faUserSecret } from "@fortawesome/free-solid-svg-icons";

// import { faCirclePlus, faUserSecret } from "@fortawesome/free-light-svg-icons";

/* add icons to the library */
library.add(faUserSecret, faCirclePlus);

/* add font awesome icon component */
Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.use(onlyInt);


Vue.config.productionTip = false;

Vue.use(BootstrapVue);
new Vue({
  render: (h) => h(App),
}).$mount("#app");
