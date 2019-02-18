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
        Authorization: "Bearer token"
    }
});

export const HTTP_LOCAL = Axios.create({
    baseURL: 'http://shopcars.os/',
    headers: {
        Accept: 'application/json'
    }
});

const app = new Vue({
    el: '#app',
    data: {
        http: HTTP
    },
    render: h => h(App),
    router: Router,
    store: Store,
    http: HTTP 
});
