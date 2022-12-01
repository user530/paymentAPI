const { StatusCodes } = require(`http-status-codes`);
const CustomError = require(`./CustomError`);

class NotFoundError extends CustomError {
  constructor(msg) {
    super(msg);
    this.status = StatusCodes.NOT_FOUND;
  }
}

module.exports = NotFoundError;
