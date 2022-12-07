const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your service name"],
  },
  doctor: {
    type: mongoose.Schema.ObjectId,
    ref: "Admin",
    required: [true, "Please enter doctor id"],
  },
  schedule: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Schedule",
      required: [true, "Please enter schedule id"],
    },
  ],
  createdAt: {
    type: Date,
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: "Admin",
  },
  updatedAt: {
    type: Date,
  },
  deletedAt: {
    type: Date,
  },
});

const Service = mongoose.model("Service", serviceSchema);

module.exports = Service;
