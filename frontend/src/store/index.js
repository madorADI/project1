import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    selectedLat: 0,
    selectedLng: 0,
    selectedAlertId: 0

  },
  mutations: {
    SET_SELECTED_LAT(state, selectedLat) {
      state.selectedLat = selectedLat;
    },
    SET_SELECTED_LNG(state, selectedLng) {
      state.selectedLng = selectedLng;
    },
    SET_SELECTED_ALERT_ID(state, selectedAlertId) {
      state.selectedAlertId = selectedAlertId;
    }
  },
  actions: {
    changeSelectedLat({ commit }, selectedLat) {
      commit("SET_SELECTED_LAT", selectedLat);
    },
    changeSelectedLng({ commit }, selectedLng) {
      commit("SET_SELECTED_LNG", selectedLng);
    },
      changeSelectedAlertId({ commit }, selectedAlertId) {
      commit("SET_SELECTED_ALERT_ID", selectedAlertId);
    },
  },

})
