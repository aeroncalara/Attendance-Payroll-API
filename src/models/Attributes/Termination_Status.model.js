const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const termination_status_model = new Schema({

    is_terminated: {
        type: Boolean,
        required: true,
        default: false
    },

    description: {
        type: String
    }
})


module.exports = mongoose.model("Termination_Status", termination_status_model)