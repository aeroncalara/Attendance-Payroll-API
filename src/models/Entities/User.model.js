const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const user_model = new Schema({

    username: {
        type: String,
        required: true,
    },

    password: {
        type: String,
        required: true,
        default: 0,
    },

    role: {
        type: String,
        required: true,
    },

    is_logged_in: {
        type: Boolean,
        default: false
    },

    is_verified: {
        type: Boolean,
        default: false,
    },

    session_token: {
        type: String,
        default: null,
    },

    time_out_date: {
        type: Date,
    }

},

    {timestamps: true}
)

module.exports = mongoose.model("User", user_model)