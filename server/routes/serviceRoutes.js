// Module import
const express = require("express");

// File import
const serviceController = require("../controllers/serviceController");

const router = express.Router();

// Routes (/v1/service)
router.route("/").post(serviceController.createService);
router.route("/").get(serviceController.getAllService);
router.route("/:id").get(serviceController.getServiceByID);
router.route("/:id").get(serviceController.updateServiceById);
router.route("/:id").get(serviceController.deleteServiceById);
module.exports = router;
