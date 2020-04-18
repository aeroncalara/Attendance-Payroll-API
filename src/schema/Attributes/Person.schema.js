exports.types = `
    type Person{
        first: String!
        middle: String!
        last: String!
        date_of_birth: String

        address: [Address]
        contact: Contact
    }

    input Person_Input{
        first: String!
        middle: String
        last: String!
        date_of_birth: String!

        contact: Contact_Input
        address: [Address_Input]
    }
`;


exports.queries = `
    
`;

exports.mutations = `
    
`;