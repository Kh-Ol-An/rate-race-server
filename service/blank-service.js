const blankModel = require('../models/blank-model');

class BlankService {
    async saveBlank(filter, update) {
        return await blankModel.updateOne(filter, { ...update });
    };

    async getBlank() {
        return await blankModel.find();
    };
}

module.exports = new BlankService();
