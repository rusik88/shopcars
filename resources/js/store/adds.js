export default {
    state: {
        adds: [
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
    mutations: {},
    actions: {},
    getters: { 
        adds(state) {
            return state.adds;
        },
        promoAdds(state) {
            return state.adds.filter(add => {
                return add.promo;
            })
        },
        myAdds(state) {
            return state.adds;
        },
        adById (state) { 
           return adId => state.adds.find(ad => ad.id === +adId);
        }
    }
}