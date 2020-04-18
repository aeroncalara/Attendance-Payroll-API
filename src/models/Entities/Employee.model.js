const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const employee_model = new Schema({

    person: {
        type: Object,
        required: true,
    },

    employee_number: {
        type: String,
    },

    sss: {
        type: String,
        default: "n/a",
        
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
        default: null,
    },

    leave_entitlement: [{
        type: Object,
        default: null
    }],

    hiring_requirement: {
        type: [Object],
        default: null,
    },

    attendance: {
        type: Schema.Types.ObjectId,
        ref: 'Attendance',
    },

    incentive: {
        type: Schema.Types.ObjectId,
        ref: "Incentive",
    },

    deduction: {
        type: Schema.Types.ObjectId,
        ref: "Deduction"
    },

    position: {
        type: Object,
        default: null
    },

    corrective_action: [{
        type: Schema.Types.ObjectId,
        ref: "Corrective_Action"
    }],

    transcript: [{
        type : Schema.Types.ObjectId,
        ref: "Transcript"
    }],

    performance_assessment: [{
        type: Schema.Types.ObjectId,
        ref: "Performance_Assessment"
    }],

    is_terminated: {
        type: Boolean,
        default: false
    },

    is_archived: {
        type: Boolean,
        default: false
    },
    
    is_activated:{
        type: Boolean,
        default: true
    },
})


module.exports = mongoose.model("Employee", employee_model)