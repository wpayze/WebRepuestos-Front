import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import BootstrapVue from 'bootstrap-vue'
import KeenUI from 'keen-ui';
import 'keen-ui/dist/keen-ui.css';
import axios from 'axios';
import VueAxios from 'vue-axios';
import PortalVue from 'portal-vue';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.use(VueAxios, axios);
Vue.use(KeenUI);
Vue.use(BootstrapVue);
Vue.use(PortalVue);


Vue.config.productionTip = false;

new Vue({
    router,
    render: h => h(App)
}).$mount("#app");