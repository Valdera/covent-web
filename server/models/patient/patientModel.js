const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");

const patientSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email"],
      required: [true, "Please enter your email"],
    },
    password: {
      type: String,
      required: [true, "Please enter yor password"],
    },
    name: {
      type: String,
      required: [true, "Please enter your name"],
    },
    birthdate: {
      type: Date,
      required: [true, "Please enter your birthdate"],
    },
    gender: {
      type: Number,
      required: [true, "Please enter your gender"],
      enum: {
        values: [0, 1],
        message: "{VALUE} is not supported",
      },
    },
    phoneNumber: {
      type: String,
      required: [true, "Please enter your phone number"],
    },
    ktpNumber: {
      type: String,
      required: [true, "Please enter your NIK"],
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

patientSchema.virtual("age").get(function () {
  return Math.floor(
    (Date.now() - this.birthdate.getTime()) / (1000 * 3600 * 24 * 365)
  );
});

patientSchema.pre("save", async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified("password")) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // Delete passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});

patientSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const Patient = mongoose.model("Patient", patientSchema);

module.exports = Patient;
