const jwt = require("jsonwebtoken");
const catchAsync = require("../../../utils/catchAsync");
const CustomError = require("../../../utils/customError");
const { promisify } = require("util");

const adminRepository = require("../../../repositories/admin/adminRepository");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {});
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  res.cookie("jwt", token, cookieOptions);

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

exports.register = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return next(new CustomError("Please provide username and password!", 400));
  }

  const user = await adminRepository.createAdmin(req.body);

  createSendToken(user, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;

  // 1) Check if username and password exist
  if (!username || !password) {
    return next(new CustomError("Please provide username and password!", 400));
  }

  // 2) Check if user exists && password is correct
  const user = await adminRepository.getAdminByUsername(username);

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new CustomError("Incorrect username or password", 401));
  }

  // 3) If everything ok, send token to client
  createSendToken(user, 200, res);
});

exports.protect = catchAsync(async (req, res, next) => {
  // 1) Getting token and check of it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(
      new CustomError(
        "You are not logged in! Please log in to get access.",
        401
      )
    );
  }

  // 2) Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) Check if user still exists
  const currentUser = await adminRepository.getAdminById(decoded.id);
  if (!currentUser) {
    return next(
      new CustomError(
        "The user belonging to this token does no longer exist.",
        401
      )
    );
  }

  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  next();
});