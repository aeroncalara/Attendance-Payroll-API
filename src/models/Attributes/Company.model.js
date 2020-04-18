const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const company_model = new Schema({

    name: {
        type: String,
        required: true,
    },
    address: {
        type: String
    },
    contact_number: {
       type: String
    },
    contact_person: {
        type: String
    }
    
})

module.exports = mongoose.model('company', company_model)