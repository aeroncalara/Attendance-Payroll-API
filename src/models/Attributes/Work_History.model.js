const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const work_history_model = new Schema({

    company: {
        type: Object
    },

    date_start: {
        type: String
    },

    date_end: {
        type: String,
    },

    salary: {
        type: String
    },

    position: {
        type: Object,
    },

    character_reference: {
        type: Object
    }
    
})

module.exports = mongoose.model("Work_History", work_history_model)