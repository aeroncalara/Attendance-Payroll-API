exports.types = `
    type Work_History{
        company: Company
        position: Position
        character_reference: Character_Reference
        date_start: String
        date_end: String
    }

    input Work_History_Input{
        company: Company_Input
        position: Position_Input
        character_reference: Character_Reference_Input
        date_start: String
        date_end: String
    }

    type Work_History_Response{
        message: String
        success: Boolean
        data: Work_History
    }
`;

exports.queries = `
    
`;

exports.mutations = `
    addWorkHistoryToEmployee(
        employee_id: ID!
        work_history: Work_History_Input    
    ): Work_History_Response
`;