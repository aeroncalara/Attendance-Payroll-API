const Employee = require("../../models/Entities/Employee.model");
const Payroll = require("../../models/Entities/Payroll.model");
const Payroll_Entity = require("../../models/Entities/Payroll_Entity.model");

const Incentive = require("../../models/Attributes/Incentive.model");
const Incentive_Item = require("../../models/Attributes/Incentive_Item.model");
const Deduction = require("../../models/Attributes/Deduction.model");
const Deduction_Item = require("../../models/Attributes/Deduction_Item.model");
const {no_employee_validation} = require("../../Utilities/Configs");

const EmployeeResolver = require("../Entities/Employee.resolver");
const DeductionResolver = require("../Attributes/Deduction.resolver");
const IncentiveResolver = require("../Attributes/Incentive.resolver");

const {transformPayroll, transformPayrollWithEntities} = require("../Utilities/resolver_transformations");
const {dateToStringNoTime} = require("../Utilities/utilities");

const queries = {
    getAllPayrolls: () => {
        return Payroll.find().then(payrolls =>{
            return payrolls.map(payroll =>{
                return transformPayroll(payroll);
            })
        })
    },

    getPayroll: (_, args) => {
        let {payroll_id} = args;
        return Payroll.findById(payroll_id).then(payroll =>{
            
            return transformPayrollWithEntities(payroll);
        })
    }
}

const mutations = {

    createPayroll: (_, args) => {
        const {start_date, end_date} = args;

        //Initialize new_payroll
        const new_payroll = new Payroll({
            start_date,
            end_date,
            entities: [],
        })

        let resulting_payroll;

        return new_payroll.save().then(payroll =>{
            resulting_payroll = payroll;

            return EmployeeResolver.queries.getAllActivatedEmployees().then(employees =>{
                return employees.map(async employee =>{

                    let employee_name = [employee.person.first, employee.person.last].join(" ");
                    let new_entity = new Payroll_Entity({
                        employee_id: employee._id,
                        employee_name,
                        base_salary: employee.position.salary,
                        deductions: await DeductionResolver.queries.getAllActiveDeductionsOfEmployee({}, {employee_id: employee._id}) || [],
                        incentives: await IncentiveResolver.queries.getAllActiveIncentivesOfEmployee({}, {employee_id: employee._id} || []),
                        total_pay: 0,
                        payroll_id: resulting_payroll._id,
                    })

                    let deduction_cost = 0;
                    new_entity.deductions.map(deduction =>{
                        deduction_cost += deduction.amount;
                    })

                    let incentive_cost = 0;
                    new_entity.incentives.map(incentive =>{
                        incentive_cost += incentive.amount
                    })

                    new_entity.total_pay = new_entity.base_salary + (incentive_cost) - deduction_cost;
                    return new_entity.save();

                })
            })
        }).then(async payroll_entities =>{
            return Promise.all(payroll_entities).then(result =>{
                total_pay = 0;
                result.map(entity => {
                    resulting_payroll.entities.push(entity._id);
                    resulting_payroll.total_pay += entity.total_pay;
                })
                return new Promise((resolve, reject) =>{
                    return Payroll.findByIdAndUpdate(resulting_payroll._id, {entities: resulting_payroll.entities, total_pay: resulting_payroll.total_pay})
                    .then(resolve)
                    .catch(reject)
                })
            })
        }).then(async () =>{
            
            return {
                message: `Succesfully created payroll for ${start_date}`,
                success: true,
                data: {
                    start_date: dateToStringNoTime(resulting_payroll.start_date),
                    end_date: dateToStringNoTime(resulting_payroll.end_date),
                    entities: await resulting_payroll.entities.map(entity =>{
                        return Payroll_Entity.findById(entity._id)
                    })
                }   
            }
        })
    }
}

exports.queries = queries;
exports.mutations = mutations;