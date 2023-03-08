<template>
  <div style="height: 100vh; width: 100vw">
    <br />
    <l-map
      :zoom="zoom"
      :center="center"
      :options="mapOptions"
      @click="selectBomb"
      style="height: 80%"
      class="map"
    >
      <l-tile-layer :url="url" />
      <!--change key, the markers should be from db-->
      <l-marker
        v-for="marker in markers"
        :key="marker._id"
        :lat-lng="marker.coordinates"
        @click="changeSelectedAlertId(marker._id)"
        :icon="getIconByName(marker.weapon).icon"
      >
        <l-tooltip>{{ marker.description }}</l-tooltip>
      </l-marker>
      <l-marker
        v-if="this.selectedLat && this.selectedLng"
        :lat-lng="[this.selectedLat, this.selectedLng]"
        :icon="selected"
      >
        <l-tooltip>המיקום שנבחר</l-tooltip>
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
      icons: [
        {
          name: "אבנים",
          icon: icon({
            iconUrl:
              "https://cdn-icons-png.flaticon.com/512/1213/1213131.png",
            iconSize: [30, 37],
            iconAnchor: [16, 37],
          }),
        },
        {
          name: "רכב",
          icon: icon({
            iconUrl:
              "https://www.iconpacks.net/icons/2/free-car-icon-2897-thumb.png",
            iconSize: [30, 37],
            iconAnchor: [16, 37],
          }),
        },
        {
          name: "בקת''ב",
          icon: icon({
            iconUrl:
              "https://cdn-icons-png.flaticon.com/512/238/238971.png",
            iconSize: [30, 37],
            iconAnchor: [16, 37],
          }),
        },
        {
          name: "סכין",
          icon: icon({
            iconUrl:
              "https://cdn-icons-png.flaticon.com/512/2511/2511208.png",
            iconSize: [30, 37],
            iconAnchor: [16, 37],
          }),
        },
        {
          name: "נשק חם",
          icon: icon({
            iconUrl:
              "https://www.iconpacks.net/icons/2/free-gun-icon-1950-thumb.png",
            iconSize: [30, 37],
            iconAnchor: [16, 37],
          }),
        },
        {
          name: "ארטילריה",
          icon: icon({
            iconUrl:
              "https://cdn-icons-png.flaticon.com/512/238/238987.png",
            iconSize: [30, 37],
            iconAnchor: [16, 37],
          }),
        },
      ],
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
  // async created() {
  //   this.markers = await (await api.alerts().getAllAlerts()).data;
  // },
  computed: {
    ...mapState(["selectedLat", "selectedLng"]),
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
    getIconByName(name) {
      return this.icons.find((elem) => elem.name === name);
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
