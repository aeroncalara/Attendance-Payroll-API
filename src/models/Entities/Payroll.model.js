const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const payroll_model = new Schema({

    start_date: {
        type: Date,
        required: true,
    },

    end_date: {
        type: Date,
        required: true,
    },

    total_pay: {
        type: Number,
        required: true,
        default: 0,
    },

    entities: [{
        type: Schema.Types.ObjectId,
        ref: 'Payroll_Entity'
    }]

},

    {timestamps: true}
)

module.exports = mongoose.model("Payroll", payroll_model)