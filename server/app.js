// Module import
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

// File import
const CustomError = require("./utils/customError");
const errorController = require("./controllers/errorController");
const pingRouter = require("./routes/pingRoutes");
const patientRouter = require("./routes/patientRoutes");
const serviceRouter = require("./routes/serviceRoutes");
const scheduleRouter = require("./routes/scheduleRoutes");
const adminRouter = require("./routes/adminRoutes");
const bookingRouter = require("./routes/bookingRoutes");

// Init express application
const app = express();

// Development logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Body parser, reading data from the body into req.body
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser());

// ROUTES
// Ping Routes
app.use("/v1/ping", pingRouter);
app.use("/v1/patient", patientRouter);
app.use("/v1/service", serviceRouter);
app.use("/v1/schedule", scheduleRouter);
app.use("/v1/admin", adminRouter);
app.use("/v1/booking", bookingRouter);

// Global Routes
app.all("*", (req, res, next) => {
  next(new CustomError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Handle errors
app.use(errorController);

module.exports = app;
