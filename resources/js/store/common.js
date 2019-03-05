import { HTTP } from '../http'; 

export default {
    state: {
        loading: false,
        error: null
    },
    mutations: {
        setLoading(state, payload) {
            state.loading = payload
        },
        setError(state, payload) {
            state.error = payload
        },
        clearError(state) {
            state.error = null
        }

    },
    actions: {
        seLoading({commit}, payload) {
            commit('setLoading', payload)
        },
        setError({commit}, payload) {
            commit('setError', payload);
        },
        clearError({commit}) {
            commit('clearError');
        },
        init({commit}, state) {
            HTTP.get('check-token')
            .then(resp => {
                commit('userAuthS', resp.data.user)
            })
            .catch(error => {
                commit('clearToken'); 
            })
        },
        disconect({commit, dispatch}, state) {
            commit('clearToken');
        }
    },
    getters: {
        loading(state) {
            return state.loading;
        },
        error(state) {
            return state.error;
        }
    }
}