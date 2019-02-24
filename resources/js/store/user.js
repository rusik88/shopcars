import router from '../router/index';
import Vue from 'vue';
import { HTTP } from '../http.js';

export default {
    state: { 
        user: null,
        authStat: false,
        token: localStorage.getItem('token_auth'),
    },
    getters: {
        user(state) {
            return state.user;
        },
        authStat(state) {
            return state.authStat;
        },
        getToken(state) {
            return state.token;
        }
    },
    mutations: {
        userAuthS(state, payload) {
            state.user = payload;
        },
        setAuthStatus(state) {
            state.authStat = localStorage.getItem('token_auth') ? true : false;
        },
        saveToken(state, token) {
            localStorage.setItem('token_auth', token);
            state.token = token; 
        } 
    }, 
    actions: {
        userRegister({commit}, payload) {
            commit('clearError'); 
            commit('setLoading', true);

            HTTP.post('register', payload)
            .then(resp => resp.data) 
            .then(data => {
                commit('setLoading', false);
                if(data.status) {
                    router.push({ path: '/login', query: { register: 'yes' } })
                }
                else {
                    commit('setErrors', data.message); 
                }
            })
            .catch(error => {
                commit('setLoading', false);
                commit('setError', error.message); 
            });
        },
        userAuth({commit}, payload) {

            commit('clearError');
            commit('setLoading', true); 

            const data = {
                grant_type: "password",
                client_id: 2,
                client_secret: "5WdwIYOflfB0p3N4vJIiIuI4ItREQO5W3Avm6LRH",
                username: payload.email, 
                password: payload.password
            }
            HTTP.post('oauth/token', data)
            .then(resp_oauth => {
                commit('saveToken', resp_oauth.data.access_token);
                commit('setAuthStatus'); 
                commit('setLoading', false);
                router.push({ path: '/orders' })
            })
            .catch(error => {
                commit('setLoading', false);
                if(error.response.status == 422 || error.response.status == 400) {
                    commit('setError', 'Password or login are incorected');
                } 
                
            })
        },
        userLogout({commit, state}) {
            commit('setLoading', true);
            const payload = {};
            HTTP.post('logout', {}).then(resp_api => {
                    commit('setLoading', false);
                    localStorage.removeItem('token_auth');
                    commit('setAuthStatus');
                    router.push({ path: '/login' })
                })
                .catch(error => {
                   commit('setLoading', false);
                   commit('setError', 'Logout has errors API');
            })
        } 
    }
} 