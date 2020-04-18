const Employee = require("../../models/Entities/Employee.model");
const Leave_Entitlement = require("../../models/Attributes/Leave_Entitlement.model")
const ObjectId = require('mongoose').Types.ObjectId;


//Validation
const {no_employee_validation} = require("../../Utilities/Configs");

const queries = {

}

const mutations = {

    addLeaveEntitlementToEmployee: (_, args) => {
        let employee_id = args.employee_id
        return Employee.findByIdAndUpdate(employee_id).then(employee => {
            if(!employee) return no_employee_validation;

            let new_leave_entitlement_array = employee.leave_entitlement.slice();
            let checker = checkType(new_leave_entitlement_array, args.type);

            if(checker === false){

                const new_leave_entitlement = new Leave_Entitlement({
                    type: args.type,
                    value: 1
                })
                new_leave_entitlement_array.push(new_leave_entitlement);
            
                return employee.updateOne({leave_entitlement: new_leave_entitlement_array}).then(result => {
                    return {
                           message: "Successfully added leave entitlement!",
                           success: true,
                           data: new_leave_entitlement
                    }
                })

            }else{
                new_leave_entitlement_array[checker].value +=1;
                console.log(new_leave_entitlement_array[checker].value);
     
                return employee.updateOne({leave_entitlement: new_leave_entitlement_array}).then(result => {
                    return {
                        message: `Successfully added leave entitlement!`,
                        success: true,
                        data: new_leave_entitlement_array[checker]
                    }
                })
            }
        })        
    },
	
	deleteLeaveEntitlementOfEmployee: (_, args) => {
        let employee_id = args.employee_id;

        return Employee.findById(employee_id).then(employee =>{
            if(!employee) no_employee_validation;

            let new_leave_entitlement = employee.leave_entitlement.slice();
            let index = new_leave_entitlement.findIndex(leave_entitlement => leave_entitlement == args.leave_entitlement_id);
                
                if(index == -1){
                    return {
                        message: "Employee doesn't have said leave entitlement",
                        success: false,
                        data: null,
                    }
                }else{
                    new_leave_entitlement.splice(index, 1)

                    return employee.updateOne({
                        leave_entitlement: new_leave_entitlement
                    }).then(result => {
                        return {
                            success: true,
                            message: "Removed leave entitlement!",
                            data: null
                        }
                    })
                }

            // let index = employee.leave_entitlement.findIndex(leave_entitlement => leave_entitlement == args.leave_entitlement_id);
    
            // if(index == -1){
            //     return {
            //         message: "Employee doesn't have said leave entitlement",
            //         success: false,
            //         data: null,
            //     }
            // }

            // return employee.updateOne({
            //     $pull: {leave_entitlement: args.leave_entitlement_id}
            // }).then(result =>{
            //     return Leave_Entitlement.findByIdAndDelete(args.leave_entitlement_id).then(async result =>{
            //         return {
            //             message: `Successfully deleted ${employee.person.last}'s leave entitlement`,
            //             success: true,
            //             data: null
            //         }
            //     })
            // })

        })
    }
}

function checkType(list, object){

    if(list.length == 0){
        return false;
    }
    var i = 0;
    for(i=0; i < list.length; i++){
        if(list[i].type == object){
            return i;
        }
    }

    return false;
}

exports.queries = queries;
exports.mutations = mutations;