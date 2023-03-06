<template>
  <div id="app">
    <popUp />
    <eventMap />
  </div>
</template>

<script>
import popUp from "./components/eventPopup.vue";
import eventMap from "./components/Map.vue";

export default {
  components: {
    popUp,
    eventMap,
  },
};
</script>

<style></style>
