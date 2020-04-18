const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const transcript_model = new Schema({

    file_URL: {
        type: String
    },

    title: {
        type: String
    },

    description: {
        type: String
    },

    type: {
        type: String
    },

    employee_id : {
        type: Schema.Types.ObjectId,
        required: true,
        reference: "Employee"
    }
})

module.exports = mongoose.model("Transcript", transcript_model)