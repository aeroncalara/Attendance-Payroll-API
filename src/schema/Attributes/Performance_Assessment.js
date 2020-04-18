exports.types = `
    type Performance_Assessment{
        _id: ID!
        employee_id: ID!
        remarks: String  
        date: String
        assessed_by: ID!
    }

    input Performance_Assessment_Input{
        employee_id: ID!
        remarks: String
        assessed_by: ID!
    }

    type Performance_Assessment_Response{
        message: String
        success: Boolean
        data: Performance_Assessment
    }
`;

exports.queries = `
    getAllPerformanceAssessments: [Performance_Assessment]
`;

exports.mutations = `
    addPerformanceAssessmentToEmployee(
        performance_assessment: Performance_Assessment_Input    
    ): Performance_Assessment_Response,

    deletePerformanceAssessmentOfEmployee(
        employee_id: ID!
        performance_assessment_id: ID!
    ): Performance_Assessment_Response
`;