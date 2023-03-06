<template>
  <div style="height: 105vh; width: 35vw">
    <br />
    <l-map :zoom="zoom" :center="center" :options="mapOptions" style="height: 80%" @click="selectBomb">
      <l-tile-layer :url="url" />
      <!--change key, the markers should be from db-->
      <l-marker v-for="marker in markers" :key="marker[0]" :lat-lng="marker" :icon="bomb">
        <l-tooltip>אפשר להוסיף כאן כיתוב מאוחר יותר</l-tooltip>
      </l-marker>

    </l-map>
  </div>
</template>
  
<script>
import "leaflet/dist/leaflet.css";
import { latLng, icon } from "leaflet";
import { mapActions } from 'vuex';
import { LMap, LTileLayer, LTooltip, LMarker } from "vue2-leaflet";

export default {
  name: "IsraelMap",
  components: {
    LMap,
    LTileLayer,
    LTooltip,
    LMarker,
  },
  data() {
    return {
      zoom: 7.5,
      center: latLng(31.360241, 34.900212),
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      mapOptions: {
        zoomSnap: 0.5,
      },
      markers: [],
      //change later icon to fontawesome one
      bomb: icon({
        iconUrl: "data:image/png;base64,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",
        iconSize: [32, 37],
        iconAnchor: [16, 37]
      }),
    };
  },
  async created() {
    //this.markers = add api request that gets coordinates of targets, the line below is hardcoded
    this.markers = [[35.504, 31.159], [32.504, 36.159], [27.504, 34.159]];
  },
  methods: {
    ...mapActions(["changeSelectedLat","changeSelectedLng"]),
    selectBomb(event) {
      this.changeSelectedLat(event.latlng.lat);
      this.changeSelectedLng(event.latlng.lng);
      //changes the selected coordinates on map, by selecting a place in the map.
    }
  },
  computed: {

  },
};
</script>
  
<style></style>
  