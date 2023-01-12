const express = require("express");

const appointmentController = require("../../controllers/appointment/appointmentController");
const authPatientController = require("../../controllers/patient/auth/patientAuthController");

const router = express.Router();

router.route("/").get(appointmentController.getAllAppointment);

router.route("/done/:id").post(appointmentController.doneAppointment);

router.route("/accept/:id").post(appointmentController.acceptAppointment);

router.route("/cancel/:id").post(appointmentController.cancelAppointment);

router
  .route("/patient/:id")
  .get(appointmentController.getAllAppointmentByPatientId);

router
  .use(authPatientController.protect)
  .route("/")
  .post(appointmentController.createAppointment);

router
  .use(authPatientController.protect)
  .route("/patient/get/me")
  .get(appointmentController.getAllAppointmentByPatientMe);

router
  .route("/doctor/:id")
  .get(appointmentController.getAllAppointmentByDoctorId);

router.route("/:id").get(appointmentController.getAppointmentById);

router.route("/:id").delete(appointmentController.deleteAppointmentById);

module.exports = router;
