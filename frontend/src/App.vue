<template>
  <div id="app">
    <LatestAlerts/>
    <popUp />
    <Map></Map>
  </div>
</template>

<script>
import LatestAlerts from "./components/LatestAlerts.vue";
import popUp from "./components/eventPopup.vue";
import Map from "./components/Map.vue";

export default {
  components: {
    LatestAlerts,
    popUp,
    Map
  },

}
</script>

<style></style>
