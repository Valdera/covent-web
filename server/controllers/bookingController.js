const catchAsync = require("../utils/catchAsync");
const CustomError = require("../utils/customError");

const bookingRepository = require("../repositories/bookingRepository");
const patientRepository = require("../repositories/patientRepository");
const serviceRepository = require("../repositories/serviceRepository");
const scheduleRepository = require("../repositories/scheduleRepository");

exports.acceptAppointment = catchAsync(async (req, res, next) => {
  const { bookingId } = req.body;

  const booking = await bookingRepository.getBookingByID(bookingId);
  if (booking == null) {
    return next(new CustomError("Booking ID is invalid"));
  }

  if ( booking.status == 'ACCEPTED'){
    return next(new CustomError("Booking ID is already accepted"));
  }

  booking.status = 'ACCEPTED'

  console.log((booking))

  const update = await bookingRepository.updateBookingByID(bookingId, booking);

  res.status(201).json({
    status: "success",
    data: update,
  });

})

exports.completeAppointment = catchAsync(async (req, res, next) => {
  const { bookingId } = req.body;

  const booking = await bookingRepository.getBookingByID(bookingId);
  if (booking == null) {
    return next(new CustomError("Booking ID is invalid"));
  }

  if ( booking.status == 'DONE'){
    return next(new CustomError("Booking ID is already done"));
  }

  booking.status = 'DONE'

  const update = await bookingRepository.updateBookingByID(bookingId, booking);

  res.status(201).json({
    status: "success",
    data: update,
  });

})


exports.cancelAppointment = catchAsync(async (req, res, next) => {
  // validasi request
  const { bookingId } = req.body;

  const booking = await bookingRepository.getBookingByID(bookingId);
  if (booking == null) {
    return next(new CustomError("Booking ID is invalid"));
  }

  if ( booking.status == 'CANCELLED'){
    return next(new CustomError("Booking ID is already cancelled"));
  }

  booking.status = 'CANCELLED'

  const booking_test = await bookingRepository.updateBookingByID(bookingId, booking);
  const schedule = await scheduleRepository.getScheduleByID(booking.scheduleId);


  if (schedule.available == 0){
    return next(new CustomError("Schedule is not available"));
  }

  schedule.available = schedule.available + 1

  await scheduleRepository.updateScheduleByID(booking.scheduleId, schedule);

  // send response
  res.status(201).json({
    status: "success",
    data: booking_test,
  });

})

exports.createBooking = catchAsync(async (req, res, next) => {
  // validasi request
  const { patientId, service, scheduleId } = req.body;

  const patientCheck = await patientRepository.getPatientByID(patientId);
  if (patientCheck == null) {
    return next(new CustomError("Patient ID is invalid"));
  }
  const serviceCheck = await serviceRepository.getServiceByID(service);
  if (serviceCheck == null) {
    return next(new CustomError("Service ID is invalid"));
  }

  if (serviceCheck.schedule.includes(scheduleId) == false) {
    return next(new CustomError("Schedule ID is invalid"));
  }

  const schedule = await scheduleRepository.getScheduleByID(scheduleId);

  // TODO: Check Available in schedule (DONE)

  if (schedule.available == 0){
    return next(new CustomError("Schedule is not available"));
  }

  // TODO: Update Available in schedule (DONE)
  schedule.available = schedule.available - 1

  await scheduleRepository.updateScheduleByID(scheduleId, schedule);


  // insert to database
  const booking = await bookingRepository.createBooking(
    patientId,
    service,
    scheduleId
  );

  if (booking instanceof Error) {
    return next(new CustomError("Cannot create booking", 404));
  }

  // send response
  res.status(201).json({
    status: "success",
    data: booking,
  });
});

exports.getBookingById = catchAsync(async (req, res, next) => {
  const bookingId = req.params.id;
  if (!bookingId) {
    return next(new CustomError("Please input a correct id", 401));
  }

  // insert to database
  const booking = await bookingRepository.getBookingByID(bookingId);

  if (booking instanceof Error) {
    return next(new CustomError("Cannot create document", 404));
  }

  // send response
  res.status(200).json({
    status: "success",
    data: booking,
  });
});

exports.getAllBooking = catchAsync(async (req, res, next) => {
  const bookingList = await bookingRepository.getAllBooking();

  res.status(200).json({
    status: "success",
    data: bookingList,
  });
});

exports.deleteBookingById = catchAsync(async (req, res, next) => {
  const bookingId = req.params.id;
  if (!bookingId) {
    return next(new CustomError("Please input a correct id", 401));
  }
  const booking = await bookingRepository.deleteBookingByID(bookingId);

  res.status(200).json({
    status: "success",
    data: booking,
  });
});

exports.updateBookingById = catchAsync(async (req, res, next) => {
  const bookingId = req.params.id;

  if (!bookingId) {
    return next(new CustomError("Please input a correct id", 401));
  }

  // insert to database
  const booking = await bookingRepository.updateBookingByID(
    bookingId,
    req.body
  );

  if (booking instanceof Error) {
    return next(new CustomError("Cannot update an admin", 404));
  }

  // send response
  res.status(201).json({
    status: "success",
    data: booking,
  });
});
