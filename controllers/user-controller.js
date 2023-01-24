const userService = require('../service/user-service');
const { validationResult } = require('express-validator');
const ApiError = require('../exceptions/api-error');

class UserController {
    async registration(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest(
                    'Помилка під час валідації',
                    'registration.validation',
                    errors.array(),
                ))
            }

            const { name, email, password } = req.body;
            const userData = await userService.registration(name, email, password);

            // res.cookie(
            //     'refreshToken',
            //     userData.refreshToken,
            //     {
            //         maxAge: 30 * 24 * 60 * 60 * 1000,
            //         httpOnly: false,
            //         secure: true, // якщо використовується https
            //     },
            // );

            return res.json(userData);
        } catch (err) {
            next(err);
        }
    };

    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const userData = await userService.login(email, password);

            // res.cookie(
            //     'refreshToken',
            //     userData.refreshToken,
            //     {
            //         maxAge: 30 * 24 * 60 * 60 * 1000,
            //         httpOnly: false,
            //         secure: true, // якщо використовується https
            //     },
            // );

            return res.json(userData);
        } catch (err) {
            next(err);
        }
    };

    async logout(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            const token = await userService.logout(refreshToken);
            res.clearCookie('refreshToken');
            return res.json(token);
        } catch (err) {
            next(err);
        }
    };

    async activate(req, res, next) {
        try {
            const activationLink = req.params.link;
            await userService.activate(activationLink);
            return res.redirect(process.env.CLIENT_URL);
        } catch (err) {
            next(err);
        }
    };

    async refresh(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            console.log('userDatauserDatauserDatauserData::: ', req.cookies);
            const userData = await userService.refresh(refreshToken);
            // res.cookie(
            //     'refreshToken',
            //     userData.refreshToken,
            //     {
            //         maxAge: 30 * 24 * 60 * 60 * 1000,
            //         httpOnly: false,
            //         secure: true, // якщо використовується https
            //     },
            // );
            return res.json(userData);
        } catch (err) {
            next(err);
        }
    };
}

module.exports = new UserController();
