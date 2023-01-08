const mongoose = require("mongoose");

const diagnoseSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.ObjectId,
    ref: "Patient",
    required: [true, "Please enter the patient id"],
  },
  doctor: {
    type: mongoose.Schema.ObjectId,
    ref: "Doctor",
    required: [true, "Please enter the doctor id"],
  },
  disease: {
    type: String,
    required: [true, "Please enter the disease"],
  },
  description: {
    type: String,
    required: [true, "Please enter the description"],
  },
  createdAt: {
    type: Date,
    required: [true, "Please enter the date"],
  },
  updatedAt: {
    type: Date,
    required: [true, "Please enter the date"],
  },
});

doctorSchema.pre(/^find/, function (next) {
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

const Diagnose = mongoose.model("Diagnose", diagnoseSchema);

module.exports = Diagnose;
