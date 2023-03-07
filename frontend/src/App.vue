<template>
  <div id="app">
    <Header></Header>
    <button @click="showAlert">hello</button>
    <button @click="showNumMinutes('hhh')">hellominutes</button>
    <b-row>
      <LatestAlerts class="front m-5" />
      <eventMap class="back" />
    </b-row>
  </div>
</template>

<script>
import LatestAlerts from "./components/LatestAlerts.vue";
import Header from "./components/header.vue";
import eventMap from "./components/Map.vue";
import Swal from 'sweetalert2';

export default {
  components: {
    LatestAlerts,
    Header,
    eventMap,
  },
  methods: {
    showAlert(event) {
      Swal.fire({
        imageUrl: 'data:image/png;base64,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',
        imageWidth: 50,
        imageHeight: 50,
        imageAlt: 'Custom image',
        title: '!היי',
        text: 'במיקום בוצע חיפוש של מבוקש',
        showCloseButton: true,
        showConfirmButton: false,
      }),
        showNumMinutes = async (reinformentType) => {
          const { value: minutes } = await Swal.fire({
            title: 'Input email address',
            input: 'text',
            inputLabel: ` היי קיבלת דיווח מהשטח במיקום על בקשה לתגבורת מסוג ${reinformentType}`,
            inputPlaceholder: 'הזן את מספר הדקות שיקח לתגבורת להגיע',
            showCloseButton: true,
          })

          alert(minutes);
        }
    }
  }
};
</script>

<style scope>
.front {
  position: fixed;
  z-index: 1;
  width: fit-content;
  height: fit-content;
  left: 75%;
  margin-top: 5%;
}

.back {
  z-index: -1;
  position: fixed;
}
</style>
