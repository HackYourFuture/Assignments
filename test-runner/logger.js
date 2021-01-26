const winston = require('winston');
const moment = require('moment');
const email = require('./git-user-email');

const tsFormat = () => moment().format('YYYY-MM-DD hh:mm:ss').trim();

const customFormat = winston.format.printf((info) => {
  return `${tsFormat()} ${info.level}: ${info.message}`;
});

const logger = winston.createLogger({
  level: 'info',
  format: customFormat,
  defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.File({
      filename: `${email() || 'test-runner'}.log`,
    }),
  ],
});

module.exports = logger;
