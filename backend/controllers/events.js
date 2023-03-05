var express = require("express");
var router = express.Router();
const eventService = require("../services/eventService");

router.get("/", async (req, res) => {
  try {
    const events = await eventService.getAllEvents();

    if (!events) {
      res.status(404).send("not found");
    } else {
      res.send(events);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const event = await eventService.getEventById(req.params.id);

    if (!event) {
      res.status(404).send("not found");
    } else {
      res.send(event);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/:date", async (req, res) => {
  try {
    const events = await eventService.getEventAfterDate(req.params.date);

    if (!events) {
      res.status(404).send("not found");
    } else {
      res.send(events);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const response = await eventService.uploadEvent(req.body);

    if (!response) {
      res.status(404).send("not found");
    } else {
      res.send(response);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
