// Module import
const express = require("express");

// File import
const adminController = require("../controllers/adminController");

const router = express.Router();

// Routes (/v1/service)
router.route("/").post(adminController.createAdmin);
router.route("/").get(adminController.getAllAdmin);
router.route("/:id").get(adminController.getAdminByID);
router.route("/:id").patch(adminController.updateAdminById);
router.route("/:id").delete(adminController.deleteAdminById);

module.exports = router;
