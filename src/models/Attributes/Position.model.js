const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const position_model = new Schema({

    title: {
        type: String
    },

    description: {
        type: String
    },
    
    salary: {
        type: Number
    }
    
})

module.exports = mongoose.model("Position", position_model)