exports.types = `

type Attendance{
	sessions: [Sessions]
	employee_id: Employee
}

type Time_Response{
	message: String
	success: Boolean
	data: String
}

type Sessions{
	sessions: [Session]
	employee_id: Employee
}

type Session{
	date: String
	time_in: String
	time_out: String
	difference: Float
}

type Overall_Session{
	sessions: [Session]
	total_hours: Float
}

type Attendance_Report{
	employee: Employee
	position: String
	attendance_entries: Int
	total_hours: Float
	hours_per_entry: Float
}

type Status_Response{
	message: String
	success: Boolean
	data: Boolean
}

`;

exports.queries = `
	getAttendanceOfEmployee(employee_id: ID!): Overall_Session
	getAttendanceReport(start_date: String, end_date: String): [Attendance_Report]
	getAttendanceStatus(employee_number: String!): Status_Response
`;

exports.mutations = `
	timeInEmployee(employee_number: String!): Time_Response
	timeOutEmployee(employee_number: String!): Time_Response
`;




