// Module import
const express = require("express");

// File import
const patientController = require("../controllers/patientController");

const router = express.Router();

// Routes
router.route("/").post(patientController.createPatient);
router.route("/").get(patientController.getAllPatient);
router.route("/:id").get(patientController.getPatientByID);
router.route("/:id").patch(patientController.updatePatientById);
router.route("/:id").delete(patientController.deletePatientById);

module.exports = router;
