<template>
  <div>
    <div class="card latest-alerts" style="width: 18rem">
      <div class="card-body">
        <h5 class="card-title">התראות אחרונות</h5>
        <hr />
        <p class="card-text-filter">סינון</p>
        <hr />
        <b-table
          class="alertTable"
          hover
          :fields="fields"
          :items="formattedAlerts"
          @row-clicked="openModal"
        ></b-table>
        <a href="#" class="create-alert"
          ><font-awesome-icon class="fa-2xl" icon="fa-solid fa-circle-plus"
        /></a>
      </div>
    </div>
    <popUp :open="open" @modal-change="changeModalState" />
  </div>
</template>

<script>
import api from "../api/api.js";
import popUp from "../components/eventPopup.vue";
export default {
  name: "LatestAlerts",
  components: {
    popUp,
  },
  data() {
    return {
      fields: [
        { key: "coordinates", label: "מיקום" },
        { key: "time", label: "תאריך" },
        { key: "event_type", label: "סוג האירוע" },
      ],
      alerts: [
        {
          event_type: "פיגוע",
          time: Date.now(),
          coordinates: [1, 1],
        },
        {
          event_type: " פיגוע חזק",
          time: Date.now(),
          coordinates: [1, 1],
        },
      ],
      open: false,
      selectedAlert: {},
    };
  },
  // created() {
  //   this.getAllAlerts();
  // },
  methods: {
    async getAllAlerts() {
      this.alerts = await (await api.alerts().getAllAlerts()).data;
    },
    openModal(item) {
      this.selectedAlert = item;
      this.open = !this.open;
    },
    changeModalState(state) {
      this.open = state;
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
