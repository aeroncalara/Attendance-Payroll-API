exports.types = `
    type User{
        _id: String
        username: String
        password: String
        email_address: String
        is_logged_in: Boolean
        is_verified: Boolean
        session_token: String
        time_out_date: String

    }

    type User_Response{
        message: String
        success: Boolean
        data: User
    }

    type Sign_In_Props{
        hash: String
        logged_in: Boolean
        role: String        
    }

    type Sign_In_Response{
        message: String,
        success: Boolean,
        data: Sign_In_Props
    }

    type Sign_Out_Response{
        message: String,
        success: Boolean,
    }

    type User_Auth_Response{
        is_verified: Boolean
    }
`;


exports.queries = `
    getAllUsers: [User]
    getAllLoggedInUsers: [User]
    getAllUnverifiedUsers: [User]
    getUserById(user_id: ID!): User
    verifyUser(hash: String): User_Auth_Response
    
`;  

exports.mutations = `
    addUser(username: String, password: String, email_address: String): User_Response
    signIn(username: String, password: String): Sign_In_Response
    signOut(username: String): Sign_Out_Response
    changePassword(username: String, password: String, new_password: String): Boolean

`;

