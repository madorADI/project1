<template>
  <div>
    <div class="card latest-alerts" style="width: 18rem">
      <div class="card-body">
        <h5 class="card-title">התראות אחרונות</h5>
        <p class="card-text-filter">סינון</p>
        <table class="table table-hover alertTable">
          <thead>
            <tr>
              <th v-for="field in fields" :key="field.label">
                {{ field.label }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="alert in formattedAlerts"
              :key="alert._id"
              :id="alert._id"
              :ref="alert._id.$oid"
            >
              <th v-for="(item, index) in brief" :key="index">
                {{ alert[item] }}
              </th>
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
          _id: {
            $oid: "6404a7d352dd972914b315a2",
          },
          name: "test",
          description: "dcsafdsafdazs",
          time: {
            $date: "2021-02-25T10:03:46.000Z",
          },
          weapon: "אבנים",
          event_type: 3,
          coordinates: [31.264035, 34.81396],
          injuries: {
            easy: 5,
            medium: 2,
            hard: 6,
          },
          brigade: 2,
        },
      ],
      brief: ["coordinates", "time", "event_type"],
    };
  },
  methods: {
    async getAllAlerts() {
      this.alerts = await (await api.alerts().getAllAlerts()).data;
    },

    blinkAlert() {
      console.log(this.selectedAlertId);
      console.log(this.$refs[this.selectedAlertId]);
      this.$refs[this.selectedAlertId][0].scrollIntoView({
        behavior: "smooth",
      });
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
      this.blinkAlert();
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
