require('./bootstrap');

window.Vue = require('vue');

import App from './App.vue';

import Vuetify from 'vuetify'; 
import 'vuetify/dist/vuetify.min.css';

import VueAxios from 'vue-axios'
import Vuelidate from 'vuelidate';

import { HTTP } from './http';

import Router from './router/index';
import Store from './store/index';

Vue.use(VueAxios, HTTP);

Vue.use(Vuetify);
Vue.use(Vuelidate);

const app = new Vue({
    el: '#app',
    data: {},
    render: h => h(App),
    router: Router,
    store: Store 
});
