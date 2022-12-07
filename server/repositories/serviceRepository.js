const Service = require("../models/serviceModel");
const catchAsync = require("../utils/catchAsync");

exports.createService = async (name, schedule, doctor) => {
  try {
    const createdAt = Date.now();

    const doc = await Service.create({
      name: name,
      createdAt: createdAt,
      schedule: schedule,
      doctor: doctor,
    });

    return doc;
  } catch (err) {
    return err;
  }
};

exports.getServiceByID = async (serviceId) => {
  try {
    const service = await Service.findById(serviceId);

    return service;
  } catch (err) {
    return err;
  }
};

exports.getAllService = async () => {
  try {
    const doc = await Service.find();

    return doc;
  } catch (err) {
    return err;
  }
};

exports.updateServiceByID = async (serviceId, body) => {
  try {
    const service = await Service.findByIdAndUpdate(serviceId, body, {
      new: true,
      runValidators: true,
    });

    return service;
  } catch (err) {
    return err;
  }
};

exports.deleteServiceByID = async (serviceId) => {
  // Do we need this because there is deleted by in the table?

  try {
    const service = await Service.findByIdAndDelete(serviceId);

    return service;
  } catch (err) {
    return err;
  }
};
