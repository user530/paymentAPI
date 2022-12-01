const { StatusCodes } = require(`http-status-codes`);

const errorHandler = (err, req, res, next) => {
  const errObj = {
    msg: err.msg || `Something went wrong...`,
    status: err.status || StatusCodes.INTERNAL_SERVER_ERROR,
  };

  return res.status(errObj.status).send(errObj.msg);
};

module.exports = errorHandler;
