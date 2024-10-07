const { StatusCodes } = require("http-status-codes");
const CustomErrorApi = require("../err/customError");

const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomErrorApi) {
    return res.status(err.statusCode).json({ msg: err.message });
  } else {
    next(err);
  }
  console.error(err);
  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ msg: "خطای سرور داخلی. لطفا مجددا تلاش کنید." });
};

module.exports = errorHandler;
