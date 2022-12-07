const Booking = require("../models/bookingModel");
const catchAsync = require("../utils/catchAsync");

exports.createBooking = async (patientId, service, scheduleId) => {
  try {
    const createdAt = Date.now();

    const booking = await Booking.create({
      patientId: patientId,
      status: "CREATED",
      service: service,
      scheduleId: scheduleId,
      createdAt: createdAt,
    });

    return booking;
  } catch (err) {
    return err;
  }
};

exports.getBookingByID = async (bookingId) => {
  try {
    const booking = await Booking.findById(bookingId);

    return booking;
  } catch (err) {
    return err;
  }
};

exports.getAllBooking = async () => {
  try {
    const doc = await Booking.find();

    return doc;
  } catch (err) {
    return err;
  }
};

exports.updateBookingByID = async (bookingId, body) => {
  body["updatedAt"] = Date.now();
  try {
    const booking = await Booking.findByIdAndUpdate(bookingId, body, {
      new: true,
      runValidators: true,
    });

    return booking;
  } catch (err) {
    return err;
  }
};

exports.deleteBookingByID = async (adminId) => {
  // Do we need this because there is deleted by in the table?

  try {
    const booking = await Booking.findByIdAndDelete(adminId);

    return booking;
  } catch (err) {
    return err;
  }
};
