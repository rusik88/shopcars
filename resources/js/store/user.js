import router from '../router/index';
import { HTTP } from '../app.js';
import { HTTP_LOCAL } from '../app.js'; 

export default {
    state: { 
        user: null
    },
    getters: {
        user(state) {
            return state.user;
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
                //code Auntificate by Api
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