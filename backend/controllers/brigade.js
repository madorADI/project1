var express = require("express");
var router = express.Router();
const brigadeService = require("../services/brigadeService");

router.get("/", async (req, res) => {
  try {
    const brigades = await brigadeService.getAllBrigades();

    if (!brigades) {
      res.status(404).send("not found");
    } else {
      res.status(200).send(brigades);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
