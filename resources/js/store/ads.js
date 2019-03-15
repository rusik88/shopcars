import { HTTP } from '../http.js';
import router from '../router/index';

export default {
    state: { 
        ads: []
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
                    state.ads[index].description = payload.description;
                    state.ads[index].image = payload.image;
                    state.ads[index].promo = payload.promo;
                    state.ads[index].title = payload.title;
                    state.ads[index].updated_at = payload;
                    state.ads[index].created_at = payload.created_at;
                }
           }
        },
        clearAds(state) {
            state.ads = [];
        }
    },
    actions: {

        updateAd({commit}, payload) {
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
                if(resp.data.file) {
                    payload.image = resp.data.file;
                }

                HTTP.post('ad/update/'+payload.id, payload)
                .then(resp => {
                    commit('setLoading', false);
                    commit('setAdsUpdate', resp.data.ad);
                })
                .catch(error => {
                    commit('setError', error.message);
                    commit('setLoading', false); 
                })
            }) 
            .catch(error => {
                commit('setError', error.message);
                commit('setLoading', false);  
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
        }
    },
    getters: { 
        ads(state) {
            return state.ads; 
        },
        promoAds(state) {
            return state.ads.filter(ad => {
                return ad.promo;
            })
        },
        myAds(state, getters) { 
            return state.ads.filter(ad => ad.user_id == getters.user.id);
            //return state.ads;
        },
        adById(state) {
            return adId => {
                return state.ads.find(ad => ad.id === +adId)
            }
        }
    }
}