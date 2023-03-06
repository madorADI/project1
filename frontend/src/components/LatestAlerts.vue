<template>
  <div>
    <div class="card latest-alerts" style="width: 18rem">
      <div class="card-body">
        <h5 class="card-title">התראות אחרונות</h5>
        <hr />
        <div class="card-text-filter">
          <select v-model="selectedType" class="form-control form-control-sm">
            <option value="0" hidden>סוג האירוע</option>
            <option v-for="typ in event_types" :key="typ.id" value="typ.id">
              {{ typ.name }}
            </option>
          </select>
          <select v-model="selectedWeapon" class="form-control form-control-sm">
            <option value="0" hidden>סוג אמלח</option>
            <option
              v-for="weapon in event_weapons"
              :key="weapon.id"
              value="weapon.name"
            >
              {{ weapon.name }}
            </option>
          </select>
        </div>
        <hr />
        
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
              :key="alert.id"
              :id="alert.id"
              :ref="alert._id"
              @click="openModal"
            >
              <th v-for="(item, index) in brief" :key="index">
                {{ alert[item] }}
              </th>
            </tr>
          </tbody>
        </table>
        <button
          type="button"
          class="btn create-alert"
          @click="createNewAlert"
        >
          <font-awesome-icon class="fa-2xl" icon="fa-solid fa-circle-plus" />
        </button>
        <new-alert
          id="newAlert"
          @newAlertChange="changeNewAlert"
          :open="isNewAlert"
        ></new-alert>
      </div>
    </div>
    <popUp :open="open" @modal-change="changeModalState" />
  </div>
</template>

<script>
import api from "../api/api.js";
import newAlert from "./newAlert.vue";
import popUp from "../components/eventPopup.vue";
import { mapState } from "vuex";

export default {
  name: "LatestAlerts",
  components: {
    newAlert,
    popUp,
  },
  data() {
    return {
      event_weapons: [],
      event_types: [],
      brief: ["brigade", "time", "event_type"],
      selectedType: 0,
      selectedWeapon: 0,
      selectedDate: null,
      fields: [
        { key: "brigade", label: "גירזה" },
        { key: "time", label: "תאריך" },
        { key: "event_type", label: "סוג האירוע" },
      ],
      alerts: [],
      isNewAlert: false,
      open: false,
      selectedAlert: {},
    };
  },
  created() {
    this.getAllAlerts();
    this.getAllTypes();
    this.getAllWeapons();
  },
  methods: {
    async getAllAlerts() {
      this.alerts = await (await api.alerts().getAllAlerts()).data;
    },
    createNewAlert() {
      this.isNewAlert = !this.isNewAlert;
    },
    changeNewAlert(state) {
      this.isNewAlert = state;
    },
    openModal(item) {
      this.selectedAlert = item;
      this.open = !this.open;
    },
    changeModalState(state) {
      this.open = state;
    },
    async getAllWeapons() {
      this.event_weapons = await (await api.alerts().getAllWeapons()).data;
    },
    async getAllTypes() {
      this.event_types = await (await api.alerts().getAllTypes()).data;
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
    ...mapState(["selectedAlertId"]),
    formattedAlerts() {
      return this.alerts.map((alert) => {
        const fixedAlert = { ...alert };
        fixedAlert.time = new Date(fixedAlert.time).toLocaleDateString();

        return fixedAlert;
      });
    },
    filteredTableByType() {
      return this.formattedAlert.filter(
        (alert) => alert.event_type === this.selectedType
      );
    },
    filteredTableByWeapon() {
      return this.filteredTableByType.filter(
        (alert) => alert.weapon === this.selectedWeapon
      );
    },
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
