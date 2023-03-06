<template>
  <div id="app">
    <Header></Header>
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
import Header from "./components/header.vue";
import eventMap from "./components/Map.vue";

export default {
  components: {
    LatestAlerts,
    Header,
    eventMap,
  },
};
</script>

<style></style>
