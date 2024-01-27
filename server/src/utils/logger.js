import { createLogger, format, transports } from "winston";
import util from "util";

const customFormat = format.printf((info) => {
  let message = `[${process.pid}][${info.timestamp}][${info.level.toUpperCase()}] ${info.message}`;
  if (info.splat) {
    info.splat.forEach((meta) => {
      message += ` ${util.inspect(meta)}`;
    });
  }
  return message;
});

const conditionalTransports =
  process.env.NODE_ENV === "production"
    ? [new transports.File({ filename: "logs/error.log", level: "error" }), new transports.Console()]
    : [new transports.Console()];

export const logger = createLogger({
  level: "debug",
  format: format.combine(
    format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss"
    }),
    format.errors({ stack: true }),
    format.splat(),
    customFormat
  ),
  transports: conditionalTransports
});
