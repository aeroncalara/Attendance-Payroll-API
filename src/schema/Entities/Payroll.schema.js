exports.types = `

    type Payroll{
        _id: ID!
        start_date: String
        end_date: String
        total_pay: Float
        entities: [Payroll_Entity]
    }

    type Payroll_Entity{
        _id: ID!
        employee_id: ID!
        employee_name: String
        base_salary: Float
        deductions: [Deduction_Item]
        incentives: [Incentive_Item]
        total_pay: Float
        payroll_id: String
    }

    type Payroll_Response{
        message: String
        success: Boolean
        data: Payroll
    }

`;


exports.queries = `
    getAllPayrolls: [Payroll]
    getPayroll(payroll_id: ID!): Payroll
`;

exports.mutations = `
    createPayroll(
        start_date: String
        end_date: String
    ): Payroll_Response
`;

