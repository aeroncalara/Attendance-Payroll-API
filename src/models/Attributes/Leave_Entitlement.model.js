const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const leave_entitlement_model = new Schema({

    type: {
        type: String
    },
    value: {
        type: Number
    }
    
})


module.exports = mongoose.model('Leave_Entitlement', leave_entitlement_model)