const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const logs_model = new Schema({

    employee_id: {
        type: Schema.Types.ObjectId,
        ref: "Employee"
    },

    message: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Logs', logs_model);