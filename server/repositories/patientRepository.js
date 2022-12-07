const Patient = require("../models/patientModel");

exports.createPatient = async (
  name,
  age,
  gender,
  address,
  phoneNumber,
  ktpNumber
) => {
  try {
    const createdAt = Date.now();

    const doc = await Patient.create({
      name: name,
      age: age,
      gender: gender,
      address: address,
      phoneNumber: phoneNumber,
      ktpNumber: ktpNumber,
      createdAt: createdAt,
    });

    return doc;
  } catch (err) {
    return err;
  }
};

exports.getPatientByID = async (patientId) => {
  try {
    const patient = await Patient.findById(patientId);

    return patient;
  } catch (err) {
    return err;
  }
};

exports.getAllPatient = async () => {
  try {
    const doc = await Patient.find();

    return doc;
  } catch (err) {
    return err;
  }
};

exports.updatePatientByID = async (patientId, body) => {
  body["updatedAt"] = Date.now();
  try {
    const patient = await Patient.findByIdAndUpdate(patientId, body, {
      new: true,
      runValidators: true,
    });

    return patient;
  } catch (err) {
    return err;
  }
};

exports.deletePatientByID = async (adminId) => {
  // Do we need this because there is deleted by in the table?

  try {
    const patient = await Patient.findByIdAndDelete(adminId);

    return patient;
  } catch (err) {
    return err;
  }
};
