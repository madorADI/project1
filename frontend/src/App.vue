<template>
  <div id="app">
    <Header></Header>
    <button @click="showDroneAlert">hello</button>
    <b-row>
      <LatestAlerts class="front m-4" @changeFiltered="changeFiltered" />
      <eventMap class="back" :markers="filteredTable" />
    </b-row>
  </div>
</template>

<script>
import LatestAlerts from "./components/LatestAlerts.vue";
import Header from "./components/header.vue";
import eventMap from "./components/Map.vue";
import Swal from "sweetalert2";

export default {
  components: {
    LatestAlerts,
    Header,
    eventMap,
  },
  data() {
    return {
      filteredTable: [],
    };
  },
  methods: {
    changeFiltered(table) {
      this.filteredTable = table;
    },
    showDroneAlert() {
      Swal.fire({
        icon: 'warning',
        title: 'התראה על רחפן',
        text: 'רחפן נמצא במיקום',
        showCancelButton: true,
        showConfirmButton: false,
        cancelButtonText: 'קיבלתי',
      })
    }
  },
};
</script>

<style scope>
.front {
  position: fixed;
  z-index: 1;
  width: fit-content;
  height: fit-content;
  left: 65%;
  margin-top: 5%;
}

.back {
  z-index: -1;
  position: fixed;
}
</style>
