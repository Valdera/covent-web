const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
  },
  role: {
    type: String,
    required: [true, "Please enter the role"],
    enum: {
      values: ["DOCTOR", "STAFF"],
      message: "{VALUE} is not supported",
    },
  },
  createdAt: {
    type: Date
  },
  updatedAt: {
    type: Date
  },
  deletedAt: {
    type: Date
  },
});

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
