const winston = require("winston");
const path = require("path");
const { format } = require("winston");
require("winston-daily-rotate-file");

// Create a daily rotating log transport
const logTransport = new winston.transports.DailyRotateFile({
  filename: path.join(__dirname, "../logs/%DATE%-access.log"),
  datePattern: "YYYY-MM-DD", // Log file will have date as the filename
  maxSize: "20m", // Max size for a log file before rotation
  maxFiles: "14d", // Keep logs for the last 14 days
  level: "info", // Set log level
});

// Create a logger instance
const logger = winston.createLogger({
  level: "info", // Set default log level
  format: format.combine(
    format.timestamp(),
    format.printf(({ timestamp, level, message }) => {
      return `${timestamp} ${level}: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console({
      format: format.combine(format.colorize(), format.simple()),
    }),
    logTransport,
  ],
});

// Logging middleware
const loger = (req, res, next) => {
  res.on("finish", () => {
    // Get IP address properly
    const ip =
      req.headers["x-forwarded-for"]?.split(",")[0] ||
      req.connection.remoteAddress;

    const logEntry = `${ip} - ${req.method} - ${
      req.url
    } - ${new Date().toISOString()} - Status: ${res.statusCode}`;

    // Log the entry
    logger.info(logEntry);
  });

  next(); // Pass control to the next middleware
};

module.exports = loger;
