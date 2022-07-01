/* eslint-disable */
import Vue from 'vue'
import Vuex from 'vuex'
import { setItem, getItem } from '@/utils/storage'
Vue.use(Vuex)
const TOUKEY3 = 'TOUTIAO'
export default new Vuex.Store({
  state: {
    // user: JSON.parse(window.localStorage.getItem(TOUKEY3))
    user: getItem(TOUKEY3)
  },
  mutations: {
    setUser(state, data) {
      state.user = data
      // window.localStorage.setItem(TOUKEY3, JSON.stringify(state.user))
      setItem(TOUKEY3, state.user)
    }
  },
  actions: {
  },
  modules: {
  }
})
