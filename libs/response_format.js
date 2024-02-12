

module.exports = (req, res, next) => {
  res.success = (data = {}, code = 1, message = null, status = 200, error) => {
    let resData = {
      code: code,
      msg: message,
      data: data,
    };
    if (error) resData.error = error;
    return res.status(status || 200).json(resData);
  };
  res.error = (error) => {
    if (error.message && error.status) {
      let errorBody = { status: error.status, message: error.message };
      let resData = {
        code: error.status,
        msg: error.message,
        data: null,
      };
      if (error.code) errorBody.code = error.code;
      if (process.env.NODE_ENV !== 'production') {
        resData.error = errorBody;
      }
      return res.status(error.status || 500).json(resData);
    }
    next(error);
  };
  next();
};
