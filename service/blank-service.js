const blankModel = require('../models/blank-model');

class BlankService {
    saveBlank(filter, update) {
        return blankModel.updateOne(filter, { ...update });
    };

    getBlank() {
        return blankModel.find();
    };
}

module.exports = new BlankService();
