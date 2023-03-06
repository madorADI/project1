var express = require("express");
var router = express.Router();
const weaponsService = require("../services/weaponsService");

router.get("/", async (req, res) => {
  try {
    const weapons = await weaponsService.getAllWeapons();

    if (!weapons) {
      res.status(404).send("not found");
    } else {
      res.status(200).send(weapons);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
