const { StatusCodes } = require(`http-status-codes`);

const notFoundMiddleware = (req, res, next) => {
  return res
    .status(StatusCodes.NOT_FOUND)
    .send(`<h1>Resource not found! Please try another one.</h1>`);
};

module.exports = notFoundMiddleware;
