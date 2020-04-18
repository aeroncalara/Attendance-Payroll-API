const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const character_reference_model = new Schema({

    name: {
       type: String
    },
    contact_number: {
        type: String
    }
    
})

module.exports = mongoose.model("Character_Reference", character_reference_model)