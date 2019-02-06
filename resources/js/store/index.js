import Vue from 'vue';
import Vuex from 'vuex';

import Adds from './adds';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        adds: Adds
    }
});