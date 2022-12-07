const catchAsync = require("../utils/catchAsync");

exports.getPing = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: "success",
    data: "Pong!",
  });
});
