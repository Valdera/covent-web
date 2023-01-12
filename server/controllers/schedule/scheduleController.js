const catchAsync = require("../../utils/catchAsync");
const CustomError = require("../../utils/customError");

const scheduleRepository = require("../../repositories/schedule/scheduleRepository");

exports.createSchedule = catchAsync(async (req, res, next) => {
  const schedule = await scheduleRepository.createSchedule(req.body);

  res.status(201).json({
    status: "success",
    data: schedule,
  });
});

exports.getAllSchedule = catchAsync(async (req, res, next) => {
  const schedules = await scheduleRepository.getAllSchedule();

  res.status(200).json({
    status: "success",
    data: schedules,
  });
});

exports.getScheduleById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const schedule = await scheduleRepository.getScheduleById(id);

  res.status(200).json({
    status: "success",
    data: schedule,
  });
});

exports.getAllScheduleByDoctorId = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const schedules = await scheduleRepository.getAllScheduleByDoctorId(id);

  res.status(200).json({
    status: "success",
    data: schedules,
  });
});

exports.deleteScheduleById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  await scheduleRepository.deleteScheduleById(id);

  res.status(200).json({
    status: "success",
  });
});
