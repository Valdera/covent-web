const catchAsync = require("../../utils/catchAsync");
const CustomError = require("../../utils/customError");

const appointmentRepository = require("../../repositories/appointment/appointmentRepository");
const scheduleRepository = require("../../repositories/schedule/scheduleRepository");

exports.createAppointment = catchAsync(async (req, res, next) => {
  const { schedule } = req.body;
  const user = req.user;

  req.body.patient = user._id;

  if (schedule == null) {
    next(new CustomError("schedule field is null", 400));
  }

  const scheduleObj = await scheduleRepository.getScheduleById(schedule);

  if (scheduleObj == null) {
    next(new CustomError("schedule is invalid", 400));
  }
  if (scheduleObj.totalPatient <= 0) {
    next(new CustomError("schedule is fully booked", 400));
  }

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

exports.acceptAppointment = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const appointment = await appointmentRepository.getAppointmentById(id);

  const schedule = appointment.schedule._id;

  const scheduleObj = await scheduleRepository.getScheduleById(schedule);
  if (scheduleObj == null) {
    next(new CustomError("schedule is invalid", 400));
  }

  if (scheduleObj.totalPatient <= 0) {
    next(new CustomError("schedule is fully booked", 400));
  }

  await scheduleRepository.udpateScheduleById(schedule, {
    totalPatient: scheduleObj.totalPatient - 1,
  });

  await appointmentRepository.udpateAppointmentById(id, {
    status: "ACCEPTED",
  });

  res.status(200).json({
    status: "success",
  });
});

exports.doneAppointment = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const appointment = await appointmentRepository.getAppointmentById(id);

  if (appointment.status != "ACCEPTED") {
    next(new CustomError("Appointment is not yet accepted", 400));
  }

  await appointmentRepository.udpateAppointmentById(id, {
    status: "DONE",
  });

  res.status(200).json({
    status: "success",
  });
});

exports.cancelAppointment = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  await appointmentRepository.udpateAppointmentById(id, {
    status: "CANCELLED",
  });

  res.status(200).json({
    status: "success",
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

exports.getAllAppointmentByPatientMe = catchAsync(async (req, res, next) => {
  const user = req.user;
  const appointment = await appointmentRepository.getAllAppointmentByPatientId(
    user._id
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
