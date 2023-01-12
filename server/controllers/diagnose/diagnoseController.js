const catchAsync = require("../../utils/catchAsync");
const CustomError = require("../../utils/customError");

const diagnoseRepository = require("../../repositories/diagnose/diagnoseRepository");

exports.createDiagnose = catchAsync(async (req, res, next) => {
  const diagnose = await diagnoseRepository.createDiagnose(req.body);

  res.status(201).json({
    status: "success",
    data: diagnose,
  });
});

exports.getAllDiagnose = catchAsync(async (req, res, next) => {
  const diagnoses = await diagnoseRepository.getAllDiagnose();

  res.status(200).json({
    status: "success",
    data: diagnoses,
  });
});

exports.getDianoseById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const diagnose = await diagnoseRepository.getDiagnoseById(id);

  res.status(200).json({
    status: "success",
    data: diagnose,
  });
});

exports.getAllDiagnoseByPatientId = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const diagnoses = await diagnoseRepository.getAllDiagnoseByPatientId(id);

  res.status(200).json({
    status: "success",
    data: diagnoses,
  });
});

exports.deleteDiagnoseById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  await diagnoseRepository.deleteDiagnoseById(id);

  res.status(200).json({
    status: "success",
  });
});
