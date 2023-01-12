const express = require("express");

const scheduleController = require("../../controllers/schedule/scheduleController");

const router = express.Router();

router.route("/").post(scheduleController.createSchedule);

router.route("/").get(scheduleController.getAllSchedule);

router.route("/doctor/:id").get(scheduleController.getAllScheduleByDoctorId);

router.route("/:id").get(scheduleController.getScheduleById);

router.route("/:id").delete(scheduleController.deleteScheduleById);

module.exports = router;
