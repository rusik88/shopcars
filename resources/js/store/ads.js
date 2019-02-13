export default {
    state: {
        ads: [
            {
                title: 'First Add',
                description: 'Hello I am description',
                promo: false,
                id: 1,
                srcImage: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg'
            },
            {
                title: 'Second Add',
                description: 'Hello I am description',
                promo: false,
                id: 2,
                srcImage: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg'
            },
            {
                title: 'Third Add',
                description: 'Hello I am description',
                promo: true,
                id: 3,
                srcImage: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg'
            },
            {
                title: 'Fourth Add',
                description: 'Hello I am description',
                promo: true,
                id: 4,
                srcImage: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg'
            }
        ]
    },
    mutations: {
        createAd(state, payload) {
            state.ads.push(payload);
        }
    },
    actions: {
        createAd(e, payload) {
            payload.id = parseInt(Math.random() * 1000000)
            e.commit('createAd', payload);
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
        myAds(state) {
            return state.ads;
        },
        adById(state) {
            return adId => {
                return state.ads.find(ad => ad.id === +adId)
            }
        }
    }
}