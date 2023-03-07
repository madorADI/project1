<template>
  <div>
    <div class="card latest-alerts" style="width: 22rem">
      <div class="card-body">
        <h5 class="card-title">התראות אחרונות</h5>
        <hr />
        <b-button
          class="button"
          id="resetAlerts"
          v-show="openFilter"
          @click="resetAlerts()"
        >
          <h6>אתחול</h6>
        </b-button>
        <b-button class="button" id="openFilter" @click="openFilterSystems()">
          <h6>סינון</h6>
        </b-button>
        <div class="filterSystems" v-show="openFilter">
          <br />
          <br />
          <div class="card-text-filter">
            <select v-model="selectedType" class="form-control form-control-sm">
              <option value="0" hidden>סוג האירוע</option>
              <option
                v-for="typ in event_types"
                :key="typ.name"
                :value="typ.name"
              >
                {{ typ.name }}
              </option>
            </select>
            <br />
            <h6><u>סוג אמלח</u></h6>
            <div
              class="form-check"
              v-for="weapon in event_weapons"
              :key="weapon.name"
            >
              <input
                v-model="selectedWeapon"
                class="form-check-input"
                type="checkbox"
                :value="weapon.name"
              />
              <label class="form-check-label" :for="weapon.name">
                {{ weapon.name }}
              </label>
            </div>
            <br />
            <h6><u>תאריך</u></h6>
            <div class="form-group d-flex justify-content-between">
              <input
                v-model="selectedStartDate"
                type="date"
                class="form-control dateCheck"
              />
              <label>-מ</label>
            </div>
            <div class="form-group d-flex justify-content-between">
              <input
                v-model="selectedEndDate"
                type="date"
                class="form-control dateCheck "
              />
              <label>-ל</label>
            </div>
          </div>
          <hr />
        </div>

        <div class="tableContainer" :class="{ tableClosedFilter: !openFilter }">
          <table class="table table-hover alertTable">
            <thead class="header">
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
                @click="openModal(alert._id)"
              >
                <th v-for="(item, index) in brief" :key="index">
                  {{ alert[item] }}
                </th>
              </tr>
            </tbody>
          </table>
        </div>

        <button type="button" class="btn create-alert" @click="createNewAlert">
          <font-awesome-icon class="fa-2xl" icon="fa-solid fa-circle-plus" />
        </button>
        <new-alert
          id="newAlert"
          @newAlertChange="changeNewAlert"
          :open="isNewAlert"
        ></new-alert>
      </div>
    </div>
    <popUp
      :open="open"
      @modal-change="changeModalState"
      :alert="selectedAlert"
      :event_types="event_types"
    />
  </div>
</template>

