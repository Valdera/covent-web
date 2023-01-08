const catchAsync = require("@utils/catchAsync");
const CustomError = require("@utils/customError");

const patientRepository = require("@repositories/patient/patientRepository");

exports.createPatient = catchAsync(async (req, res, next) => {
  const patient = await patientRepository.createPatient(req.body);

  res.status(201).json({
    status: "success",
    data: patient,
  });
});

exports.getAllPatient = catchAsync(async (req, res, next) => {
  const patients = await patientRepository.getAllPatient();

  res.status(200).json({
    status: "success",
    data: patients,
  });
});

exports.getPatientById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const patient = await patientRepository.getPatientById(id);

  res.status(200).json({
    status: "success",
    data: patient,
  });
});

exports.deletePatientById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  await patientRepository.deletePatientById(id);

  res.status(200).json({
    status: "success",
  });
});
