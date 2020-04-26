const ErrorResponse = require('../utils/errorResponse');

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  console.log(err.stack.red);

  //Mongoose bad ObjectId
  if ((error.name = 'CastError')) {
    const message = `Resource not found with id ${err.value}`;
    error = new ErrorResponse(message, 404);
  }
  console.log(error.message.red);
  console.log(err);
  //Mongoose duplicate key
  if (err.code === 11000) {
    const message = 'Duplicate field value entered';
    error = new ErrorResponse(message, 400);
  }
  if(err.name = 'ValidatorError'){
    const message = Object.values(err.errors).map(value => value.message);
    error = new ErrorResponse(message, 400) 
  }

  res
    .status(error.statusCode || 500)
    .json({ succes: false, error: error.message });
};

module.exports = errorHandler;