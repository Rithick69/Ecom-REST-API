const errorMiddleware = (err, req, res, next) => {
    const status = err.status | 500;
    const message = err.message | "BackEnd Error";
    const details = err.details | "Details Not Available";

    return res.status(status).json({message, details});
}

module.exports = errorMiddleware;