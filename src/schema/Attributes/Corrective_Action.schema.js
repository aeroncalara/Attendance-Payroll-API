exports.types = `
    type Corrective_Action{
        date_incurred: String
        description: String
        action: String
        assessed_by: ID!
    }

    input Corrective_Action_Input{
        date_incurred: String
        description: String
        action: String
        assessed_by: ID!
    }

    type Corrective_Action_Response{
        message: String
        success: Boolean
        data: Corrective_Action
    }
`;

exports.queries = `
    
`;

exports.mutations = `
    addCorrectiveActionToEmployee(
        employee_id: ID!
        corrective_action: Corrective_Action_Input
    ): Corrective_Action_Response

    deleteCorrectiveActionOfEmployee(
        employee_id: ID!
        corrective_action_id: ID!
    ): Corrective_Action_Response
`;