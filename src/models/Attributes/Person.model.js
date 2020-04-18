const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const person_model = new Schema({

    first: {
        type: String,
        required: true
    },

    last: {
        type: String,
        required: true
    },

    middle: {
        type: String,
        required: false
    },

    date_of_birth: {
        type: Date
    },

    address: {
        type: [Object]
    },

    contact: {
        type: Object
    }
    
})

module.exports = mongoose.model('Person', person_model)