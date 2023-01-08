const Specialization = require("@models/specialization/specializationModel");
const { filterObj } = require("@utils/filter");

exports.createSpecialization = async (body) => {
  const filteredBody = filterObj(body, "name");
  const specialization = await Specialization.create(filteredBody);
  return specialization;
};

exports.getAllSpecialization = async () => {
  const specializations = await Specialization.find();
  return specializations;
};

exports.getSpecializationById = async (id) => {
  const specialization = await Specialization.findById(id);
  return specialization;
};

exports.updateSpecializationById = async (id, body) => {
  const filteredBody = filterObj(body, "name");
  const specialization = await Specialization.findByIdAndUpdate(
    id,
    filteredBody,
    {
      new: true,
      runValidators: true,
    }
  );
  return specialization;
};

exports.deleteSpecializationById = async (id) => {
  await Specialization.findByIdAndDelete(id);
};
