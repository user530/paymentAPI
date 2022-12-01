const { StatusCodes } = require(`http-status-codes`);
const CustomError = require(`./CustomError`);

class UnauthorizedError extends CustomError {
  constructor(msg) {
    super(msg);
    this.status = StatusCodes.UNAUTHORIZED;
  }
}

module.exports = UnauthorizedError;
