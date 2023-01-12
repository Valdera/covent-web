const express = require("express");

const patientController = require("../../controllers/patient/patientController");
const authPatientController = require("../../controllers/patient/auth/patientAuthController");

const router = express.Router();

router.route("/register").post(authPatientController.register);
router.route("/login").post(authPatientController.login);

// router.route("/").post(patientController.createPatient);

router.route("/").get(patientController.getAllPatient);

router.route("/:id").get(patientController.getPatientById);

router
  .use(authPatientController.protect)
  .route("/get/me")
  .get(patientController.getPatientMe);

// router.route("/:id").delete(patientController.deletePatientById);

module.exports = router;
