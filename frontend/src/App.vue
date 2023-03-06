<template>
  <div id="app">
    <Map></Map>
    <LatestAlerts/>
  </div>
</template>

<script>
import Map from "../src/components/Map.vue";
import LatestAlerts from "../src/components/LatestAlerts.vue";
export default {
  name: "App",
  components: { Map, LatestAlerts },
};
</script>

<style></style>
