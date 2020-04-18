exports.types = `
    type Employee{
        _id: ID!
        person: Person!
        employee_number: String!
        sss: String!
        tin: String!
        philhealth: String!
        hdmf: String!

        position: Position!

        corrective_action: [Corrective_Action]
        work_history: [Work_History]
        transcript: [Transcript]

        termination_status: Termination_Status
        performance_assessment: [Performance_Assessment]
        is_activated: Boolean
        is_archived: Boolean
    }

    type Archive_Employee_Response{
        message: String,
        success: Boolean,
        data: Employee
    }   

    type Activate_Employee_Response{
        message: String
        success: Boolean
        data: Employee
    }
`;

exports.queries = `
    getEmployee(employee_id: ID!): Employee!
    getAllEmployees: [Employee]!
    getAllActivatedEmployees: [Employee]!                   
    getArchivedEmployees: [Employee]!
`;

exports.mutations = `
    addEmployee(
        person: Person_Input!

        sss: String
        tin: String
        philhealth: String
        hdmf: String

        position: Position_Input!

        corrective_action: [Corrective_Action_Input]
        work_history: [Work_History_Input]
        transcript: [Transcript_Input]


    ): Employee,

    editEmployee(
        employee_id: ID!
        person: Person_Input!

        sss: String
        tin: String
        philhealth: String
        hdmf: String

        position: Position_Input!

        corrective_action: [Corrective_Action_Input]
        work_history: [Work_History_Input]
        transcript: [Transcript_Input]

        is_terminated: Boolean

    ): Employee,

    activateEmployee(           
        employee_id: ID!
    ): Activate_Employee_Response

    archiveEmployee(
        employee_id: ID!
    ): Archive_Employee_Response

`;
