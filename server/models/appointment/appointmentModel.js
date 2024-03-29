const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.ObjectId,
      ref: "Patient",
      required: [true, "Please enter the patient Id"],
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
        values: ["CREATED", "ACCEPTED", "DONE", "CANCELLED"],
        message: "{VALUE} is not supported",
      },
    },
    issue: {
      type: String,
      required: [true, "Please enter the issue"],
    },
  },

  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

appointmentSchema.pre(/^find/, function (next) {
  this.populate({
    path: "schedule",
    select: "_id startTime endTime",
  });

  this.populate({
    path: "patient",
    select: "_id name birthdate",
  });

  this.populate({
    path: "doctor",
    select: "_id name specialization",
  });

  next();
});

const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;
