<template>
  <div>
    <div class="card latest-alerts" style="width: 18rem">
      <div class="card-body">
        <h5 class="card-title">
            <h1 class="type"><strong>{{ alert.event_type }}</strong></h1>
            <h1 class="location">{{ alert.coordinates }}</h1>
            <h1 class="date">{{ currentTime }}</h1>
        </h5>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Alert",
  props: {
    alert: Object,
  },
  computed: {
    currentTime() {
        console.log(typeof this.alert.time);
        return new Date(this.alert.time).toLocaleDateString("en-US");
    }
  }
};
</script>

<style scoped>
.latest-alerts {
  background-color: rgb(43, 58, 103);
  width: 70%;
  color: white;
  text-align: center;
}
</style>
