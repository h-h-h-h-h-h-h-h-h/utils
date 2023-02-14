import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    confidenceText:''
  },
  getters: {
  },
  mutations: {
    cConfidenceText(state,str){
      state.confidenceText = str
    }
  },
  actions: {
  },
  modules: {
  }
})
