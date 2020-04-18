const Payroll_Entity = require("../../models/Entities/Payroll_Entity.model");
const {dateToString, dateToStringNoTime, dateToTimeOnly} = require("./utilities");

exports.transformPayrollWithEntities = (payroll) => {
    return {
        ...payroll._doc,
        start_date: dateToStringNoTime(payroll.start_date),
        end_date: dateToStringNoTime(payroll.end_date),
        entities: getPayrollEntitiesById.bind(this, payroll.entities)
    }
}

exports.transformEmployee = (employee) => {
    return {
        ...employee._doc,
        _id: employee._id,
        person:{
            ...employee.person,
            contact: {
                mobile_number: employee.person.contact.mobile_number,
                telephone_number: employee.person.contact.telephone_number,
                email_address: employee.person.contact.email_address,
            },
            date_of_birth: dateToString(employee.person.date_of_birth)
        }
    }
}

exports.transformPayroll = (payroll) => {
    //return payroll
    
    return {
        ...payroll._doc,
        _id: payroll._id,
        start_date: dateToStringNoTime(payroll.start_date),
        end_date: dateToStringNoTime(payroll.end_date),
        total_pay: payroll.total_pay
    }
}

exports.transformSession = (session) => {
    return {
        ...session,
        date: dateToStringNoTime(session.time_in),
        time_in: dateToTimeOnly(session.time_in),
        time_out: dateToTimeOnly(session.time_out)
    }
}

exports.transformIncentive = (incentive) => {
    return {
        ...incentive,
        date_incurred: dateToString(incentive.date_incurred),
    }
}

exports.transformDeduction = (deduction) => {
    return {
        ...deduction,
        date_incurred: dateToString(deduction.date_incurred),
    }
}


//GETTERS
const getPayrollEntitiesById = (payroll_entity_ids) => {
    return payroll_entity_ids.map(entity_id =>{
        return Payroll_Entity.findById(entity_id).then(payroll_entity =>{
            return {
                ...payroll_entity._doc,
            }
        })
    })
}
