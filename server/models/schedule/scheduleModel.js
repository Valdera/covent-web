const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema(
  {
    totalPatient: {
      type: Number,
      required: [true, "Please enter availablility"],
    },
    doctor: {
      type: mongoose.Schema.ObjectId,
      ref: "Doctor",
    },
    startTime: {
      type: Date,
      required: [true, "Please enter the start time"],
    },
    endTime: {
      type: Date,
      required: [true, "Please enter the end time"],
    },
    createdAt: {
      type: Date,
    },
    updatedAt: {
      type: Date,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

const Schedule = mongoose.model("Schedule", scheduleSchema);

module.exports = Schedule;
