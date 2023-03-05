<template>
  <div>
    <div class="card latest-alerts" style="width: 18rem">
      <div class="card-body">
        <h5 class="card-title">התראות אחרונות</h5>
        <hr>
        <p class="card-text">
          סינון
        </p>
        <hr>
        <p class="card-text-type">
          סוג האירוע
        </p>
        <p class="card-text-date">
          תאריך, שעה
        </p>
        <Alert v-for="alert in alerts" :key="alert.id" :alert="alert"/>
        <a href="#" class="create-alert"><font-awesome-icon icon="fa-solid fa-circle-plus" /></a>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../api/api.js";
import Alert from "./Alert.vue"
export default {
  name: "LatestAlerts",
  components: { Alert },
  data() {
    return {
      alerts: [{ event_type: "Attack", 
                time: "1678040638094", 
                coordinates: [1, 1]}]
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
