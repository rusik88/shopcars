import {HTTP} from '../app.js';

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
                .then(resp => {
                    console.log(payload, resp);
                    state.user = payload; 
                    
                })
            
        }
    },
    actions: {
        userRegister({commit}, payload) {
            commit('userRegisterS', payload);
        }
    }
}