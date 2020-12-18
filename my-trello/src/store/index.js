import Vue from 'vue'
import Vuex from 'vuex'

import actions from './actions'
import mutations from './mutations'
import getter from './getter'
import state from './state'

Vue.use(Vuex)

const store = new Vuex.Store({
    actions,
    mutations,
    getter,
    state
})



export default store