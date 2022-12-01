const { StatusCodes } = require(`http-status-codes`);
const CustomError = require(`./CustomError`);

class BadRequestError extends CustomError {
  constructor(msg) {
    super(msg);
    this.status = StatusCodes.BAD_REQUEST;
  }
}

module.exports = BadRequestError;
