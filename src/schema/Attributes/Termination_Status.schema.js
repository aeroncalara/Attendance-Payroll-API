exports.types = `
    type Termination_Status{
        is_terminated: Boolean
        description: String
    }

    type Terminate_Employee_Response{
        message: String,
        success: Boolean,
        data: Employee
    }

`;


exports.queries = `
    getTerminateEmployees: [Employee]!
`;

exports.mutations = `
    terminateEmployee(
        employee_id: ID!
    ): Terminate_Employee_Response
`;