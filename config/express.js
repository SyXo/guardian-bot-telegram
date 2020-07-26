const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const compress = require("compression");
const methodOverride = require("method-override");
const cors = require("cors");
const httpStatus = require("http-status");
const expressWinston = require("express-winston");
const expressValidation = require("express-validation");
const helmet = require("helmet");
const winstonInstance = require("./winston");
const routes = require("../index.routes");
const { env } = require("../config/config");
const APIError = require("../server/helpers/APIError");
const bot = require("../server/telegrambot");

const app = express();

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

//require('../node_modules/winston-logs-display/app.js')(app, winstonInstance);

if (env === "development") {
  app.use(logger("dev"));
}

// parse body params and attache them to req.body
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(compress());
app.use(methodOverride());

// secure apps by setting various HTTP headers
app.use(helmet());

// enable detailed API logging in dev env
if (env === "development") {
  expressWinston.requestWhitelist.push("body");
  expressWinston.responseWhitelist.push("body");
  app.use(
    expressWinston.logger({
      winstonInstance,
      meta: true, // optional: log meta data about request (defaults to true)
      msg:
        "HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms",
      colorStatus: true, // Color the status code (default green, 3XX cyan, 4XX yellow, 5XX red).
    })
  );
}

// enable detailed API logging in dev env
if (env === "production") {
  app.use(
    expressWinston.errorLogger({
      winstonInstance,
      meta: false, // optional: log meta data about request (defaults to true)
      msg:
        "HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms",
      colorStatus: true, // Color the status code (default green, 3XX cyan, 4XX yellow, 5XX red).
    })
  );
}

// mount all routes on /api path
app.use("/guardianbot", routes);

//if error is not an instanceOf APIError, convert it.
app.use((err, req, res, next) => {
  if (err instanceof expressValidation.ValidationError) {
    // validation error contains errors which is an array of error each containing message[]
    const unifiedErrorMessage = err.errors
      .map((error) => error.messages.join(". "))
      .join(" and ");
    const error = new APIError(unifiedErrorMessage, err.status, true);
    return next(error);
  } else if (!(err instanceof APIError)) {
    const apiError = new APIError(err.message, err.status, err.isPublic);
    return next(apiError);
  }
  return next(err);
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new APIError("API not found", httpStatus.NOT_FOUND);
  return next(err);
});

// log error in winston transports except when executing test suite
if (env !== "test") {
  app.use(
    expressWinston.errorLogger({
      winstonInstance,
    })
  );
}

// error handler, send stacktrace only during development
app.use((
  err,
  req,
  res,
  next // eslint-disable-line no-unused-vars
) =>
  res.status(err.status).json({
    message: err.isPublic ? err.message : httpStatus[err.status],
    stack: env === "development" ? err.stack : {},
  })
);

module.exports = app;
