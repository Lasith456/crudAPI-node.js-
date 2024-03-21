const errorMiddleware = (err, req, res, next) => {
    const statusCode = res.statusCode || 500; // Default to 500 if statusCode is not set
    res.status(statusCode);
    console.log("Middleware error");
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : null
    });
}

module.exports = errorMiddleware;
