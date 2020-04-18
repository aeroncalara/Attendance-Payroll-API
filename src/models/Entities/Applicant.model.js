const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const applicant_model = new Schema({

    person: {
        type: Object,
        required: true,
    },

    sss: {
        type: String,
        default: "n/a",
    },

    requested_position: {
        type: Object,
        default: null,
    },

    tin: {
        type: String,
        default: "n/a",
    },

    philhealth: {
        type: String,
        default: "n/a",
    },

    hdmf: {
        type: String,
        default: "n/a",
    },

    work_history: {
        type: [Object],
    },

    leave_entitlement: [{
        type: Object
    }],

    hiring_requirement: {
        type: [Object],
    },

    transcript: [{
        type : Schema.Types.ObjectId,
        ref: "Transcript"
    }],

    is_terminated: {
        type: Boolean,
        default: false
    },

    is_archived: {
        type: Boolean,
        default: false
    },
})


module.exports = mongoose.model("Applicant", applicant_model)