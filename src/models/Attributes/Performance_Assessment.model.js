const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const performance_assessment_model = new Schema({

    date: {
        type: Date,
        default: Date.now()
    },

    remarks: {
        type: String
    },

    employee_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Employee"
    },

    assessed_by: {
        //Supposedly employee ID
        type: Schema.Types.ObjectId,
        ref: 'Employee'
    }
    
})

module.exports = mongoose.model('Performance_Assessment', performance_assessment_model)