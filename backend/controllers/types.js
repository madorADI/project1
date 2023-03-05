var express = require("express");
var router = express.Router();
const typesService = require("../services/typesService");

router.get("/", async (req, res) => {
  try {
    const events = await typesService.getAllTypes();

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
