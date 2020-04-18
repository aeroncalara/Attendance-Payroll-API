const Employee = require("../../models/Entities/Employee.model");
const Corrective_Action = require("../../models/Attributes/Corrective_Action.model");
const {no_employee_validation} = require("../../Utilities/Configs");

const queries = {

}

const mutations = {
    addCorrectiveActionToEmployee: (_, args) => {
        let employee_id = args.employee_id;

        return Employee.findById(employee_id).then(employee =>{
            if(!employee) return no_employee_validation;

            let new_action = new Corrective_Action({
                date_incurred: args.corrective_action.date_incurred,
                description: args.corrective_action.description,
                action: args.corrective_action.action,
                assessed_by: args.corrective_action.assessed_by
            })

            return new_action.save().then(result =>{
                return employee.updateOne({
                    $push: {corrective_action: new_action}
                }).then(result =>{
                    return {
                        message: `Succesfully added corrective action to ${employee.person.last}`,
                        success: true,
                        data: new_action
                    }
                })
            })
        })
    },

    deleteCorrectiveActionOfEmployee: (_, args) => {
        let employee_id = args.employee_id;

        return Employee.findById(employee_id).then(employee =>{
            if(!employee) no_employee_validation;

            let index = employee.corrective_action.findIndex(corrective_action => corrective_action == args.corrective_action_id);
           
            if(index == -1){
                return {
                    message: "Employee doesn't have said corrective action",
                    success: false,
                    data: null,
                }
            }

            return employee.updateOne({
                $pull: {corrective_action: args.corrective_action_id}
            }).then(result =>{
                return Corrective_Action.findByIdAndDelete(args.corrective_action_id).then(async result =>{
                    return {
                        message: `Successfully deleted ${employee.person.last}'s corrective action`,
                        success: true,
                        data: null
                    }
                })
            })
        })
    }
}

exports.queries = queries;
exports.mutations = mutations;