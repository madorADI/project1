<template>
    <div class="card text-center text-white  w-50" id ="newAlert">
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
        <div class="input-group" ></div>
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
</style>