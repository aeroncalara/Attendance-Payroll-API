exports.types = `
    type Leave_Entitlement{
        value: Float
        type: String
    }

    type Leave_Entitlement_Response{
        message: String
        success: Boolean
        data: Leave_Entitlement
    }
`;

exports.queries = `
    
`;

exports.mutations = `
    addLeaveEntitlementToEmployee(
        employee_id: ID!
        type: String!  
    ): Leave_Entitlement_Response

    deleteLeaveEntitlementOfEmployee(
        employee_id: ID!
        leave_entitlement_id: ID!
    ): Leave_Entitlement_Response
`;