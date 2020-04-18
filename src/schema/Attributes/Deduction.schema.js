exports.types = `
    type Deduction{
        _id: ID
        deductions: [Deduction_Item]
        employee_id: ID!
    }

    type Deduction_Item{
        date_incurred: String
        description: String
        amount: String
        is_active: Boolean
    }

    input Deduction_Input{
        date_incurred: String!
        description: String!
        amount: Float!
    }

    type Deduction_Response{
        message: String
        success: Boolean
        data: Deduction_Item
    }
`;

exports.queries = `
    getAllDeductionsOfEmployee(employee_id: ID!): [Incentive_Item]
    getAllActiveDeductionsOfEmployee(employee_id: ID!): [Incentive_Item]

`;

exports.mutations = `
    addDeductionToEmployee(
        employee_id: ID!
        deduction_input: Deduction_Input
    ): Deduction_Response
`;