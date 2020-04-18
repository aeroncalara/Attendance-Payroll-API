const { gql } = require('apollo-server');

//Entities
const {...Employee} = require("../schema/Entities/Employee.schema");
const {...Applicant} = require("../schema/Entities/Applicant.schema");
const {...Payroll} = require("../schema/Entities/Payroll.schema");
const {...User} = require("../schema/Entities/User.schema");

const {...Person} = require("./Attributes/Person.schema");
const {...Corrective_Action} = require("./Attributes/Corrective_Action.schema");
const {...Work_History} = require("./Attributes/Work_History.schema");
const {...Transcript} = require("./Attributes/Transcript.schema");
const {...Termination_Status} = require("./Attributes/Termination_Status.schema");
const {...Performance_Assessment} = require("./Attributes/Performance_Assessment");
const {...Leave_Entitlement} = require("./Attributes/Leave_Entitlement.schema");
const {...Attendance} = require("./Attributes/Attendance.schema");
const {...Incentive} = require("./Attributes/Incentive.schema");
const {...Deduction} = require("./Attributes/Deduction.schema");

//Prerequisites
const {...Address} = require("../schema/Prerequisites/Address.schema");
const {...Contact} = require("../schema/Prerequisites/Contact.schema");
const {...Position} = require("../schema/Prerequisites/Position.schema");
const {...Character_Reference} = require("../schema/Prerequisites/Character_Reference.schema");
const {...Company} = require("../schema/Prerequisites/Company.schema");


const typeDefs = gql`

    ${Employee.types}
    ${Applicant.types}
    ${User.types}
    ${Person.types}
    ${Corrective_Action.types}
    ${Work_History.types}
    ${Transcript.types}
    ${Termination_Status.types}
    ${Leave_Entitlement.types}
    ${Attendance.types}
    ${Incentive.types}
    ${Deduction.types}   

    ${Address.types}
    ${Contact.types}
    ${Position.types}
    ${Character_Reference.types}
    ${Company.types}
    ${Performance_Assessment.types}
    ${Payroll.types}

    type Query{
        ${Employee.queries}
        ${Applicant.queries}
        ${Payroll.queries}
        ${User.queries}

        ${Transcript.queries}
        ${Performance_Assessment.queries}
        ${Corrective_Action.queries}
        ${Leave_Entitlement.queries}
        ${Work_History.queries}
        ${Attendance.queries}
        ${Incentive.queries}
        ${Deduction.queries}
        ${Termination_Status.queries}

    }

    type Mutation{
        ${Employee.mutations}
        ${Applicant.mutations}
        ${Payroll.mutations}
        ${User.mutations}

        ${Transcript.mutations}
        ${Contact.mutations}
        ${Performance_Assessment.mutations}
        ${Corrective_Action.mutations}
        ${Leave_Entitlement.mutations}
        ${Work_History.mutations}
        ${Attendance.mutations}
        ${Incentive.mutations}
        ${Deduction.mutations}
        ${Termination_Status.mutations}

    }
`;



module.exports = typeDefs;

