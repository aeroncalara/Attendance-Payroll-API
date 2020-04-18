exports.types = `
    type Contact{
        mobile_number: String
        telephone_number: String
        email_address: String
    }

    input Contact_Input{
        mobile_number: String
        telephone_number: String
        email_address: String
    }

    type Contact_Input_Response{
        message: String
        success: Boolean
        data: Contact
    }
`;


exports.queries = `
    
`;

exports.mutations = `
    addContactInformationToEmployee(employee_id: ID! contact: Contact_Input): Contact_Input_Response
`;