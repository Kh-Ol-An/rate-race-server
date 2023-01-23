const bcrypt = require('bcrypt');
const uuid = require('uuid');
const userModel = require('../models/user-model');
// const mailService = require('./mail-service');
const tokenService = require('./token-service');
const UserDto = require('../dtos/user-dto');
const ApiError = require('../exceptions/api-error');
const blankModel = require("../models/blank-model");

class MailService {
    async registration(name, email, password) {
        const candidate = await userModel.findOne({ email });
        if (candidate) {
            // throw ApiError.BadRequest(`Користувач з поштовою адресою "${email}" вже існує.`, 'registration');
            throw ApiError.BadRequest(
                `Нажаль твоє будь-що не унікальне. Користувач з "${email}" вже існує.`,
                'registration',
                );
        }

        const hashPassword = await bcrypt.hash(password, 3);
        const activationLink = uuid.v4();

        const user = await userModel.create({ name, email, password: hashPassword, activationLink });
        // await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`);

        const userDto = new UserDto(user);
        const tokens = tokenService.generatesTokens({ ...userDto });
        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        await blankModel.create({ user: userDto.id });

        return {
            ...tokens,
            user: userDto,
        };
    };

    async activate(activationLink) {
        const user = await userModel.findOne({ activationLink });
        if (!user) {
            throw ApiError.BadRequest('Некоректне посиланя активації.', 'activate');
        }

        user.isActivated = true;
        await user.save();
    };

    async login(email, password) {
        const user = await userModel.findOne({ email });
        if (!user) {
            throw ApiError.BadRequest('Користувач з таким email не знайдений', 'login.find');
        }

        const isPassEquals = await bcrypt.compare(password, user.password);
        if (!isPassEquals) {
            throw ApiError.BadRequest('Невірний пароль', 'login.password');
        }

        const userDto = new UserDto(user);
        const tokens = tokenService.generatesTokens({ ...userDto });
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto,
        };
    };

    async logout(refreshToken) {
        return await tokenService.removeToken(refreshToken);
    };

    async refresh(refreshToken, req) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError(req);
        }

        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);
        if (!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedError();
        }

        const user = await userModel.findById(userData.id);
        const userDto = new UserDto(user);
        const tokens = tokenService.generatesTokens({ ...userDto });
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto,
        };
    };
}

module.exports = new MailService();
