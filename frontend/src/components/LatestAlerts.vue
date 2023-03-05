<template>
  <div>
    <div class="card latest-alerts" style="width: 18rem">
      <div class="card-body">
        <h5 class="card-title">התראות חדשות</h5>
        <hr>
        <p class="card-text">
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </p>
        <a href="#" class="create-alert"><font-awesome-icon icon="fa-solid fa-circle-plus" /></a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LatestAlerts",
};
</script>

<style scoped>
.latest-alerts {
  background-color: midnightblue;
  color: white;
  text-align: center;
}

.create-alert {
  color: white;
}
</style>
