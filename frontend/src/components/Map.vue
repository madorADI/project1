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
        iconUrl: "http://www.clker.com/cliparts/y/e/Q/T/p/N/red-bomb.svg.hi.png",
        iconSize: [30, 37],
        iconAnchor: [16, 37]
      }),
    };
  },
  async created() {
    //this.markers = add api request that gets coordinates of targets, the line below is hardcoded
      //this.markers= [{_id:"6404a7d352dd972914b315a2", coor: [35.504, 31.159]},{id:2, coor: [32.504, 36.159]},{id:3, coor: [27.504, 34.159]}];
      this.markers = [[34,35],[23,34],[45,56]];
  },
  methods: {
    ...mapActions(["changeSelectedLat","changeSelectedLng","changeSelectedAlertId"]),
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
 