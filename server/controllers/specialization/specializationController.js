const catchAsync = require("../../utils/catchAsync");
const CustomError = require("../../utils/customError");

const specializationRepository = require("../../repositories/specialization/specializationRepository");

exports.createSpecialization = catchAsync(async (req, res, next) => {
  const specialization = await specializationRepository.createSpecialization(
    req.body
  );

  res.status(201).json({
    status: "success",
    data: specialization,
  });
});

exports.getAllSpecialization = catchAsync(async (req, res, next) => {
  const specializations = await specializationRepository.getAllSpecialization();

  res.status(200).json({
    status: "success",
    data: specializations,
  });
});

exports.getSpecializationById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const specialization = await specializationRepository.getSpecializationById(
    id
  );

  res.status(200).json({
    status: "success",
    data: specialization,
  });
});

exports.deleteSpecializationById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  await specializationRepository.deleteSpecializationById(id);

  res.status(200).json({
    status: "success",
  });
});
