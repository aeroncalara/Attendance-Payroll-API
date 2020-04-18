const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const contact_model = new Schema({
    mobile_number: {
        type: String
    },
    telephone_number: {
        type: String
    },
    email_address: {
        type: String
    }
});

module.exports = mongoose.model("Contact", contact_model);