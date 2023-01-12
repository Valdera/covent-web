const Diagnose = require("../../models/diagnose/diagnoseModel");
const { filterObj } = require("../../utils/filter");

exports.createDiagnose = async (body) => {
  const filteredBody = filterObj(
    body,
    "patient",
    "doctor",
    "disease",
    "description"
  );
  const diagnose = await Diagnose.create(filteredBody);
  return diagnose;
};

exports.getAllDiagnose = async () => {
  const diagnoses = await Diagnose.find();
  return diagnoses;
};

exports.getDiagnoseById = async (id) => {
  const diagnose = await Diagnose.findById(id);
  return diagnose;
};

exports.getAllDiagnoseByPatientId = async (patient) => {
  const diagnoses = await Diagnose.find({ patient }).sort({
    createdAt: -1,
  });
  return diagnoses;
};

exports.updateDiagnoseById = async (id, body) => {
  const filteredBody = filterObj(body, "disease", "description");
  const diagnose = await Diagnose.findByIdAndUpdate(id, filteredBody, {
    new: true,
    runValidators: true,
  });
  return diagnose;
};

exports.deleteDiagnoseById = async (id) => {
  await Diagnose.findByIdAndDelete(id);
};
