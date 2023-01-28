module.exports = class ApiError extends Error {
    status;
    errors;

    constructor(message, status, errors = []) {
        super(message);
        this.status = status;
        this.errors = errors;
    };

    static UnauthorizedError (message = 'Користувач не авторизований.', errors) {
        return new ApiError(message, 401, errors);
    };

    static BadRequest (message, errors) {
        return new ApiError(message, 400, errors);
    };
};
