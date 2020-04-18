exports.types = `
    type Applicant{
        _id: ID!
        person: Person!
        
        sss: String!
        tin: String!
        philhealth: String!
        hdmf: String!

        requested_position: Position!

        work_history: [Work_History]
        transcript: [Transcript]
    }

    type Applicant_Response{
        message: String,
        success: Boolean,
        data: Applicant
    }   
`;

exports.queries = `
    getAllApplicants: [Applicant]!
    getAllPendingApplicants: [Applicant]!
    getAllArchivedApplicants: [Applicant]!
    getApplicant(_id: ID!): Applicant_Response!
`;

exports.mutations = `
    addApplicant(
        person: Person_Input!

        sss: String
        tin: String
        philhealth: String
        hdmf: String

        requested_position: Position_Input!

        work_history: [Work_History_Input]
        transcript: [Transcript_Input]


    ): Applicant_Response,

    editApplicant(
        applicant_id: ID!
        person: Person_Input!

        sss: String
        tin: String
        philhealth: String
        hdmf: String

        position: Position_Input!

        work_history: [Work_History_Input]
        transcript: [Transcript_Input]

        is_terminated: Boolean

    ): Applicant_Response,

    archiveApplicant(applicant_id: ID!): Applicant_Response

    hireApplicant(
        applicant_id: ID!
        hired_position: Position_Input!
    ): Applicant_Response

`;
