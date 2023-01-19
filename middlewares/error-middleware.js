const ApiError = require('../exceptions/api-error');

module.exports = function (err, req, res, next) {
    console.log('errorMiddleware start');
    console.log(err);

    if (err instanceof ApiError) {
        console.log('errorMiddleware if');
        return res.status(err.status).json({ message: err.message, errors: err.errors })
    }
    console.log('errorMiddleware end');

    return res.status(500).json({ message: 'Неочікувана помилка...' });
};
