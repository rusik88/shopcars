import { HTTP } from '../http.js';

export default {
    state: {
        localLoading: false
    },
    getters: {
        localLoading(state) {
            return state.localLoading
        }
    },
    mutations: { 
        setLocalLoading(state, payload) {
            state.localLoading = payload;
        }
    },
    actions: {
        orderAdd({state, commit}, payload) {
            commit('clearError'); 
            commit('setLocalLoading', true);
            HTTP.post('/order/create', payload)
            .then(resp => {
                commit('setLocalLoading', false);
            })
            .catch(error => {
                commit('setLocalLoading', false);
                commit('setError', error.message); 
            })

        }
    }
}