const Employee = require("../../models/Entities/Employee.model");
const Incentive = require("../../models/Attributes/Incentive.model");
const Incentive_Item = require("../../models/Attributes/Incentive_Item.model");
const {no_employee_validation} = require("../../Utilities/Configs");
const {transformIncentive} = require("../../resolvers/Utilities/resolver_transformations");

const queries = {
    getAllIncentivesOfEmployee: (_, args) => {
        let employee_id = args.employee_id;

        //Validation of employee
        return Employee.findById(employee_id).then(employee =>{
            if(!employee) return no_employee_validation;

            const incentive_id = employee.incentive;
            return Incentive.findById(incentive_id).then(incentive => {
                return incentive.incentives.map(incentives =>{
                   return transformIncentive(incentives);
                })
            })
        })
    },

    getAllActiveIncentivesOfEmployee: (_, args) => {
        let employee_id = args.employee_id;
        //Validation of employee
        return Employee.findById(employee_id).then(employee =>{
            if(!employee) return no_employee_validation;

            const incentive_id = employee.incentive;
            return Incentive.findById(incentive_id).then(incentive => {
                return incentive.incentives.map(incentives =>{
                    if(incentives.is_active == true){
                        return transformIncentive(incentives);
                    }
                }).filter(not_null => {
                    return not_null != null;
                })
            })
        })
    }
}

const mutations = {

    addIncentiveToEmployee: (_, args) => {
        let employee_id = args.employee_id;
        return Employee.findById(employee_id).then(employee =>{
            if(!employee) return no_employee_validation;

            const incentive_id = employee.incentive;
            return Incentive.findByIdAndUpdate(incentive_id).then(async incentive => {
                const {date_incurred, description, amount} = args.incentive_input;
                const new_incentive = new Incentive_Item({
                    date_incurred, description, amount
                });

                return incentive.updateOne({$push: {incentives: new_incentive}}).then(result =>{
                    return {
                        message: `Succesfully added incentive to ${employee.person.last}`,
                        success: true,
                        data: new_incentive
                    }
                })
            })
        })
    },
}

exports.queries = queries;
exports.mutations = mutations;