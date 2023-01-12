const mongoose = require("mongoose");

const diagnoseSchema = new mongoose.Schema(
  {
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
  },
  {
    timestamps: true,
  }
);

diagnoseSchema.pre(/^find/, function (next) {
  this.populate({
    path: "patient",
    select: "_id name birthdate",
  });

  this.populate({
    path: "doctor",
    select: "_id name",
  });

  next();
});

const Diagnose = mongoose.model("Diagnose", diagnoseSchema);

module.exports = Diagnose;
