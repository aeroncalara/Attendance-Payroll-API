const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const deduction_item_model = new Schema({

    date_incurred: {
        type: Date,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    is_active: {
        type: Boolean,
        required: true,
        default: true
    },
})

module.exports = mongoose.model('Deduction_Item', deduction_item_model)