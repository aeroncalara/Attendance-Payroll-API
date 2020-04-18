const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const attendance_model = new Schema({

    sessions: [{
        type: Object,
        ref: 'Sessions',
    }],
    employee_id: {
        type: Schema.Types.ObjectId,
        ref: 'Employee',
        required: true,
    }
})

module.exports = mongoose.model('Attendance', attendance_model)