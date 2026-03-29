import { createLogger, format, transports } from "winston";
import config from "../config.js";

const { combine, timestamp, printf, colorize, errors } = format;

const logFormat = printf(({ level, message, timestamp: ts, stack }) => {
  return stack
    ? `${ts} [${level}]: ${message}\n${stack}`
    : `${ts} [${level}]: ${message}`;
});

const logger = createLogger({
  level: config.logLevel,
  format: combine(timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), errors({ stack: true }), logFormat),
  transports: [
    new transports.Console({
      format: combine(colorize(), logFormat),
    }),
  ],
});

if (config.env === "production") {
  logger.add(
    new transports.File({
      filename: "logs/error.log",
      level: "error",
      maxsize: 5242880,
      maxFiles: 5,
    })
  );
  logger.add(
    new transports.File({
      filename: "logs/combined.log",
      maxsize: 5242880,
      maxFiles: 5,
    })
  );
}

export default logger;
