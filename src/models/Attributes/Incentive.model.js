const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const incentive_item = new Schema({

    incentives: [{
        type: Object,
        ref: 'Incentive_Item'
    }],

    employee_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Employee'
    },
})

module.exports = mongoose.model('Incentive', incentive_item)