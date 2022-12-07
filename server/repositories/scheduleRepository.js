const Schedule = require("../models/scheduleModel");

exports.createSchedule = async (available, scheduleStart, scheduleEnd) => {
  try {
    const createdAt = Date.now();

    const doc = await Schedule.create({
      available: available,
      scheduleStart: scheduleStart,
      scheduleEnd: scheduleEnd,
      createdAt: createdAt,
    });

    return doc;
  } catch (err) {
    return err;
  }
};

exports.getAllSchedule = async () => {
  try {
    const doc = await Schedule.find();

    return doc;
  } catch (err) {
    return err;
  }
};

exports.getScheduleByID = async (scheduleId) => {
  try {
    const schedule = await Schedule.findById(scheduleId);

    return schedule;
  } catch (err) {
    return err;
  }
};

exports.updateScheduleByID = async (scheduleId, body) => {
  try {
    const schedule = await Schedule.findByIdAndUpdate(scheduleId, body, {
      new: true,
      runValidators: true,
    });

    return schedule;
  } catch (err) {
    return err;
  }
};
