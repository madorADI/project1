<template>
  <div style="height: 100vh; width: 100vw">
    <br />
    <l-map :zoom="zoom" :center="center" :options="mapOptions" @click="selectBomb" style="height: 80%" class="map">
      <l-tile-layer :url="url" />
      <!--change key, the markers should be from db-->
      <l-marker v-for="marker in markers" :key="marker._id" :lat-lng="marker.coordinates"
        @click="changeSelectedAlertId(marker._id)" :icon="bomb">
        <l-tooltip>{{ marker.event_type }}</l-tooltip>
      </l-marker>
      <l-marker v-if="this.selectedLat && this.selectedLng" :lat-lng="[this.selectedLat, this.selectedLng]"
        :icon="selected">
        <l-tooltip> {{ markerCoordinates }} </l-tooltip>
      </l-marker>
    </l-map>
  </div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import { latLng, icon } from "leaflet";
import { mapActions, mapState } from "vuex";
import { LMap, LTileLayer, LTooltip, LMarker } from "vue2-leaflet";
import LatestAlerts from "./LatestAlerts.vue";

export default {
  name: "IsraelMap",
  components: {
    LMap,
    LTileLayer,
    LTooltip,
    LMarker,
    LatestAlerts,
  },
  data() {
    return {
      zoom: 9.5,
      center: latLng(31.894372, 35.217967),
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      mapOptions: {
        zoomSnap: 0.5,
      },
      // markers: [],
      bomb: icon({
        iconUrl:
          "http://www.clker.com/cliparts/y/e/Q/T/p/N/red-bomb.svg.hi.png",
        iconSize: [30, 37],
        iconAnchor: [16, 37],
      }),
      selected: icon({
        iconUrl:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Red_Arrow_Down.svg/1200px-Red_Arrow_Down.svg.png",
        iconSize: [30, 37],
        iconAnchor: [16, 37],
      }),
    };
  },
  props: {
    markers: Array[Object],
  },
  computed: {
    ...mapState(["selectedLat", "selectedLng"]),
    markerCoordinates() {
      return `(${this.selectedLat},${this.selectedLng})`
    }
  },
  methods: {
    ...mapActions([
      "changeSelectedLat",
      "changeSelectedLng",
      "changeSelectedAlertId",
    ]),
    selectBomb(event) {
      this.changeSelectedLat(event.latlng.lat);
      this.changeSelectedLng(event.latlng.lng);
    },
  },
};
</script>

<style scoped>
.leaflet-container {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: visible;
}
</style>
