const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.ObjectId,
    ref: "Patient",
  },
  service: {
    type: mongoose.Schema.ObjectId,
    ref: "Service",
    required: [true, "Review must belong to a user"],
  },
  doctorName: {
    type: String,
    required: [true, "Please enter the doctor name"],
  },
  disease: {
    type: String,
    required: [true, "Please enter the disease"],
  },
  description: {
    type: String,
    required: [true, "Please enter the description"],
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: "Admin",
  },
  createdAt: {
    type: Date,
    required: [true, "Please enter the date"],
  },
  updatedAt: {
    type: Date,
    required: [true, "Please enter the date"],
  },
  deletedAt: {
    type: Date,
    required: [true, "Please enter the date"],
  },
});

const Diagnose = mongoose.model("Diagnose", diagnoseSchema);

module.exports = Diagnose;