<script>
import api from "../api/api.js";
import newAlert from "./newAlert.vue";
import popUp from "../components/eventPopup.vue";
import { mapState, mapActions } from "vuex";

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
      selectedWeapon: [],
      selectedStartDate: null,
      selectedEndDate: null,
      fields: [
        { key: "brigade", label: "גירזה" },
        { key: "time", label: "תאריך" },
        { key: "event_type", label: "סוג האירוע" },
      ],
      alerts: [],
      isNewAlert: false,
      open: false,
      openFilter: false,
    };
  },
  created() {
    this.findDateBeforeWeek();
    this.getAllAlerts();
    this.getAllTypes();
    this.getAllWeapons();
    this.$emit("changeFiltered");
  },
  methods: {
    resetAlerts() {
      this.selectedWeapon = [];
      this.findDateBeforeWeek();
      this.selectedType = 0;
    },
    openFilterSystems() {
      this.openFilter = !this.openFilter;
    },
    findDateBeforeWeek() {
      this.selectedEndDate = this.formatDate(new Date());
      this.selectedStartDate = new Date();
      this.selectedStartDate.setDate(this.selectedStartDate.getDate() - 7);
      this.selectedStartDate = this.formatDate(this.selectedStartDate);
    },
    ...mapActions(["changeSelectedAlertId"]),
    async getAllAlerts() {
      this.alerts = await (await api.alerts().getAllAlerts()).data;
    },
    createNewAlert() {
      this.isNewAlert = !this.isNewAlert;
    },
    changeNewAlert(state) {
      this.isNewAlert = state;
    },
    openModal(alertId) {
      this.changeSelectedAlertId(alertId);
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
      this.$refs[this.selectedAlertId][0].classList.add("blink");
    },
    formatDate(date) {
      let d = new Date(date),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;

      return [year, month, day].join("-");
    },
  },
  computed: {
    ...mapState(["selectedAlertId"]),
    selectedAlert() {
      return this.alerts.find((alert) => alert._id === this.selectedAlertId);
    },
    formattedAlerts() {
      const filteredTable = this.filteredTableByDate.map((alert) => {
        const fixedAlert = { ...alert };
        fixedAlert.time = new Date(fixedAlert.time).toLocaleDateString("he-IL");

        return fixedAlert;
      });

      this.$emit("changeFiltered", filteredTable);

      return filteredTable;
    },
    formattedDates() {
      return this.alerts.map((alert) => {
        const fixedAlert = { ...alert };
        fixedAlert.time = new Date(fixedAlert.time);

        return fixedAlert;
      });
    },
    filteredTableByType() {
      if (this.selectedType !== 0) {
        return this.formattedDates.filter(
          (alert) => alert.event_type === this.selectedType
        );
      } else {
        return this.formattedDates;
      }
    },
    filteredTableByWeapon() {
      if (this.selectedWeapon.length !== 0) {
        return this.filteredTableByType.filter((alert) =>
          this.selectedWeapon.includes(alert.weapon)
        );
      } else {
        return this.filteredTableByType;
      }
    },
    filteredTableByDate() {
      let endDateComparable = new Date(this.selectedEndDate).setDate(
        new Date(this.selectedEndDate).getDate() + 1
      );
      if (this.selectedStartDate !== null && this.selectedEndDate !== null) {
        return this.filteredTableByWeapon.filter(
          (alert) =>
            alert.time >= new Date(this.selectedStartDate) &&
            alert.time < new Date(endDateComparable)
        );
      } else {
        return this.filteredTableByWeapon;
      }
    },
  },
  watch: {
    selectedAlertId() {
      if (this.selectedAlertId !== 0) {
        this.blinkAlert();
        setTimeout(() => {
          this.$refs[this.selectedAlertId][0].classList.remove("blink");
          this.changeSelectedAlertId(0);
        }, 3000);
      }
    },
  },
};
</script>

<style scoped>
.latest-alerts {
  background-color: rgb(43, 58, 103);
  color: rgb(245, 245, 245);
  text-align: center;
  height: 84ch;
}

.alertTable {
  color: rgb(245, 245, 245);
}

.tableContainer {
  height: 14%;
  overflow: auto;
  position: relative;
}

.tableClosedFilter {
  height: auto;
  overflow: auto;
  position: relative;
}

@keyframes blinking {
  0% {
    background-color: rgb(240, 100, 73);
  }
  100% {
    background-color: rgb(43, 58, 103);
  }
}

table thead tr th {
  position: sticky;
  z-index: 100;
  background-color: rgb(43, 58, 103);
  top: 0;
}
.blink {
  animation: blinking 1s;
  animation-iteration-count: 1;
}

.card-text-filter {
  text-align: right;
}

.create-alert {
  color: rgb(240, 100, 73);
}

.button {
  margin-left: 2%;
  margin-right: 2%;
}

.form-check {
  margin-top: 0;
}

#openFilter {
  background-color: rgb(240, 100, 73);
}

.table-hover tbody tr:hover td,
.table-hover tbody tr:hover th {
  color: rgb(228, 149, 3) !important;
}

.dateCheck{
  height: 3ch;
  width: 70%;
  margin-bottom: 3%;
}
</style>
