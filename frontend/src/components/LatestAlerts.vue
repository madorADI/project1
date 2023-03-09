<template>
  <div>
    <div class="card latest-alerts" style="width: 22rem">
      <div class="card-body">
        <h5 class="card-title text-center">התראות אחרונות</h5>
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
          <div class="card-text-filter">
            <div>
              <multi-select
                class="multiSelectOption multiSelectTag multiselectTagIcon multiselectTagIconBox"
                placeholder="סוג אמלח"
                v-model="selectedWeapon"
                :multiple="true"
                :options="weopensNames"
              ></multi-select>
              <br />
              <multi-select
                class="multiSelectOption"
                placeholder="סוג האירוע"
                v-model="selectedType"
                :options="eventsNames"
              ></multi-select>
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
                class="form-control dateCheck"
              />
              <label>-ל</label>
            </div>
          </div>
          <hr />
        </div>
        <div v-if="formattedAlerts.length" class="alertTable">
          <h5 class="text-center">{{ formattedAlerts.length }} :כמות התרעות</h5>
          <div class="row">
            <th class="col-4 mb-2" v-for="field in fields" :key="field.label">
              {{ field.label }}
            </th>
            <hr class="borderHead mb-2" />
          </div>
        </div>
        <h5 v-else class="text-center">אין התרעות</h5>
        <div class="tableContainer" :class="{ tableClosedFilter: !openFilter }">
          <table class="table table-hover alertTable">
            <tbody>
              <tr
                v-for="alert in formattedAlerts"
                :key="alert.id"
                :id="alert.id"
                :ref="alert._id"
                @click="openModal(alert)"
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
          :event_types ="event_types"
        ></new-alert>
      </div>
    </div>

    <popUp
      v-if="selectedAlert"
      :open="open"
      @modal-change="changeModalState"
      :alert="selectedAlert"
    />
  </div>
</template>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<script>
import api from "../api/api.js";
import newAlert from "./newAlert.vue";
import popUp from "../components/eventPopup.vue";
import { mapState, mapActions } from "vuex";
import MultiSelect from "vue-multiselect";

export default {
  name: "LatestAlerts",
  components: {
    newAlert,
    popUp,
    MultiSelect,
  },
  data() {
    return {
      event_weapons: [],
      event_types: [],
      brief: ["brigade", "time", "event_type"],
      selectedType: "",
      selectedWeapon: [],
      selectedStartDate: null,
      selectedEndDate: null,
      fields: [
        { key: "brigade", label: "גזרה" },
        { key: "time", label: "תאריך" },
        { key: "event_type", label: "סוג האירוע" },
      ],
      alerts: [],
      isNewAlert: false,
      open: false,
      openFilter: false,
      selectedAlert: null,
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
      this.selectedType = "";
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
    openModal(newAlert) {
      this.selectedAlert = this.alerts.find(({_id})=> _id === newAlert._id);
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
    formattedAlerts() {
      const filteredTable = this.filteredTableByDate.map((alert) => {
        const fixedAlert = { ...alert };
        fixedAlert.time = new Date(fixedAlert.time).toLocaleDateString("he-IL");

        return fixedAlert;
      });

      this.$emit("changeFiltered", filteredTable);

      return filteredTable;
    },
    formattedAlert() {
      return this.alerts.map((alert) => {
        const fixedAlert = { ...alert };
        fixedAlert.time = new Date(fixedAlert.time);
        fixedAlert.coordinates = fixedAlert.coordinates.reverse();
        return fixedAlert;
      });
    },
    filteredTableByType() {
      if (this.selectedType) {
        return this.formattedAlert.filter(
          (alert) => alert.event_type === this.selectedType
        );
      } else {
        return this.formattedAlert;
      }
    },
    weopensNames() {
      return this.event_weapons.map(({ name }) => name);
    },
    eventsNames() {
      return this.event_types.map(({ name }) => name);
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

<style lang="css" scoped>
.multiSelectOption >>> .multiselect__element :hover {
  background-color: gray;
}
.multiSelectTag >>> .multiselect__tag {
  background-color: rgb(240, 100, 73);
}
.multiselectTagIcon >>> .multiselect__tag-icon::after {
  color: white !important;
}
.multiselectTagIconBox >>> .multiselect__tag-icon:hover {
  background-color: rgb(240, 100, 73) !important;
}
.latest-alerts {
  background-color: rgb(43, 58, 103);
  color: rgb(245, 245, 245);
  text-align: center;
  height: auto;
  max-height: 90ch;
}

.alertTable {
  color: rgb(245, 245, 245);
}

.tableContainer {
  height: 100%;
  overflow: auto;
  position: relative;
  max-height: 10pc;
}

.tableClosedFilter {
  height: 100%;
  overflow: auto;
  position: relative;
  max-height: 30pc;
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
  background-color: rgb(43, 58, 103);
  top: 0;
}
.blink {
  animation: blinking 1s;
  animation-iteration-count: 3;
}

.card-text-filter {
  text-align: right;
}

.create-alert {
  color: rgb(240, 100, 73);
  position: inherit;
  z-index: 100 !important;
}

.button {
  margin-left: 2%;
  margin-right: 2%;
}

#openFilter {
  background-color: rgb(240, 100, 73);
}

.table-hover tbody tr:hover td,
.table-hover tbody tr:hover th {
  color: lightsteelblue !important;
}
.borderHead {
  width: 93%;
  margin: auto;
  border-width: medium;
}

.dateCheck {
  height: 3ch;
  width: 70%;
  margin-bottom: 3%;
}

::-webkit-scrollbar {
  width: 20px;
}

::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: rgb(240, 100, 73);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgb(240, 100, 73);
}
</style>
