<template>
  <div class="card text-center text-white w-50" id="newAlert">
    <div class="row card-header">
      <div class="col-1">
        <button type="button" class="btn text-white">
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
            <div
              class="col-4"
              v-for="(value, key) in injuries"
              :key="key"
            >
              <label :for="key"> {{ key }} </label>
              <input  
              :class="{'bg-danger': key === 'hard','bg-warning': key === 'medium', 'bg-success': key === 'light'}" type="text" class="w-75" :id="key" />
            </div>
          </div>
        </div>
        <div class="eventType col-4">
          <h5 class="card-title text-end">סוג האירוע</h5>
          <div class="input-group m-2">
            <select
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
      <h5 class="card-title text-end">תיאור האירוע</h5>
      <div class="input-group m-2">
        <input
          type="text"
          class="form-control"
          id="description"
          v-model="description"
        />
      </div>

      <h5 class="card-title text-end">סוג אמלח</h5>
      <div class="input-group m-2" id="range">
        <div
          class="form-check mx-4"
          v-for="weapon in eventsWeapons"
          :key="weapon"
        >
          <input
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
      <button type="button" class="btn btn-danger">שמירה</button>
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
      injuries: {
        light: "",
        medium: "",
        hard: "",
      },
      description: "",
      coordinates: "",
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
  },
};
</script>

<style scoped>
.card-header {
  place-content: space-between;
}
#newAlert {
  background-color: darkblue;
}
#range {
  place-content: center;
}

</style>
