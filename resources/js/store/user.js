import router from '../router/index';
import { HTTP } from '../app.js';

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
        userRegisterS(state, payload) {
            HTTP.post('register', payload)
                .then(resp => resp.data) 
                .then(data => {
                    if(data.status) {
                        router.push({ path: '/login', query: { register: 'yes' } })
                    }
                });
            
        },
        userAuthS(state, payload) {
           HTTP.post('login', payload)
            .then(resp => console.log(resp.data));
        }
    }, 
    actions: {
        userRegister({commit}, payload) {
            commit('userRegisterS', payload); 
        },
        userAuth({commit}, payload) {
            commit('userAuthS', payload)
        }
    }
}