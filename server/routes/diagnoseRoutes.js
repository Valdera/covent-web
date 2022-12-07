// Module import
const express = require("express");

// File import
const diagnoseController = require("../controllers/diagnoseController");

const router = express.Router();

// Routes (/v1/ping)
router.route("/").post(diagnoseController.createDiagnose);
router.route("/").get(diagnoseController.getAllDiagnose);
router.route("/:id").get(diagnoseController.getDiagnoseByID);
router.route("/:id").patch(diagnoseController.updateDiagnoseById);
router.route("/:id").delete(diagnoseController.deleteDiagnoseById);
module.exports = router;
