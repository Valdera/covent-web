const catchAsync = require("../utils/catchAsync");
const CustomError = require("../utils/customError");

const diagnoseRepository = require("../repositories/diagnoseRepository");

exports.createDiagnose = catchAsync(async (req, res, next) => {
  // validasi request
  const { service, doctorName, disease, description, 
    deletedAt, createdBy, createdAt, updatedAt } = req.body;

  // insert to database
  const diagnose = await diagnoseRepository.createDiagnose(service, doctorName, disease,
    description, deletedAt, createdBy, createdAt, updatedAt);

  if (diagnose instanceof Error) {
    return next(new CustomError("Cannot create document", 404));
  }

  // send response
  res.status(200).json({
    status: "success",
    data: diagnose,
  });
});

exports.getDiagnoseByID = catchAsync(async (req, res, next) => {
  const diagnoseId = req.params.id;
  if (!diagnoseId) {
    return next(new CustomError("Please input a correct id", 401));
  }

  // insert to database
  const diagnose = await diagnoseRepository.getDiagnoseByID(diagnoseId);

  if (diagnose instanceof Error) {
    return next(new CustomError("Cannot create document", 404));
  }

  // send response
  res.status(200).json({
    status: "success",
    data: diagnose,
  });
});

exports.getAllDiagnose = catchAsync(async (req, res, next) => {
  const diagnoseList = await diagnoseRepository.getAllDiagnose();

  res.status(200).json({
    status: "success",
    data: diagnoseList,
  });
});

exports.deleteDiagnoseById = catchAsync(async (req, res, next) => {
  const diagnoseId = req.params.id;
  if (!diagnoseId) {
    return next(new CustomError("Please input a correct id", 401));
  }
  const diagnose = await diagnoseRepository.deleteDiagnoseById(diagnoseId);

  res.status(200).json({
    status: "success",
    data: diagnose,
  });
});

exports.updateDiagnoseById = catchAsync(async (req, res, next) => {
  const diagnoseId = req.params.id;


  if (!diagnoseId) {
    return next(new CustomError("Please input a correct id", 401));
  }

  // insert to database
  const diagnose = await diagnoseRepository.updateDiagnoseByID(
      diagnoseId,
      req.body
  );

  if (diagnose instanceof Error) {
    return next(new CustomError("Cannot update an admin", 404));
  }

  // send response
  res.status(201).json({
    status: "success",
    data: diagnose,
  });
});
