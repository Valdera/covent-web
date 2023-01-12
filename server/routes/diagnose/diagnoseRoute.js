const express = require("express");

const diagnoseController = require("../../controllers/diagnose/diagnoseController");

const router = express.Router();

router.route("/").post(diagnoseController.createDiagnose);

router.route("/").get(diagnoseController.getAllDiagnose);

router.route("/patient/:id").get(diagnoseController.getAllDiagnoseByPatientId);

router.route("/:id").get(diagnoseController.getDianoseById);

router.route("/:id").delete(diagnoseController.deleteDiagnoseById);

module.exports = router;
