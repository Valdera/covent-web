// Module import
const express = require("express");

// File import
const bookingController = require("../controllers/bookingController");

const router = express.Router();

// Routes (/v1/service)
router.route("/create").post(bookingController.createBooking);
router.route("/cancel").post(bookingController.cancelAppointment);
router.route("/accept").post(bookingController.acceptAppointment);
router.route("/complete").post(bookingController.completeAppointment);
router.route("/").get(bookingController.getAllBooking);
router.route("/:id").get(bookingController.getBookingById);
router.route("/:id").patch(bookingController.updateBookingById);
router.route("/:id").delete(bookingController.deleteBookingById);

module.exports = router;
