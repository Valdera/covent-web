// Module import
const express = require("express");

// File import
const pingController = require("../controllers/ping/pingController");

const router = express.Router();

// Routes (/v1/ping)
router.route("/").get(pingController.getPing);

module.exports = router;
