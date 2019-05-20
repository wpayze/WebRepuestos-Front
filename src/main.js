import Vue from "vue";
import App from "./App.vue";
import router from "./router";

import KeenUI from 'keen-ui';
import 'keen-ui/dist/keen-ui.css';
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios);
Vue.use(KeenUI);

Vue.config.productionTip = false;

new Vue({
    router,
    render: h => h(App)
}).$mount("#app");