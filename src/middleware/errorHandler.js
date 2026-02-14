const logger = require('../utils/logger');

function errorHandler(err, req, res, _next) {
  logger.error(`${err.message}`, { stack: err.stack });

  const statusCode = err.statusCode || 500;
  const message = process.env.NODE_ENV === 'production' && statusCode === 500
    ? 'Internal Server Error'
    : err.message;

  res.status(statusCode).json({
    error: message,
  });
}

module.exports = { errorHandler };
