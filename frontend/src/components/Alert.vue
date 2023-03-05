<template>
  <div>
    <div class="card alert">
      <div class="card-body">
        <h5 class="card-title">
            <h7 class="location">{{ alert.coordinates }}</h7>
            <h7 class="date">{{ currentTime }}</h7>
            <h7 class="type"><strong>{{ alert.event_type }}</strong></h7>
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
        return new Date(this.alert.time).getDate();
    }
  }
};
</script>

<style scoped>
.card {
    text-align: center;
}

.card-body {
  background-color: rgb(43, 58, 103);
  width: 90%;
  color: white;
  text-align: center;
}
</style>
