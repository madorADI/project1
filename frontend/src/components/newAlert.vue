<template>
    <div class="card text-center text-white w-50" id ="newAlert">
        <div class="row card-header">
            <div class="col-1" >
                <button type="button" class="btn text-white" >
                    <i class="bi bi-x-lg"></i>
                </button>
            </div>
            <div class="col-11 display-6" >  
            יצירת התרעה
            </div>
        </div>
    <div class="card-body">
        <div class="input-group m-2">
            <select
            id="eventType"
            class="form-select"
            aria-label="events type"
            v-model="selectedEventType">
                <option 
                v-for="event in eventsTypes"
                :key="event">
                 {{ event }}
                </option>
            </select>
            <label for="eventType" class="input-group-text">סוג אירוע</label>
        </div>
        <div class="input-group m-2">
            <input type="text" class="form-control" id="description" v-model="description">
            <label for="description" class="input-group-text">תיאור האירוע</label>
        </div>
        <div class="input-group m-2" id="range">
            <div class="form-check mx-3" v-for="weapon in eventsWeapons" :key="weapon">
                <input class="form-check-input" type="checkbox" :id="weapon">
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
    name: 'newAlert',
    data() {
        return {
            eventsTypes: [],
            eventsWeapons: [],
            selectedWeapon: null,
            selectedEventType: null,
            injuries: null,
            description: "",
            coordinates: "",
        }
    },
    created() {
        this.getEventsTypes();
        this.getEventsWeapons();
    },
    methods: {
       getEventsTypes() {
        this.eventsTypes = ["ליהי","רן","בר","שקד"]
       },
       getEventsWeapons() {
        this.eventsWeapons = ["אבן","סכין","חשמל","רובה"]
       }
    }
 
}
</script>

<style scoped>
.card-header {
    place-content: space-between
}
#newAlert {
    background-color:darkblue;
}
#range {
    place-content: center;
}
</style>