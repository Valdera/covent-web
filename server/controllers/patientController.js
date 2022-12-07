const catchAsync = require("../utils/catchAsync");
const CustomError = require("../utils/customError");

const patientRepository = require("../repositories/patientRepository");

exports.createPatient = catchAsync(async (req, res, next) => {
  // validasi request
  const { name, age, gender, address, phoneNumber, ktpNumber } = req.body;

  // insert to database
  const patient = await patientRepository.createPatient(
    name,
    age,
    gender,
    address,
    phoneNumber,
    ktpNumber
  );

  if (patient instanceof Error) {
    return next(new CustomError("Cannot create document", 404));
  }

  // send response
  res.status(200).json({
    status: "success",
    data: patient,
  });
});

exports.getPatientByID = catchAsync(async (req, res, next) => {
  const patientId = req.params.id;
  if (!patientId) {
    return next(new CustomError("Please input a correct id", 401));
  }

  // insert to database
  const patient = await patientRepository.getPatientByID(patientId);

  if (patient instanceof Error) {
    return next(new CustomError("Cannot create document", 404));
  }

  // send response
  res.status(200).json({
    status: "success",
    data: patient,
  });
});

exports.getAllPatient = catchAsync(async (req, res, next) => {
  const patientList = await patientRepository.getAllPatient();

  res.status(200).json({
    status: "success",
    data: patientList,
  });
});

exports.deletePatientById = catchAsync(async (req, res, next) => {
  const patientId = req.params.id;
  if (!patientId) {
    return next(new CustomError("Please input a correct id", 401));
  }
  const patient = await patientRepository.deletePatientByID(patientId);

  res.status(200).json({
    status: "success",
    data: patient,
  });
});

exports.updatePatientById = catchAsync(async (req, res, next) => {
  const patientId = req.params.id;

  if (!patientId) {
    return next(new CustomError("Please input a correct id", 401));
  }

  // insert to database
  const patient = await patientRepository.updatePatientByID(
    patientId,
    req.body
  );

  if (patient instanceof Error) {
    return next(new CustomError("Cannot update an admin", 404));
  }

  // send response
  res.status(201).json({
    status: "success",
    data: patient,
  });
});
