<template>
  <div id="home">
    <LatestAlerts />
    <popUp />
    <Map />
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
    Map,
  },
};
</script>
<style scoped></style>
