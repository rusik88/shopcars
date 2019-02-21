require('./bootstrap');

window.Vue = require('vue');

import App from './App.vue';

import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import Axios from 'axios';
import Vuelidate from 'vuelidate';

import Router from './router/index';
import Store from './store/index';

Vue.use(Vuetify);
Vue.use(Vuelidate);

export const HTTP = Axios.create({
    baseURL: 'http://shopcars.os/api/',
    headers: {
        Accept: 'application/json',
        Authorization: 'Bearer '+localStorage.getItem('token_auth')
    }
});

const app = new Vue({
    el: '#app',
    data: {},
    render: h => h(App),
    router: Router,
    store: Store
});
