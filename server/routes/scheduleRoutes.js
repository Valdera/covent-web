// Module import
const express = require("express");

// File import
const scheduleController = require("../controllers/scheduleController");

const router = express.Router();

// Routes (/v1/scedule)
router.route("/").post(scheduleController.createSchedule);
router.route("/").get(scheduleController.getAllSchedule);
router.route("/:id").get(scheduleController.getScheduleByID);
router.route("/:id").put(scheduleController.updateScheduleById);

module.exports = router;
