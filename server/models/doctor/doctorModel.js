const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name"],
    },
    specialization: {
      type: mongoose.Schema.ObjectId,
      ref: "Specialization",
      required: [true, "Please enter your password"],
    },
  },
  {
    timestamps: true,
  }
);

doctorSchema.pre(/^find/, function (next) {
  this.populate({
    path: "specialization",
    select: "_id name",
  });

  next();
});

const Doctor = mongoose.model("Doctor", doctorSchema);

module.exports = Doctor;
