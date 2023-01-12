const Admin = require("../../models/admin/adminModel");
const { filterObj } = require("../../utils/filter");

exports.createAdmin = async (body) => {
  const filteredBody = filterObj(body, "username", "password");
  const admin = await Admin.create(filteredBody);
  return admin;
};

exports.getAllAdmin = async () => {
  const admins = await Admin.find();
  return admins;
};

exports.getAdminByUsername = async (username) => {
  const admin = await Admin.findOne({ username }).select("+password");
  return admin;
};

exports.getAdminById = async (id) => {
  const admin = await Admin.findById(id);
  return admin;
};

exports.deleteAdminById = async (id) => {
  await Admin.findByIdAndDelete(id);
};
