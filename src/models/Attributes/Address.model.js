const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const address_model = new Schema({

    number: {
        type: String
    },

    street:{
        type: String
    },

    city: {
        type: String
    },

    province: {
        type: String
    },

    country: {
        type: String
    },
    
    
})

module.exports = mongoose.model('Address', address_model);