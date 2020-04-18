exports.types = `
    type Incentive{
        _id: ID
        incentives: [Incentive_Item]
        employee_id: ID!
    }

    type Incentive_Item{
        date_incurred: String
        description: String
        amount: String
        is_active: Boolean
    }

    input Incentive_Input{
        date_incurred: String!
        description: String!
        amount: Float!
    }

    type Incentive_Response{
        message: String
        success: Boolean
        data: Incentive_Item
    }
`;

exports.queries = `
    getAllIncentivesOfEmployee(employee_id: ID!): [Incentive_Item]
    getAllActiveIncentivesOfEmployee(employee_id: ID!): [Incentive_Item]

`;

exports.mutations = `
    addIncentiveToEmployee(
        employee_id: ID!
        incentive_input: Incentive_Input
    ): Incentive_Response
`;