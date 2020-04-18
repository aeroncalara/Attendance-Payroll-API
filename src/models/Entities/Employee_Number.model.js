const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const employee_number_model = new Schema({
    number: {
        type: String,
        required: true,
    },

    is_locked: {
        type: Boolean,
        default: false,
    }
})


module.exports = mongoose.model("Employee_Number", employee_number_model)