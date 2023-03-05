<template>
  <div>
    <div class="card latest-alerts" style="width: 18rem">
      <div class="card-body">
        <h5 class="card-title">התראות אחרונות</h5>
        <hr>
        <p class="card-text">
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </p>
        <a href="#" class="create-alert"><font-awesome-icon icon="fa-solid fa-circle-plus" /></a>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../api/api.js";


export default {
  name: "LatestAlerts",
  data() {
    return {
      alerts: []
    }
  },

  methods: {
    async getAllAlerts() {
      this.alerts = await (await api.alerts().getAllAlerts()).data;
    }
  },
};
</script>

<style scoped>
.latest-alerts {
  background-color: midnightblue;
  color: white;
  text-align: center;
}

.create-alert {
  color: white;
}
</style>
