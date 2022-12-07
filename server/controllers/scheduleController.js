const catchAsync = require("../utils/catchAsync");
const CustomError = require("../utils/customError");

const scheduleRepository = require("../repositories/scheduleRepository");

exports.createSchedule = catchAsync(async (req, res, next) => {
  // validasi request
  const { available, scheduleStart, scheduleEnd } = req.body;

  // insert to database
  const schedule = await scheduleRepository.createSchedule(
    available,
    scheduleStart,
    scheduleEnd
  );

  if (schedule instanceof Error) {
    return next(new CustomError("Cannot create document", 404));
  }

  // send response
  res.status(201).json({
    status: "success",
    data: schedule,
  });
});

exports.getAllSchedule = catchAsync(async (req, res, next) => {
  const scheduleList = await scheduleRepository.getAllSchedule();

  res.status(200).json({
    status: "success",
    data: scheduleList,
  });
});

exports.getScheduleByID = catchAsync(async (req, res, next) => {
  const scheduleId = req.params.id;
  if (!scheduleId) {
    return next(new CustomError("Please input a correct id", 401));
  }

  // insert to database
  const schedule = await scheduleRepository.getScheduleByID(scheduleId);

  if (schedule instanceof Error) {
    return next(new CustomError("Cannot get a schedule", 404));
  }

  // send response
  res.status(200).json({
    status: "success",
    data: schedule,
  });
});

exports.updateScheduleById = catchAsync(async (req, res, next) => {
  const scheduleId = req.params.id;
  if (!scheduleId) {
    return next(new CustomError("Please input a correct id", 401));
  }

  // insert to database
  const schedule = await scheduleRepository.updateScheduleByID(
    scheduleId,
    req.body
  );

  if (schedule instanceof Error) {
    return next(new CustomError("Cannot update a schedule", 404));
  }

  // send response
  res.status(201).json({
    status: "success",
    data: schedule,
  });
});
