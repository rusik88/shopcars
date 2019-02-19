import router from '../router/index';
import { HTTP, HTTP_LOCAL } from '../app.js';

export default {
    state: { 
        user: null,
        authStat: false
    },
    getters: {
        user(state) {
            return state.user;
        },
        authStat(state) {
            return localStorage.getItem('token_auth') ? true : false;
        }
    },
    mutations: {
        userAuthS(state, payload) {
            state.user = payload;
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

            HTTP_LOCAL.post('login', payload)
            .then(resp => {
                const data = {
                    grant_type: "password",
                    client_id: 2,
                    client_secret: "5WdwIYOflfB0p3N4vJIiIuI4ItREQO5W3Avm6LRH",
                    username: payload.email, 
                    password: payload.password
                }
                HTTP_LOCAL.post('oauth/token', data)
                .then(resp_oauth => {
                    localStorage.setItem('token_auth', resp_oauth.data.access_token);
                    commit('setLoading', false);
                    router.push({ path: '/orders' })
                })
            })
            .catch(error => {
                commit('setLoading', false);
                if(error.response.status == 422 || error.response.status == 400) {
                    commit('setError', 'Password or login are incorected');
                } 
                
            })
        }
    }
}