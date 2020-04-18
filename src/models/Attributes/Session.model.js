const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const session_model = new Schema({
    time_in: {
        type: Date,
    },
    time_out: {
        type: Date,
    },
    difference: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model('Session', session_model)