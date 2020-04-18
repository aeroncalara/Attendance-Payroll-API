const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const corrective_action_model = new Schema({

    date_incurred: {
        type: Date,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    action: {
        type: String,
        required: true
    },
    assessed_by: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Employee'
    }
    
})

module.exports = mongoose.model('Corrective_Action', corrective_action_model)