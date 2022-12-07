const catchAsync = require("../utils/catchAsync");
const CustomError = require("../utils/customError");

const adminRepository = require("../repositories/adminRepository");

exports.createAdmin = catchAsync(async (req, res, next) => {
  // validasi request
  const { name, role } = req.body;

  // insert to database
  const admin = await adminRepository.createAdmin(name, role);

  if (admin instanceof Error) {
    return next(new CustomError("Cannot create admin", 404));
  }

  // send response
  res.status(201).json({
    status: "success",
    data: admin,
  });
});

exports.getAdminByID = catchAsync(async (req, res, next) => {
  const adminId = req.params.id;

  const { role } = req.query;

  if (!adminId) {
    return next(new CustomError("Please input a correct id", 401));
  }

  // insert to database
  const admin = await adminRepository.getAdminByID(adminId, role);

  if (admin instanceof Error) {
    return next(new CustomError("Cannot create document", 404));
  }

  // send response
  res.status(200).json({
    status: "success",
    data: admin,
  });
});

exports.getAllAdmin = catchAsync(async (req, res, next) => {
  const role = req.query.role;

  const adminList = await adminRepository.getAllAdmin(role);

  res.status(200).json({
    status: "success",
    data: adminList,
  });
});

exports.deleteAdminById = catchAsync(async (req, res, next) => {
  const adminId = req.params.id;
  if (!adminId) {
    return next(new CustomError("Please input a correct id", 401));
  }
  const admin = await adminRepository.deleteAdminByID(adminId);

  res.status(200).json({
    status: "success",
    data: admin,
  });
});

exports.updateAdminById = catchAsync(async (req, res, next) => {
  const adminId = req.params.id;

  if (!adminId) {
    return next(new CustomError("Please input a correct id", 401));
  }

  // insert to database
  const admin = await adminRepository.updateAdminByID(adminId, req.body);

  if (admin instanceof Error) {
    return next(new CustomError("Cannot update an admin", 404));
  }

  // send response
  res.status(201).json({
    status: "success",
    data: admin,
  });
});
