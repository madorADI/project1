<template>
  <div id="app">
    <LatestAlerts/>
    <popUp />
  </div>
</template>

<script>
import LatestAlerts from "./components/LatestAlerts.vue";
import popUp from "./components/eventPopup.vue";
export default {
  components: {
    LatestAlerts,
    popUp,
  },

}
</script>

<style></style>
