import Vue from 'vue';
import Vuex from 'vuex';

import Ads from './ads';
import User from './user';
import Common from './common';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        adds: Ads,
        user: User,
        common: Common
    }
});