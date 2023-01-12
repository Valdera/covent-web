const express = require("express");

const doctorController = require("../../controllers/doctor/doctorController");

const router = express.Router();

router.route("/").post(doctorController.createDoctor);

router.route("/").get(doctorController.getAllDoctor);

router
  .route("/specialization/:id")
  .get(doctorController.getAllDoctorBySpecialization);

router.route("/:id").get(doctorController.getDoctorById);

router.route("/:id").delete(doctorController.deleteDoctorById);

module.exports = router;
