const Patient = require("../../models/patient/patientModel");
const { filterObj } = require("../../utils/filter");

exports.createPatient = async (body) => {
  const filteredBody = filterObj(
    body,
    "email",
    "password",
    "name",
    "birthdate",
    "gender",
    "phoneNumber",
    "ktpNumber"
  );
  const patient = await Patient.create(filteredBody);
  return patient;
};

exports.getAllPatient = async () => {
  const patients = await Patient.find();
  return patients;
};

exports.getPatientByEmail = async (email) => {
  const patient = await Patient.findOne({ email }).select("+password");
  return patient;
};

exports.getPatientById = async (id) => {
  const patient = await Patient.findById(id);
  return patient;
};

exports.updatePatientById = async (id, body) => {
  const filteredBody = filterObj(
    body,
    "name",
    "birthdate",
    "gender",
    "phoneNumber",
    "ktpNumber"
  );
  const patient = await Patient.findByIdAndUpdate(id, filteredBody, {
    new: true,
    runValidators: true,
  });
  return patient;
};

exports.deletePatientById = async (id) => {
  await Patient.findByIdAndDelete(id);
};
