<template>
  <div id="app">
    <Header></Header>
    <b-row>
      <LatestAlerts class="front m-5" />
      <eventMap class="back" />
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

<style scope>
.front {
  position: fixed;
  z-index: 1;
  width: fit-content;
  height: fit-content;
  left: 75%;
  margin-top: 5%;
}

.back {
  z-index: -1;
  position: fixed;
}
</style>
