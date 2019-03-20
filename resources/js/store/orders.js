import { HTTP } from '../http.js';
import router from '../router/index';

export default {
    state: {
        localLoading: false,
        textSuccesfullOrder: true,
        ordersAll: []
    },
    getters: {
        localLoading(state) {
            return state.localLoading
        },
        textSuccesfullOrder(state) {
            return state.textSuccesfullOrder;
        },
        ordersAll(state) {
            return state.ordersAll;
        }
    },
    mutations: { 
        setLocalLoading(state, payload) {
            state.localLoading = payload;
        },
        setTextSuccesfullOrder(state, payload) {
            state.textSuccesfullOrder = payload;
        },
        setOrders(state, payload) { 
            state.ordersAll = payload; 
        },
        setDoneOrder(state, payload) {
            for(let key in state.ordersAll) {
                if(state.ordersAll[key] == payload.id) state.ordersAll[key].done = payload.done;
            }
        },
        addOrderToState(state, payload) {
            state.ordersAll.unshift({...payload});
        }
    },
    actions: {
        orderAdd({state, commit}, payload) {
            commit('clearError'); 
            commit('setLocalLoading', true);
            HTTP.post('/order/create', payload)
            .then(resp => {
                commit('setLocalLoading', false);
                if(state.ordersAll.length > 0) {
                    commit('addOrderToState', resp.data.order);
                }
                commit('setTextSuccesfullOrder', resp.data.message);
            })
            .catch(error => {
                commit('setLocalLoading', false);
                commit('setError', error.message); 
            })

        },
        allOrders({commit}) {
            commit('clearError'); 
            commit('setLocalLoading', true);

            HTTP.get('order/all').then(resp => {
                commit('setLocalLoading', false);
                commit('setOrders', resp.data.orders);
            })
            .catch(error => {
                commit('setLocalLoading', false);
                commit('setError', error.message); 
            })
        },
        updateOrderDone({commit}, payload) {
            commit('clearError'); 
            HTTP.post('order/done', payload)
            .then(resp => {
                commit('setDoneOrder', resp.data)
            })
            .catch(error => {
                commit('setLocalLoading', false);
                commit('setError', error.message); 
            })
        }
    }
}