const Doctor = require("@models/doctor/doctorModel");
const { filterObj } = require("@utils/filter");

exports.createDoctor = async (body) => {
  const filteredBody = filterObj(body, "name", "specialization");
  const doctor = await Doctor.create(filteredBody);
  return doctor;
};

exports.getAllDoctor = async () => {
  const doctors = await Doctor.find();
  return doctors;
};

exports.getDoctorById = async (id) => {
  const doctor = await Doctor.findById(id);
  return doctor;
};

exports.updateDoctorById = async (id, body) => {
  const filteredBody = filterObj(body, "name", "specialization");
  const doctor = await Doctor.findByIdAndUpdate(id, filteredBody, {
    new: true,
    runValidators: true,
  });
  return doctor;
};

exports.getAllDoctorBySpecialization = async (specialization) => {
  const doctors = await Doctor.find({ specialization });
  return doctors;
};

exports.deleteDoctorById = async (id) => {
  await Doctor.findByIdAndDelete(id);
};
