const Appointment = require("@models/appointment/appointmentModel");
const { filterObj } = require("@utils/filter");

exports.createAppointment = async (body) => {
  const filteredBody = filterObj(
    body,
    "patient",
    "specialization",
    "schedule",
    "doctor",
    "status",
    "issue"
  );
  const appointment = await Appointment.create(filteredBody);
  return appointment;
};

exports.getAllAppointment = async () => {
  const appointment = await Appointment.find();
  return appointment;
};

exports.getAppointmentById = async (id) => {
  const appointment = await Appointment.findById(id);
  return appointment;
};

exports.getAllAppointmentByPatientId = async (patient) => {
  const appointments = await Appointment.find({ patient });
  return appointments;
};

exports.getAllAppointmentByDoctorId = async (doctor) => {
  const appointments = await Appointment.find({ doctor });
  return appointments;
};

exports.udpateAppointmentById = async (id, body) => {
  const filteredBody = filterObj(body, "status", "issue");
  const appointment = await Appointment.findByIdAndUpdate(id, filteredBody, {
    new: true,
    runValidators: true,
  });
  return appointment;
};

exports.deleteAppointmentById = async (id) => {
  await Appointment.findByIdAndDelete(id);
};
