const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const payroll_entity_model = new Schema({

    employee_id: {
        type: Schema.Types.ObjectId,
        ref: "Employee",
        required: true,
    },

    employee_name: {
        type: String,
    },

    base_salary: {
        type: Number,
        default: 0,
        required: true,
    },

    deductions: [{
        type: Object,
    }],

    incentives: [{
        type: Object,
    }],

    total_pay: {
        type: Number,
        required: true,
        default: 0,
    },

    payroll_id: {
        type: Schema.Types.ObjectId,
        ref: "Payroll",
        required: true,
    }
})

module.exports = mongoose.model("Payroll_Entity", payroll_entity_model)