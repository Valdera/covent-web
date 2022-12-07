const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema({
  available: {
    type: Number,
    required: [true, "Please enter availablility"],
  },
  scheduleStart: {
    type: Date,
    required: [true, "Please enter the date"],
  },
  scheduleEnd: {
    type: Date,
    required: [true, "Please enter the date"],
  },
});

const Schedule = mongoose.model("Schedule", scheduleSchema);

module.exports = Schedule;
