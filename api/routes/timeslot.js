const timeslotController = require("../controllers/timeslot.controller");

const express = require("express");
const router = express.Router();

router.post("/add-timeslot", timeslotController.addTimeslot);

router.get("/timeslots", timeslotController.getTimeslots);

router.delete("/remove-timeslot/:id", timeslotController.deleteTimeslot);

module.exports = router;