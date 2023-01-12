const express = require("express");

const adminController = require("../../controllers/admin/adminController");
const authAdminController = require("../../controllers/admin/auth/authAdminController");

const router = express.Router();

router.route("/register").post(authAdminController.register);

router.route("/login").post(authAdminController.login);

// router.route("/").post(adminController.createAdmin);

router.route("/").get(adminController.getAllAdmin);

router.route("/:id").get(adminController.getAdminById);

// router.route("/:id").delete(adminController.deleteAdminById);

module.exports = router;
