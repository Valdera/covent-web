const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.ObjectId,
    ref: "Patient",
    required: [true, "Please enter the patient Id"],
  },
  specialization: {
    type: mongoose.Schema.ObjectId,
    ref: "Specialization",
    required: [true, "Please enter the specialization"],
  },
  doctor: {
    type: mongoose.Schema.ObjectId,
    ref: "Doctor",
    required: [true, "Please enter the doctor Id"],
  },
  schedule: {
    type: mongoose.Schema.ObjectId,
    ref: "Schedule",
    required: [true, "Please enter the schedule Id"],
  },
  status: {
    type: String,
    default: "CREATED",
    enum: {
      values: ["CREATED", "ACCEPTED", "DONE"],
      message: "{VALUE} is not supported",
    },
  },
  issue: {
    type: String,
    required: [true, "Please enter the issue"],
  },
  createdAt: {
    type: Date,
  },
  updatedAt: {
    type: Date,
  },
});

appointmentSchema.pre(/^find/, function (next) {
  this.populate({
    path: "specialization",
    select: "_id name",
  });

  this.populate({
    path: "schedule",
    select: "_id date startHour endHour",
  });

  this.populate({
    path: "patient",
    select: "_id name",
  });

  this.populate({
    path: "doctor",
    select: "_id name",
  });

  next();
});

const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;
