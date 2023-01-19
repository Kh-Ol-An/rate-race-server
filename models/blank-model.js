const { Schema, model } = require('mongoose');

const BlankSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    gender: { type: String, default: '' },
    profession: { type: String, default: '' },
    debt: { type: Number, default: 0 },
    rent: { type: Number, default: 0 },
    food: { type: Number, default: 0 },
    clothes: { type: Number, default: 0 },
    fare: { type: Number, default: 0 },
    phone: { type: Number, default: 0 },
    apartments: { type: Array, default: [] },
    cars: { type: Array, default: [] },
    cottages: { type: Array, default: [] },
    yachts: { type: Array, default: [] },
    planes: { type: Array, default: [] },
    whimsAndFancies: { type: Array, default: [] },
    marriage: { type: Boolean, default: false },
    children: {
        type: Object,
        default: {
            count: 0,
            expense: 0,
        }
    },
    credits: { type: Array, default: [] },
    cash: { type: Number, default: 0 },
    salary: { type: Number, default: 0 },
    business: {
        type: Object,
        default: {
            small: [],
            middle: [],
            big: [],
            corrupt: [],
            last: [],
        }
    },
    shares: {
        type: Object,
        default: {
            gc: [],
            schp: [],
            to: [],
            cst: [],
        }
    },
    assets: {
        type: Object,
        default: {
            houses: [],
            land: [],
            corruptLand: [],
        }
    },
    rich: { type: Boolean, default: false },
    win: { type: Boolean, default: false },
});

module.exports = model('Blank', BlankSchema);
