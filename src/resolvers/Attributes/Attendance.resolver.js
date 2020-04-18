const Employee = require("../../models/Entities/Employee.model");
const Attendance = require("../../models/Attributes/Attendance.model");
const Session = require("../../models/Attributes/Session.model");

const {no_employee_validation} = require("../../Utilities/Configs");
const {transformSession, transformEmployee} = require("../Utilities/resolver_transformations");
const {dateToTimeOnly} = require('../Utilities/utilities');

const queries = {
    getAttendanceOfEmployee: (_, args) => {
        let employee_id = args.employee_id;

        //Validate Employee
        return Employee.findById(employee_id).then(employee => {
            if(!employee) return no_employee_validation;

            const attendance_id = employee.attendance;
            return Attendance.findById(attendance_id).then(attendance =>{

                let hours_worked = 0;

                return {
                    sessions: attendance.sessions.map(session =>{
                        hours_worked += session.difference;
                        return transformSession(session);
                    }),
                    total_hours: hours_worked
                }
            })
        })
    },

    getAttendanceReport: (_, args) =>{

        let {start_date, end_date} = args;

        start_date = new Date(start_date);
        end_date = new Date(end_date);

        return Employee.find().then(employees =>{
            return employees.map(employee =>{
                return Attendance.findById(employee.attendance).then(attendance => { 
                    let total_hours = 0;
                    let session_length = 0;
                    
                    attendance.sessions.map(session =>{
                        if(session.time_in >= start_date && session.time_out <= end_date){
                            session_length += 1;
                            total_hours += session.difference;
                        }else{
                            total_hours = total_hours;
                        }
                        
                    })
                    
                    let hours_per_entry = total_hours /session_length;
                    return {
                        employee: transformEmployee(employee),
                        position: employee.position.title,
                        attendance_entries: session_length,
                        total_hours: total_hours.toFixed(2),
                        hours_per_entry: hours_per_entry.toFixed(2) || 0,
                    }
                })
            })
        })
    },

    getAttendanceStatus: (_, args) => {
        let {employee_number} = args;
        return Employee.findOne({employee_number}).then(employee => {
            if(!employee) return no_employee_validation;

            return Attendance.findById(employee.attendance).then(attendance => {
                let session_length = attendance.sessions.length;
                if(session_length === 0){
                    return {message: "For time in", success: true, data: true};
                }else{
                    if(attendance.sessions[session_length - 1].time_in != null && attendance.sessions[session_length - 1].time_in != undefined && attendance.sessions[session_length - 1].time_out != null && attendance.sessions[session_length - 1].time_out != undefined ){
                        return {message: "For time in", success: true, data: true};
                    }else{
                        if(attendance.sessions[session_length - 1].time_in != null && attendance.sessions[session_length - 1].time_in != undefined && attendance.sessions[session_length - 1].time_out == null && attendance.sessions[session_length - 1].time_out == undefined){
                            return {message: "For time out", success: true, data: false};
                        }
                    }
                }
            })
        })
    }
}

const mutations = {
    timeInEmployee: (_, args) => {
        let employee_number = args.employee_number;

        //Validate Employee
        return Employee.findOne({employee_number}).then(employee =>{
            if(!employee) return no_employee_validation;
            let {person} = employee;
            let {first} = person;

            const attendance_id = employee.attendance;
            //No validation required; All employees have built-in attendance fields
            return Attendance.findByIdAndUpdate(attendance_id).then(attendance =>{
                let {sessions} = attendance;
                let current_session = sessions[sessions.length - 1];

                try{
                    //If a time_in already exists, 
                    if((current_session.time_in) && !(current_session.time_out)) return {message: `Employee already timed in! Time out first before timing in again`, success: false, data: null}
                }catch(err){
                    //If the array returns an undefined time_in attribute, just create a new session and push
                    if(err == "TypeError: Cannot read property 'time_in' of undefined"){
                        console.log("No time_in attribute found; Creating new session anyway");
                    }
                }

                //Create new session then push to attendance
                let new_session = new Session({
                    time_in: new Date(),
                })

                return attendance.updateOne(
                    {
                        $push: {sessions: new_session}
                    }
                ).then(result =>{
                    return {
                        message: `Welcome, ${first}! Time in: ${dateToTimeOnly(new_session.time_in)}`,
                        success: true,
                        data: new_session.time_in.toString()
                    }
                })
            })
        })
    },

    timeOutEmployee: (_, args) => {
        let employee_number = args.employee_number;

        //Validation of employee
        return Employee.findOne({employee_number}).then(employee =>{
            if(!employee) return no_employee_validation;
            const attendance_id = employee.attendance;
            let {person} = employee;
            let {first} = person;

            return Attendance.findById(attendance_id).then(attendance =>{
                let {sessions} = attendance;
                let current_session = sessions[sessions.length - 1];

                try{
                    if(current_session.time_in && current_session.time_out) return {message: `Cannot time-out an employee who hasn't timed-in`, success: false, data: null}
                    if(current_session.time_in && !(current_session.time_out)){
                        //Compute differential
                        current_session.time_out = new Date();
                        difference = (current_session.time_out.getTime() - current_session.time_in.getTime()) / 3600000;

                        return Attendance.updateOne(
                            {
                                _id: attendance_id,
                                "sessions._id": current_session._id
                            },
                            
                            {
                                $set: {"sessions.$.time_out": current_session.time_out, "sessions.$.difference": difference},
                            },

                            {
                                new:true
                            }
                        ).then(result =>{
                            return {
                                message: `Goodbye, ${first}! Time out: ${dateToTimeOnly(current_session.time_out)}`,
                                success: true,
                                data: current_session.time_out.toString()
                            }
                        })
                    }
                }catch(err){
                    //If time_out is undefined
                    return {message: `Cannot time-out an employee who hasn't timed-in`, success: false, data: null}
                }
            });
        })
    }
}

exports.queries = queries;
exports.mutations = mutations;