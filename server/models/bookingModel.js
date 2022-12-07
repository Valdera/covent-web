const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.ObjectId,
    ref: "Patient",
    required: [true, "Please enter the patient ID"],
  },
  status: {
    type: String,
    enum: {
      values: ["CREATED", "ACCEPTED", "DONE", "CANCELLED"],
      message: "{VALUE} is not supported",
    },
  },
  service: {
    type: mongoose.Schema.ObjectId,
    ref: "Service",
    required: [true, "Please enter the service ID"],
  },
  scheduleId: {
    type: mongoose.Schema.ObjectId,
    ref: "Schedule",
    required: [true, "Please enter the schedule ID"],
  },
  acceptedBy: {
    type: mongoose.Schema.ObjectId,
    ref: "Admin",
  },
  createdAt: {
    type: Date,
  },
  updatedAt: {
    type: Date,
  },
  deletedAt: {
    type: Date,
  },
});

bookingSchema.pre(/^find/, function (next) {
  this.populate({
    path: "service",
    select: "doctor",
  });
  next();
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
