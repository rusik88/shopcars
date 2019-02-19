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
    }
});

HTTP.interceptors.response.use(function (response) {
    if(response.data.token_type) {
        HTTP.defaults.headers.common['Authorization'] = response.data.token_type+" "+response.data.access_token;
    } 
    console.log(response);
    return response;
  }, function (error) {
    return Promise.reject(error);
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
