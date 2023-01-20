const ApiError = require('../exceptions/api-error');

module.exports = function (err, req, res, next) {
    console.log(err);

    if (err instanceof ApiError) {
        // console.log('errorMiddleware if');
        return res.status(err.status).json({ message: err.message, errors: err.errors })
    }

    return res.status(500).json({ message: 'Неочікувана помилка...' }).render('error', { error: err });
};
