const Admin = require("../models/adminModel");
const catchAsync = require("../utils/catchAsync");

exports.createAdmin = async (name, role) => {
  try {
    const createdAt = Date.now();

    const admin = await Admin.create({
      name: name,
      role: role,
      createdAt: createdAt,
    });

    return admin;
  } catch (err) {
    return err;
  }
};

exports.getAdminByID = async (adminId, role = undefined) => {
  try {
    const query = Admin.findById(adminId);

    if (role != undefined) {
      query.where("role").equals(role);
    }

    const admin = await query.exec();

    return admin;
  } catch (err) {
    return err;
  }
};

exports.getAllAdmin = async (role) => {
  try {
    const query = Admin.find();

    if (role != undefined) {
      query.where("role").equals(role);
    }

    const res = await query.exec();
    return res;
  } catch (err) {
    return err;
  }
};

exports.updateAdminByID = async (adminId, body) => {
  body["updatedAt"] = Date.now();
  try {
    const admin = await Admin.findByIdAndUpdate(adminId, body, {
      new: true,
      runValidators: true,
    });

    console.log(admin);

    return admin;
  } catch (err) {
    return err;
  }
};

exports.deleteAdminByID = async (adminId) => {
  // Do we need this because there is deleted by in the table?

  try {
    const admin = await Admin.findByIdAndDelete(adminId);

    return admin;
  } catch (err) {
    return err;
  }
};
