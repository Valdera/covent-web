const express = require("express");

const specializationController = require("../../controllers/specialization/specializationController");

const router = express.Router();

router.route("/").post(specializationController.createSpecialization);

router.route("/").get(specializationController.getAllSpecialization);

router.route("/:id").get(specializationController.getSpecializationById);

router.route("/:id").delete(specializationController.deleteSpecializationById);

module.exports = router;
