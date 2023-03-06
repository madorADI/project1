import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    selectedAlertId: 0
  },
  getters: {
  },
  mutations: {
    SET_SELECTED_ALERT_ID(state, selectedAlertId) {
      state.selectedAlertId = selectedAlertId;
    }
  },
  actions: {
    changeSelectedAlertId({ commit }, selectedAlertId) {
      commit("SET_SELECTED_ALERT_ID", selectedAlertId);
    },
  },
  modules: {
  }
})
