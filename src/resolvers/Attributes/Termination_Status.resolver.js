const Employee = require("../../models/Entities/Employee.model");
const Termination_Status = require("../../models/Attributes/Termination_Status.model")
const {no_employee_validation} = require("../../Utilities/Configs");

const queries = {

    getTerminateEmployees:  () =>{
        return Employee.find({
            is_terminated: true
        }).then(employees =>{
            return employees.map(employee =>{
                return employee;
            })
        })
    }

}

const mutations = {
    terminateEmployee: (_, args) => {
        let employee_id = args.employee_id;

        return Employee.findById(employee_id).then(employee =>{
            if(!employee) return no_employee_validation;

            if(employee.is_terminated) return {message: "Employee is already terminated!", success: false, data: null}
            // return employee.updateOne({is_terminated: true}).then(result =>{
            //     return {
            //         message: "Employee succesfully terminated!",
            //         success: true,
			// 		data: employee
			// 	}
            // })
            return employee.updateOne({is_terminated: true,is_activated: false}).then(result =>{
                return {
                    message: "Employee succesfully terminated!",
                    success: true,
					data: employee
				}
            })

        })
    }

}

exports.queries = queries;
exports.mutations = mutations;