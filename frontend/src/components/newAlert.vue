<template>
  <b-modal v-model="open" content-class="modal-color">
    <div class="display-6 text-center">יצירת התרעה</div>
    <div class="modal-body">
      <div class="row mb-4">
        <div class="injuries col-7">
          <h5 class="card-title text-center">נפגעים</h5>
          <div class="row">
            <div
              class="col-4 text-center"
              v-for="value in injuries"
              :key="value.name"
            >
              <label class="mx-2" :for="value.name">
                {{ value.realName }}
              </label>
              <input
                @change="reset(value.name)"
                :class="{
                  'bg-danger': value.name === 'hard',
                  'bg-warning': value.name === 'medium',
                  'bg-success': value.name === 'light',
                }"
                type="text"
                class="w-100 rounded"
                :id="value.name"
                v-model="value.numberOfInjeries"
                v-int
              />
            </div>
          </div>
        </div>
        <div class="eventType col-5">
          <h5 class="card-title text-end">סוג האירוע</h5>
          <div class="input-group m-2">
            <select
              dir="rtl"
              :class="{ 'is-invalid': !selectedEventType && validation }"
              id="eventType"
              class="form-select"
              aria-label="events type"
              v-model="selectedEventType"
            >
              <option v-for="event in formatedTypes" :key="event">
                {{ event }}
              </option>
            </select>
          </div>
        </div>
      </div>
      <div class="row mb-3">
        <div class="col-7">
          <h5 class="card-title text-center">מיקום האירוע</h5>
          <div class="row">
            <div class="col-6 text-center">
              <label for="locationX">x מיקום</label>
              <div class="input-group m-2">
                <input
                  :value="locationXCord"
                  title="בחר מיקום במפה"
                  :class="{ 'is-invalid': !locationXCord && validation }"
                  type="number"
                  class="form-control"
                  id="locationX"
                  @change="updateXlocation"
                v-float/>
              </div>
            </div>
            <div class="col-6 text-center">
              <label for="locationY">y מיקום</label>
              <div class="input-group m-2">
                <input
                  :value="locationYCord"
                  title="בחר מיקום במפה"
                  :class="{ 'is-invalid': !locationYCord && validation }"
                  type="number"
                  class="form-control"
                  id="locationY"
                  @change="updateYlocation"
                v-float/>
              </div>
            </div>
          </div>
        </div>
        <div class="description col-5">
          <h5 class="card-title text-end">תיאור האירוע</h5>
          <div class="input-group m-2">
            <input
              dir="rtl"
              :class="{ 'is-invalid': !description && validation }"
              type="text"
              class="form-control"
              id="description"
              v-model="description"
            />
          </div>
        </div>
      </div>

      <h5 class="card-title text-center">סוג אמלח</h5>
      <div class="input-group m-2" id="range">
        <div
          class="form-check mx-4"
          v-for="weapon in formatWeapons"
          :key="weapon"
        >
          <input
            :class="{ 'is-invalid': !selectedWeapons && validation }"
            v-model="selectedWeapons"
            :value="weapon"
            class="form-check-input"
            type="radio"
            :id="weapon"
          />
          <label class="form-check-label" :for="weapon">
            {{ weapon }}
          </label>
        </div>
      </div>
    </div>
    <template #modal-footer>
      <button type="button" class="buttom btn btn-danger" @click="sendNewAlert">
        שמירה
      </button>
    </template>
  </b-modal>
</template>

<script>
import api from "../api/api";
import { mapState, mapActions } from "vuex";
import Swal from "sweetalert2";
export default {
  name: "newAlert",
  props: {
    open: {
      required: true,
      type: Boolean,
    },
  },
  data() {
    return {
      eventsTypes: [],
      eventsWeapons: [],
      selectedWeapons: null,
      selectedEventType: null,
      validation: false,
      injuries: {
        light: {
          realName: "קל",
          name: "light",
          numberOfInjeries: 0,
        },
        medium: {
          realName: "בינוני",
          name: "medium",
          numberOfInjeries: 0,
        },
        hard: {
          realName: "קשה",
          name: "hard",
          numberOfInjeries: 0,
        },
      },
      description: "",
    };
  },
  created() {
    this.getEventsTypes();
    this.getEventsWeapons();
  },
  watch: {
    open() {
      this.$emit("newAlertChange", this.open);
    },
  },
  computed: {
    ...mapState(["selectedLat", "selectedLng"]),
    formatedTypes() {
      return this.eventsTypes.map(({ name }) => name);
    },
    formatWeapons() {
      return this.eventsWeapons.map(({ name }) => name);
    },
    locationXCord() {
      return this.selectedLat;
    },
    locationYCord() {
      return this.selectedLng;
    },
  },
  methods: {
    ...mapActions(["changeSelectedLat", "changeSelectedLng"]),
    async getEventsTypes() {
      try {
        this.eventsTypes = (await api.alerts().getAllTypes()).data;
      } catch (err) {
        console.log(err);
      }
    },
    async getEventsWeapons() {
      try {
        this.eventsWeapons = (await api.alerts().getAllWeapons()).data;
      } catch (err) {
        console.log(err);
      }
    },
    closeNewAlert() {
      this.$emit("closeNewAlert");
    },
    updateXlocation(event) {
      this.changeSelectedLat(parseFloat(event.target.value));
    },
    updateYlocation(event) {
      this.changeSelectedLng(parseFloat(event.target.value));
    },
    reset(key) {
      if (!this.injuries[key].numberOfInjeries) {
        this.injuries[key].numberOfInjeries = 0;
      }
    },
    async sendNewAlert() {
      if (
        !this.selectedEventType ||
        !this.selectedWeapons ||
        !this.description ||
        !this.locationXCord ||
        !this.locationYCord
      ) {
        this.validation = true;
      } else {
        const newALert = {
          name: this.selectedEventType,
          description: this.description,
          time: new Date(),
          weapon: this.selectedWeapons,
          event_type: this.eventsTypes.find(
            ({ name }) => name === this.selectedEventType
          ).id,
          coordinates: [
            this.locationXCord,
            this.locationYCord,
          ],
          injuries: {
            easy: parseInt(this.injuries.light.numberOfInjeries),
            medium: parseInt(this.injuries.medium.numberOfInjeries),
            hard: parseInt(this.injuries.hard.numberOfInjeries),
          },
          brigade: -1,
        };
        try {
          console.log(newALert);
          await api.alerts().postNewWeapon(newALert);
          location.reload();
        } catch (err) {
          Swal.fire({
            title: "!שגיאה",
            text: " נקודות ציון לא נמצאו בגזרה",
            icon: "error",
            confirmButtonText: "אוקיי",
          });
        }
      }
    },
  },
};
</script>

<style scoped>
#range {
  place-content: center;
}
.buttom {
  margin-inline: auto;
}

::v-deep .modal-color {
  background-color: rgb(43, 58, 103);
  color: aliceblue;
}
</style>
