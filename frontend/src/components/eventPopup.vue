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
        <h3>{{ alert.event_type }}</h3>
      </div>
      <b-container class="body">
        <b-row>
          <b-col class="text-center">
            <h4>נפגעים</h4>
            <div class="row mx-4">
              <div class="col-3 m-1 p-2 px-1">
                <div class="bg-danger rounded">
                  <div id="hard" class="py-2">
                    {{ alert.injuries.hard }}
                  </div>
                </div>
                <label for="hard">קשה</label>
              </div>
              <div class="col-3 m-1 p-2 px-1">
                <div class="bg-warning rounded">
                  <div id="medium" class="py-2">
                    {{ alert.injuries.medium }}
                  </div>
                </div>
                <label for="medium">בינוני</label>
              </div>
              <div class="col-3 m-1 p-2 px-1">
                <div class="bg-success rounded">
                  <div id="easy" class="py-2">
                    {{ alert.injuries.easy }}
                  </div>
                </div>
                <label for="easy">קל</label>
              </div>
            </div>
            <div></div>
          </b-col>
          <b-col class="text-center my-2"
            ><h4>תאריך</h4>
            <h5 class="mt-3">{{ formattedDate }}</h5>
          </b-col>
        </b-row>
        <b-row class="d-flex justify-content-around">
          <b-col class="text-center my-5">
            <h4>נקודת ציון</h4>
            <h5>
              {{ alert.coordinates[0] + "," + alert.coordinates[1] }}
            </h5>
          </b-col>
          <b-col class="text-center my-5 mx-4">
            <h4>סוג אמל"ח</h4>
            <h5>{{ alert.weapon }}</h5>
          </b-col>
        </b-row>
        <b-row>
          <b-col class="text-center mx-4">
            <h4>גזרה</h4>
            <h5>{{ alert.brigade }}</h5>
          </b-col>
          <b-col class="text-center mx-4">
            <h4>תיאור כללי</h4>
            <h5>{{ alert.description }}</h5>
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
      mainProps: { blank: true, width: 48, height: 48, class: "m1" },
    };
  },
  props: {
    open: {
      type: Boolean,
      required: true,
    },
    alert: {
      type: Object,
      required: true,
    },
  },
  computed: {
    formattedDate() {
      return new Date(this.alert.time).toLocaleString();
    }
  },
  watch: {
    open() {
      this.$emit("modal-change", this.open);
    },
  },
};
</script>

<style scoped></style>
