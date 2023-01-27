const blankModel = require('../models/blank-model');

class BlankService {
    saveBlank(filter, update) {
        return blankModel.updateOne(filter, { ...update });
    };

    getBlank(filter) {
        return blankModel.findOne(filter);
    };
}

module.exports = new BlankService();
