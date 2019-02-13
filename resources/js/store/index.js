import Vue from 'vue';
import Vuex from 'vuex';

import Ads from './ads';
import User from './user';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        adds: Ads,
        user: User
    }
});