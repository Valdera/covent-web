const Schedule = require("../../models/schedule/scheduleModel");
const { filterObj } = require("../../utils/filter");

exports.createSchedule = async (body) => {
  const filteredBody = filterObj(
    body,
    "doctor",
    "totalPatient",
    "startTime",
    "endTime"
  );
  const schedule = await Schedule.create(filteredBody);
  return schedule;
};

exports.getAllSchedule = async () => {
  const schedules = await Schedule.find();
  return schedules;
};

exports.getScheduleById = async (id) => {
  const schedules = await Schedule.findById(id);
  return schedules;
};

exports.getAllScheduleByDoctorId = async (doctor) => {
  const schedules = await Schedule.find({ doctor });
  return schedules;
};

exports.udpateScheduleById = async (id, body) => {
  const filteredBody = filterObj(body, "totalPatient", "startTime", "endTime");
  const schedule = await Schedule.findByIdAndUpdate(id, filteredBody, {
    new: true,
    runValidators: true,
  });
  return schedule;
};

exports.deleteScheduleById = async (id) => {
  await Schedule.findByIdAndDelete(id);
};
