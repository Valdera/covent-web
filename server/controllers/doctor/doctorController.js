const catchAsync = require("@utils/catchAsync");
const CustomError = require("@utils/customError");

const doctorRepository = require("@repositories/doctor/doctorRepository");

exports.createDoctor = catchAsync(async (req, res, next) => {
  const doctor = await doctorRepository.createDoctor(req.body);

  res.status(201).json({
    status: "success",
    data: doctor,
  });
});

exports.getAllDoctor = catchAsync(async (req, res, next) => {
  const doctors = await doctorRepository.getAllDoctor();

  res.status(200).json({
    status: "success",
    data: doctors,
  });
});

exports.getDoctorById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const doctor = await doctorRepository.getDoctorById(id);

  res.status(200).json({
    status: "success",
    data: doctor,
  });
});

exports.getAllDoctorBySpecialization = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const doctors = await doctorRepository.getAllDoctorBySpecialization(id);

  res.status(200).json({
    status: "success",
    data: doctors,
  });
});

exports.deleteDoctorById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  await doctorRepository.deleteDoctorById(id);

  res.status(200).json({
    status: "success",
  });
});
