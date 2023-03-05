var express = require("express");
var router = express.Router();
const weaponsService = require("../services/weaponsService");

router.get("/", async (req, res) => {
  try {
    const events = await weaponsService.getAllWeapons();

    if (!events) {
      res.status(404).send("not found");
    } else {
      res.send(events);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
