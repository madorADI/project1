<template>
  <div>
    <b-modal id="modal-1" v-model="open">
      <div class="title text-center">
        <b-img
          src="https://www.vairuok.lt/wp-content/uploads/2021/03/info.png"
          rounded="circle"
          alt="Circle image"
          width="80"
          height="80"
        ></b-img>
        <h3>{{ selectedEvent.eventType }}</h3>
      </div>
      <b-container class="body">
        <b-row>
          <b-col class="text-center">
            <h4>נפגעים</h4>
            <div class="row mx-4">
              <div class="col-3 m-1 p-2 px-1">
                <div class="bg-danger rounded">
                  <div id="hard" class="py-2">
                    {{ selectedEvent.injuries.hard }}
                  </div>
                </div>
                <label for="hard">קשה</label>
              </div>
              <div class="col-3 m-1 p-2 px-1">
                <div class="bg-warning rounded">
                  <div id="medium" class="py-2">
                    {{ selectedEvent.injuries.medium }}
                  </div>
                </div>
                <label for="medium">בינוני</label>
              </div>
              <div class="col-3 m-1 p-2 px-1">
                <div class="bg-success rounded">
                  <div id="easy" class="py-2">
                    {{ selectedEvent.injuries.easy }}
                  </div>
                </div>
                <label for="easy">קל</label>
              </div>
            </div>
            <div></div>
          </b-col>
          <b-col class="text-center my-2"
            ><h4>תאריך, שעה</h4>
            <h5>{{ formattedDate }}</h5>
            <h5>{{ formattedHour }}</h5>
          </b-col>
        </b-row>
        <b-row class="d-flex justify-content-around">
          <b-col class="text-center my-5">
            <h4>נקודת ציון</h4>
            <h5>
              {{
                selectedEvent.coordinates[0] +
                "," +
                selectedEvent.coordinates[1]
              }}
            </h5>
          </b-col>
          <b-col class="text-center my-5 mx-4">
            <h4>סוג אמל"ח</h4>
            <h5>{{ selectedEvent.weapon }}</h5>
          </b-col>
        </b-row>
        <b-row>
          <b-col class="text-center mx-4">
            <h4>תיאור כללי</h4>
            <h5>{{ selectedEvent.descripion }}</h5>
          </b-col>
        </b-row>
      </b-container>
      <template #modal-footer="{ ok }">
        <b-button size="sm" variant="success" @click="ok()"> סגור </b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedEvent: {
        eventType: "פיגוע",
        time: new Date(),
        weapon: "אבנים",
        descripion: "פלסטינאים זרקו אבנים על עוברי אורח",
        injuries: { easy: 3, medium: 4, hard: 6 },
        coordinates: [31.264035, 34.81396],
      },
      mainProps: { blank: true, width: 48, height: 48, class: "m1" },
    };
  },
  props: {
    open: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    date() {
      return this.selectedEvent.time;
    },
    formattedDate() {
      return `${this.date.getDate()}/${this.date.getMonth()}/${this.date.getFullYear()}`;
    },
    formattedHour() {
      if (this.date.getMinutes() < 10) {
        return `${this.date.getHours()}:0${this.date.getMinutes()}`;
      } else {
        return `${this.date.getHours()}:${this.date.getMinutes()}`;
      }
    },
  },
  watch: {
    open() {
      this.$emit("modal-change", this.open);
    },
  },
};
</script>

<style scoped></style>
