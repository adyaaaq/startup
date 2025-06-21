import Vue from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueBreadcrumbs from 'vue-2-breadcrumbs';
import VueCookies from 'vue-cookies';
import VueQuillEditor from 'vue-quill-editor';

import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';

Vue.config.productionTip = false;

// 🔌 Use plugins
Vue.use(VueCookies);
Vue.use(VueAxios, axios);
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Vue.use(VueBreadcrumbs);
Vue.use(VueQuillEditor);

// ✅ Toastification setup (✅ FIXED HERE)
Vue.use(Toast, {
    position: 'top-right',
    timeout: 3000,
    closeOnClick: true,
    pauseOnFocusLoss: true,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 0.6,
});

new Vue({
    router,
    render: (h) => h(App),
}).$mount('#app');
