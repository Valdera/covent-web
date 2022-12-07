const Diagnose = require("../models/diagnoseModel");

exports.createDiagnose = async (service, doctorName, disease, description, 
    deletedAt, createdBy, createdAt, updatedAt) => {
  try {
    const doc = await Diagnose.create({
      service: service,
      doctorName: doctorName,
      disease: disease,
      description: description,
      deletedAt: deletedAt,
      createdBy: createdBy,
      createdAt: createdAt,
      updatedAt: updatedAt,
    });

    return doc;
  } catch (err) {
    return err;
  }
};

exports.getDiagnoseByID = async (diagnoseId) => {
  try {
    const diagnose = await Diagnose.findById(diagnoseId);

    return diagnose;
  } catch (err) {
    return err;
  }
};

exports.getAllDiagnose = async () => {
  try {
    const doc = await Diagnose.find();

    return doc;
  } catch (err) {
    return err;
  }
};

exports.updateDiagnoseByID = async (diagnoseId, body) => {
  body['updatedAt'] = Date.now();
  try {
    const diagnose = await Diagnose.findByIdAndUpdate(diagnoseId, body, {
      new: true,
      runValidators: true,
    });

    return diagnose;
  } catch (err) {
    return err;
  }
};

exports.deleteDiagnoseByID = async (adminId) => {
  // Do we need this because there is deleted by in the table?

  try {
    const diagnose = await Diagnose.findByIdAndDelete(adminId);

    return diagnose;
  } catch (err) {
    return err;
  }
};
