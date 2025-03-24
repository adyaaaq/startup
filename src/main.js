import Vue from 'vue';
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue';
import App from './App.vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueBreadcrumbs from 'vue-2-breadcrumbs';
import VueCookies from 'vue-cookies';
import router from './router';

import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import 'bootstrap/dist/js/bootstrap.bundle.min'; // Import Bootstrap JS (optional)

Vue.config.productionTip = false;
Vue.use(VueCookies);
Vue.use(VueAxios, axios);
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Vue.use(VueBreadcrumbs);
Vue.config.productionTip = false;

new Vue({
    router,
    render: (h) => h(App),
}).$mount('#app');
