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
    date: {
      type: Date,
      required: [true, "Please enter the date"],
    },
    endHour: {
      type: Date,
      required: [true, "Please enter the end hour"],
    },
    startHour: {
      type: Date,
      required: [true, "Please enter the start hour"],
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
  }
);

const Schedule = mongoose.model("Schedule", scheduleSchema);

module.exports = Schedule;
