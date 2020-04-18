const Employee = require("../../models/Entities/Employee.model");
const Deduction = require("../../models/Attributes/Deduction.model");
const Deduction_Item = require("../../models/Attributes/Deduction_Item.model");
const {no_employee_validation} = require("../../Utilities/Configs");
const {transformDeduction} = require("../../resolvers/Utilities/resolver_transformations");

const queries = {
    getAllDeductionsOfEmployee: (_, args) => {
        let employee_id = args.employee_id;

        //Validation of employee
        return Employee.findById(employee_id).then(employee =>{
            if(!employee) return no_employee_validation;
            const deduction_id = employee.deduction;
            return Deduction.findById(deduction_id).then(deduction => {
                return deduction.deductions.map(deductions =>{
                    return transformDeduction(deductions);
                })
            })
        })
    },

    getAllActiveDeductionsOfEmployee: (_, args) => {
        let employee_id = args.employee_id;

        //Validation of employee
        return Employee.findById(employee_id).then(employee =>{
            if(!employee) return no_employee_validation;
            
            const deduction_id = employee.deduction;
            return Deduction.findById(deduction_id).then(deduction => {
                return deduction.deductions.map(deductions =>{
                    return transformDeduction(deductions);
                }).filter(not_null => {
                    return not_null != null;
                })
            })
        })
    }
}

const mutations = {

    addDeductionToEmployee: (_, args) => {
        let employee_id = args.employee_id;
        return Employee.findById(employee_id).then(employee =>{
            if(!employee) return no_employee_validation;

            const deduction_id = employee.deduction;
            return Deduction.findByIdAndUpdate(deduction_id).then(async deduction => {
                const {date_incurred, description, amount} = args.deduction_input;
                const new_deduction = new Deduction_Item({
                    date_incurred, description, amount
                });

                console.log({new_deduction})

                return deduction.updateOne({$push: {deductions: new_deduction}}).then(result =>{
                    return {
                        message: `Succesfully added deduction to ${employee.person.last}`,
                        success: true,
                        data: new_deduction
                    }
                })
            })
        })
    },
}

exports.queries = queries;
exports.mutations = mutations;