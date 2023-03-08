var express = require("express");
var router = express.Router();
const typesService = require("../services/typesService");

router.get("/", async (req, res) => {
  try {
    const types = await typesService.getAllTypes();

    if (!types) {
      res.status(404).send("not found");
    } else {
      res.status(200).send(types);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
