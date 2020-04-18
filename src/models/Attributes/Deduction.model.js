const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const deduction_model = new Schema({

    deductions: [{
        type: Object,
        ref: 'Deduction_Item'
    }],

    employee_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Employee'
    },
})

module.exports = mongoose.model('Deduction', deduction_model)