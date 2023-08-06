const winston = require("winston");

class Logger {
  constructor() {
    if (Logger.instance) {
      return Logger.instance;
    }

    this.logger = winston.createLogger({
      level: "info",
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      ),
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({
          filename: "./logs/error.log",
          level: "error",
        }),
        new winston.transports.File({ filename: "./logs/combined.log" }),
      ],
    });

    Logger.instance = this;
  }

  log(level, context, message) {
    this.logger.log({ level, context, message });
  }
}

module.exports = Logger;
