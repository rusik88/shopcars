import { HTTP } from '../http.js';
import router from '../router/index';

export default {
    state: { 
        ads: [],
        ad: null,
        localLoad: false
    },
    mutations: {
        createAd(state, payload) {
            state.ads.push(payload); 
        },
        setAds(state, payload) {
            state.ads = payload;
        },
        setAdsUpdate(state, payload) {
           for (let index in state.ads) {
                if(state.ads[index].id == payload.id) {
                    state.ads[index] = {...payload}
                }
           }
           if(state.ad != null) {
               state.ad = {...payload}
           }
        },
        clearAds(state) {
            state.ads = []; 
        },
        setAd(state, payload) {
            state.ad = payload;
        },
        setLocalLoad(state, payload) {
            state.localLoad = payload;
        },
        deleteAdFromState(state, payload) {
            for (let index in state.ads) {
                if(state.ads[index].id == payload.id) {
                    state.ads.splice(index, 1); 
                }
            } 
        }
    },
    actions: {

        updateAd({commit}, payload) {
            let formData = new FormData();
            formData.append('image', payload.image);
            commit('clearError');
            commit('setLocalLoad', true);
            HTTP.post('ad/upload-file', formData, {
                headers: {
                    "Content-type": "multipart/form-data; charset=utf-8; boundary="+Math.random().toString().substr(2)
                }
            })
            .then(resp => { 
                if(resp.data.file) {
                    payload.image = resp.data.file;
                }

                HTTP.post('ad/update/'+payload.id, payload)
                .then(resp => {
                    commit('setLocalLoad', false);
                    commit('setAdsUpdate', resp.data.ad);
                })
                .catch(error => {
                    commit('setError', error.message);
                    commit('setLocalLoad', false); 
                })
            }) 
            .catch(error => {
                commit('setError', error.message);
                commit('setLocalLoad', false);  
            });
        },


        createAd({commit}, payload) {
            let formData = new FormData();
            formData.append('image', payload.image);
            commit('clearError');
            commit('setLoading', true); 
            HTTP.post('ad/upload-file', formData, {
                headers: {
                    "Content-type": "multipart/form-data; charset=utf-8; boundary="+Math.random().toString().substr(2)
                }
            })
            .then(resp => {
                if(resp) {
                    if(resp.data.status) {
                        payload.image = resp.data.file; 
                        HTTP.post('ad/create', payload) 
                        .then(resp => {
                            commit('setLoading', false);
                            commit('createAd', resp.data.ad);
                            router.push('/list');
                        })
                        .catch(error => {
                            commit('setError', error.message);
                            commit('setLoading', false); 
                        })
                    }
                    else {
                        commit('setError', resp.data.message);
                        commit('setLoading', false); 
                    }
                }
            }) 
            .catch(error => {
                commit('setError', error.message);
                commit('setLoading', false);  
            });
        },
        fetchAds({commit}) {
            commit('clearError');
            commit('setLoading', true);
            HTTP.get('ad')
            .then(resp => {
                commit('setAds', resp.data.ads);
                commit('setLoading', false); 
            })
            .catch(error => {
                commit('setLoading', false);
            })
        },
        getAdById({commit}, payload) {
            commit('clearError');
            commit('setLoading', true);
            HTTP.get('ad/'+payload)
            .then(resp => {
                commit('setLoading', false);
                commit('setAd', resp.data.ad)
            })
            .catch(error => {
                commit('setError', error.message);
                commit('setLoading', false);  
            });
        },
        deleteAd({commit}, payload) {
            commit('clearError');
            commit('setLocalLoad', true);
            HTTP.post('ad/delete', payload)
            .then(resp => {
                commit('setLoading', false);
                commit('deleteAdFromState', payload)
                router.push({path: '/list'}); 
            })
            .catch(error => {
                commit('setError', error.message);
                commit('setLocalLoad', false);  
            });
        }
    },
    getters: { 
        ads(state) {
            return state.ads; 
        },
        myAds(state, getters) { 
            return state.ads.filter(ad => ad.user_id == getters.user.id);
        },
        ad(state) {
            return state.ad;
        }
    }
}