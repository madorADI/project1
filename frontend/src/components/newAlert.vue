<template>
  <div class="card text-center text-white w-50" id="newAlert">
    <div class="row card-header">
      <div class="col-1">
        <button type="button" class="btn text-white" @click="closeCard">
          <i class="bi bi-x-lg"></i>
        </button>
      </div>
      <div class="col-11 display-6">יצירת התרעה</div>
    </div>
    <div class="card-body">
      <div class="row">
        <div class="injuries col-8">
          <h5 class="card-title text-center">נפגעים</h5>
          <div class="row">
            <div class="col-4" v-for="value in injuries" :key="value.name">
              <input
                :class="{
                  'bg-danger': value.name === 'hard',
                  'bg-warning': value.name === 'medium',
                  'bg-success': value.name === 'light',
                }"
                type="text"
                class="w-50 rounded"
                :id="value.name"
                v-model="value.numberOfInjeries"
                v-int
              />
              <label class="mx-2" :for="value.name">
                {{ value.realName }}
              </label>
            </div>
          </div>
        </div>
        <div class="eventType col-4">
          <h5 class="card-title text-end">סוג האירוע</h5>
          <div class="input-group m-2">
            <select
              :class="{ 'is-invalid': !selectedEventType && validation }"
              id="eventType"
              class="form-select"
              aria-label="events type"
              v-model="selectedEventType"
            >
              <option v-for="event in eventsTypes" :key="event">
                {{ event }}
              </option>
            </select>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-6">
          <h5 class="card-title text-end">מיקום האירוע</h5>
          <div class="input-group m-2">
            <input
              type="text"
              class="form-control"
              id="location"
              v-model="location"
            />
          </div>
        </div>
        <div class="description col-6">
          <h5 class="card-title text-end">תיאור האירוע</h5>
          <div class="input-group m-2">
            <input
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
          v-for="weapon in eventsWeapons"
          :key="weapon"
        >
          <input
            :class="{ 'is-invalid': !selectedWeapons.length && validation }"
            v-model="selectedWeapons"
            :value="weapon"
            class="form-check-input"
            type="checkbox"
            :id="weapon"
          />
          <label class="form-check-label" :for="weapon">
            {{ weapon }}
          </label>
        </div>
      </div>
    </div>
    <div class="card-footer">
      <button type="button" class="btn btn-danger" @click="sendNewAlert">
        שמירה
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "newAlert",
  data() {
    return {
      eventsTypes: [],
      eventsWeapons: [],
      selectedWeapons: [],
      selectedEventType: null,
      validation: false,
      location: "",
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
  methods: {
    getEventsTypes() {
      this.eventsTypes = ["ליהי", "רן", "בר", "שקד"];
    },
    getEventsWeapons() {
      this.eventsWeapons = ["אבן", "סכין", "חשמל", "רובה"];
    },
    closeCard() {},
    sendNewAlert() {
      if (
        !this.selectedEventType ||
        !this.selectedWeapons ||
        !this.description ||
        !this.location
      ) {
        this.validation = true;
      } else {
        alert("valid");
      }
    },
  },
};
</script>

<style scoped>
.card-header {
  place-content: space-between;
}
#newAlert {
  background-color: darkslateblue;
}
#range {
  place-content: center;
}
</style>
