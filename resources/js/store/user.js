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
            return state.authStat;
        }
    },
    mutations: {
        userAuthS(state, payload) {
            state.user = payload;
        },
        setAuthStatus(state) {
            state.authStat = localStorage.getItem('token_auth') ? true : false;
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
                client_secret: "aQw9scra7kqmkXmnyeMcOHJ3XGTD7wJ991ZD1vLV",
                username: payload.email, 
                password: payload.password
            }
            HTTP.post('oauth/token', data)
            .then(resp_oauth => {
                localStorage.setItem('token_auth', resp_oauth.data.access_token);
                
                commit('setAuthStatus'); 
                commit('setLoading', false);
                //router.push({ path: '/orders' })
            })

            /*HTTP_LOCAL.post('login', payload)
            .then(resp => {
                const data = {
                    grant_type: "password",
                    client_id: 2,
                    client_secret: "aQw9scra7kqmkXmnyeMcOHJ3XGTD7wJ991ZD1vLV",
                    username: payload.email, 
                    password: payload.password
                }
                HTTP_LOCAL.post('oauth/token', data)
                .then(resp_oauth => {
                    localStorage.setItem('token_auth', resp_oauth.data.access_token);
                    commit('setAuthStatus'); 
                    commit('setLoading', false);
                    router.push({ path: '/orders' })
                })
            })*/
            .catch(error => {
                commit('setLoading', false);
                if(error.response.status == 422 || error.response.status == 400) {
                    commit('setError', 'Password or login are incorected');
                } 
                
            })
        },
        userLogout({commit}) {

            commit('setLoading', true);

            const payload = {}; 

            HTTP.post('logout', payload)
                .then(resp_api => {
                    commit('setLoading', false);
                    localStorage.removeItem('token_auth');
                    commit('setAuthStatus');
                })
                .catch(error => {
                    commit('setLoading', false);
                   commit('setError', 'Logout has errors API');
            })

            /*HTTP_LOCAL.post('logout', payload)
            .then(resp => { 
                commit('setLoading', false);
                //HTTP.post('logout', payload)
                //.then(resp_api => {
                //    commit('setLoading', false);
                //    router.push({ path: '/login', query: {logout: 'yes'} });
               // })
                //.catch(error => {
                //    commit('setLoading', false);
               //    commit('setError', 'Logout has errors API');
               // })
            })
            .catch(error => {
                commit('setLoading', false);
                commit('setError', 'Logout has errors Local');
            })*/
        } 
    }
}