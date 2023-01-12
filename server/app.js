// Module import
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
var cors = require("cors");

// File import
const CustomError = require("./utils/customError");
const errorController = require("./controllers/error/errorController");
const pingRouter = require("./routes/ping/pingRoute");
const adminRouter = require("./routes/admin/adminRoute");
const appointmentRouter = require("./routes/appointment/appointmentRoute");
const diagnoseRouter = require("./routes/diagnose/diagnoseRoute");
const doctorRouter = require("./routes/doctor/doctorRoute");
const patientRouter = require("./routes/patient/patientRoute");
const scheduleRouter = require("./routes/schedule/scheduleRoute");
const specializationRouter = require("./routes/specialization/specializationRoute");

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
app.use(cors({ origin: "*" }));

// ROUTES
// Ping Routes
app.use("/v1/ping", pingRouter);
app.use("/v1/admin", adminRouter);
app.use("/v1/appointment", appointmentRouter);
app.use("/v1/diagnose", diagnoseRouter);
app.use("/v1/doctor", doctorRouter);
app.use("/v1/patient", patientRouter);
app.use("/v1/schedule", scheduleRouter);
app.use("/v1/specialization", specializationRouter);

// Global Routes
app.all("*", (req, res, next) => {
  next(new CustomError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Handle errors
app.use(errorController);

module.exports = app;
