const catchAsync = require("@utils/catchAsync");
const CustomError = require("@utils/customError");

const appointmentRepository = require("@repositories/appointment/appointmentRepository");

exports.createAppointment = catchAsync(async (req, res, next) => {
  const appointment = await appointmentRepository.createAppointment(req.body);

  res.status(201).json({
    status: "success",
    data: appointment,
  });
});

exports.getAllAppointment = catchAsync(async (req, res, next) => {
  const appointments = await appointmentRepository.getAllAppointment();

  res.status(200).json({
    status: "success",
    data: appointments,
  });
});

exports.getAppointmentById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const appointment = await appointmentRepository.getAppointmentById(id);

  res.status(200).json({
    status: "success",
    data: appointment,
  });
});

exports.getAllAppointmentByDoctorId = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const appointment = await appointmentRepository.getAllAppointmentByDoctorId(
    id
  );

  res.status(200).json({
    status: "success",
    data: appointment,
  });
});

exports.getAllAppointmentByPatientId = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const appointment = await appointmentRepository.getAllAppointmentByPatientId(
    id
  );

  res.status(200).json({
    status: "success",
    data: appointment,
  });
});

exports.deleteAppointmentById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  await appointmentRepository.deleteAppointmentById(id);

  res.status(200).json({
    status: "success",
  });
});
