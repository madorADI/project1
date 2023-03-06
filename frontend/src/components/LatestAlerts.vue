<template>
  <div>
    <div class="card latest-alerts" style="width: 18rem">
      <div class="card-body">
        <h5 class="card-title">התראות אחרונות</h5>
        <p class="card-text-filter">סינון</p>
        <!-- <b-table
          class="alertTable"
          hover
          :fields="fields"
          :items="formattedAlerts"
        ></b-table> -->

        <table class="table table-hover alertTable">
          <thead>
            <tr>
              <th v-for="field in fields" :key="field.label">{{field.label}}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="alert in formattedAlerts" :key="alert.id" :id="alert.id">
              <th v-for="(item, index) in brief" :key="index" >{{alert[item]}}</th>
            </tr>
          </tbody>
        </table>

        <a href="#" class="create-alert"
          ><font-awesome-icon class="fa-2xl" icon="fa-solid fa-circle-plus"
        /></a>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../api/api.js";
import { mapState } from "vuex";

export default {
  name: "LatestAlerts",
  data() {
    return {
      fields: [
        { key: "coordinates", label: "מיקום" },
        { key: "time", label: "תאריך" },
        { key: "event_type", label: "סוג האירוע" },
      ],
      alerts: [
        {
          id: 1,
          event_type: "Attack",
          time: Date.now(),
          coordinates: [1, 1],
        },
      ],
      brief: [ "coordinates","time", "event_type", ]
    };
  },
  methods: {
    async getAllAlerts() {
      this.alerts = await (await api.alerts().getAllAlerts()).data;
    },

    blinkAlert(id) {
      this.getAlertById(id)._rowVariant = "danger";
    },

    getAlertById(id) {
      return this.alerts.find((elem) => elem.id === id);
    },
  },
  computed: {
    formattedAlerts() {
      return this.alerts.map((alert) => {
        const fixedAlert = { ...alert };
        fixedAlert.time = new Date(fixedAlert.time).toLocaleString("en-US");

        return fixedAlert;
      });
    },
    ...mapState(["selectedAlertId"]),
  },
  watch: {
    selectedAlertId() {
      this.blinkAlert(this.selectedAlertId);
    },
  },
};
</script>

<style scoped>
.latest-alerts {
  background-color: rgb(43, 58, 103);
  color: rgb(245, 245, 245);
  text-align: center;
}

.alertTable {
  color: rgb(245, 245, 245);
}

.card-text-filter {
  text-align: right;
}

.create-alert {
  color: rgb(240, 100, 73);
}
</style>
