const catchAsync = require("../../utils/catchAsync");
const CustomError = require("../../utils/customError");

const adminRepository = require("../../repositories/admin/adminRepository");

exports.createAdmin = catchAsync(async (req, res, next) => {
  const admin = await adminRepository.createAdmin(req.body);

  res.status(201).json({
    status: "success",
    data: admin,
  });
});

exports.getAllAdmin = catchAsync(async (req, res, next) => {
  const admins = await adminRepository.getAllAdmin();

  res.status(200).json({
    status: "success",
    data: admins,
  });
});

exports.getAdminById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const admin = await adminRepository.getAdminById(id);

  res.status(200).json({
    status: "success",
    data: admin,
  });
});

exports.deleteAdminById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  await adminRepository.deleteAdminById(id);

  res.status(200).json({
    status: "success",
  });
});
