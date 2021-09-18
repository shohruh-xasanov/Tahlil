const ErrorResponse = require("../utils/errorResponse");
const errorHandler = (err , req ,res ,next) => {
    let error = { ...err };
    error.message = err.message;

    // Mongoose Bad ObjectID
    if(err.name === 'CastError'){
        const message = `Resourse not found with id of ${err.value}`
        error = new ErrorResponse(message , 404);
        return next(error)
    }
    //Mongoose Duplicate Key
    if(err.code === 11000){
        const message = 'Duplicate fields value entered';
        error = new ErrorResponse(message , 400);
        return next(error)
    }
    // Mongoose Validation Errors
    if(err.name === 'ValidationError'){
        const message = Object.values(err.errors).map(val => val.message);
        error = new ErrorResponse(message , 400)
        return next(error)
    }
    // Mongoose TypeError Errors
    if(err.name === 'TypeError'){
        const message = Object.values(err.errors).map(val => val.message);
        error = new ErrorResponse(message , 400)
        return next(error)
    }
    // Mongoose error
    if(err.name === 'UnhandledPromiseRejectionWarning'){
        const message = Object.values(err.errors).map(val => val.message);
        error = new ErrorResponse(message , 400)
        return next(error)
    }
    res.status(error.statusCode || 500).json({
        success: false,
        error : error.message || 'Server Error',
    });
};

module.exports = errorHandler;