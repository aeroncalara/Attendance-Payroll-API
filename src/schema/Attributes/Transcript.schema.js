exports.types = `
    type Transcript{
        _id: ID!
        type: String
        file_URL: String
        title: String
        description: String
        employee_id: ID
    }

    input Transcript_Input{
        type: String
        file_URL: String
        title: String
        description: String
        employee_id: ID
    }
`;

exports.queries = `
    getAllTranscripts: [Transcript]!
    getTranscriptOfEmployee(_id: ID!): Transcript
`;

exports.mutations = `
    addTranscriptToEmployee(employee_id: ID!): Transcript
`;