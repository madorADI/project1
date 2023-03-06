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
  </div>
</template>

<script>
import LatestAlerts from "./components/LatestAlerts.vue";
import eventMap from "./components/Map.vue";

export default {
  components: {
    LatestAlerts,
    eventMap,
  },
};
</script>

<style></style>
