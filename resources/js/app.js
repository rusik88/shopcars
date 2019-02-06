require('./bootstrap');

window.Vue = require('vue');

import App from './App.vue';

import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

import Router from './router/index';
import Store from './store/index';

Vue.use(Vuetify);

const app = new Vue({
    el: '#app',
    render: h => h(App),
    router: Router,
    store: Store
});
