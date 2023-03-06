<template>
  <div id="app">
    <b-row>
      <b-col>
        <LatestAlerts />
      </b-col>
      <b-col>
        <eventMap />
      </b-col>
    </b-row>
    <popUp />
  </div>
</template>

<script>
import LatestAlerts from "./components/LatestAlerts.vue";
import popUp from "./components/eventPopup.vue";
import eventMap from "./components/Map.vue";

export default {
  components: {
    LatestAlerts,
    popUp,
    eventMap,
  },
};
</script>

<style></style>
