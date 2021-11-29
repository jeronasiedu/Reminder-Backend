const handleError = (err, req, res, next) => {
  let customErrors = {
    msg: err.message || 'Something went wrong, try again later',
    statusCode: err.status || 500,
  };
  if (err.name === 'ValidationError') {
    customErrors.msg = Object.values(err.errors)
      .map((item) => {
        return item.message;
      })
      .join(',');
    customErrors.statusCode = 400;
  }
  if (err.code && err.code === 11000) {
    customErrors.msg = `${Object.keys(
      err.keyValue
    )} already exists, please choose a different one`;
    customErrors.statusCode = 400;
  }
  res.status(customErrors.statusCode).json({
    msg: customErrors.msg,
  });
};

export default handleError;
