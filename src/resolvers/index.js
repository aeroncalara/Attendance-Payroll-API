var fs = require('fs');


const Employee = require("./Entities/Employee.resolver");
const Applicant = require("./Entities/Applicant.resolver");
const Payroll = require("./Entities/Payroll.resolver");
const User = require("./Entities/User.resolver");

const Contact_Information = require("./Attributes/Contact_Information.resolver");
const Work_History = require("./Attributes/Work_History.resolver");
const Performance_Assessment = require("./Attributes/Performance_Assessment.resolver");
const Corrective_Action = require("./Attributes/Corrective_Action.resolver");
const Leave_Entitlement = require("./Attributes/Leave_Entitlement.resolver");
const Attendance = require("./Attributes/Attendance.resolver");
const Incentive = require("./Attributes/Incentive.resolver");
const Deduction = require("./Attributes/Deduction.resolver");


const Termination_Status = require("./Attributes/Termination_Status.resolver");



const resolvers = {

    Query: {
        ...Employee.queries,
        ...Applicant.queries,
        ...Contact_Information.queries,
        ...Work_History.queries,
        ...Performance_Assessment.queries,
        ...Corrective_Action.queries,
        ...Leave_Entitlement.queries,
        ...Attendance.queries,
        ...Incentive.queries,
        ...Termination_Status.queries,
        ...Deduction.queries,
        ...Payroll.queries,
        ...User.queries,
        
    },

    Mutation: {
        ...Employee.mutations,
        ...Applicant.mutations,
        ...Contact_Information.mutations,
        ...Work_History.mutations,
        ...Performance_Assessment.mutations,
        ...Corrective_Action.mutations,
        ...Leave_Entitlement.mutations,
        ...Attendance.mutations,
        ...Termination_Status.mutations,
        ...Incentive.mutations,
        ...Deduction.mutations,
        ...Payroll.mutations,
        ...User.mutations,
        
    }
}

 module.exports = resolvers;