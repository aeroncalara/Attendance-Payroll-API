const Employee = require("../../models/Entities/Employee.model");
const Performance_Assessment = require("../../models/Attributes/Performance_Assessment.model");
const {no_employee_validation} = require("../../Utilities/Configs");

const queries = {
    getAllPerformanceAssessments: () => {
        return Performance_Assessment.find().then(performance_assessments =>{
            return performance_assessments.map(performance_assessment =>{
                return performance_assessment;
            })
        })
    },


}

const mutations = {
    addPerformanceAssessmentToEmployee: (_, args) => {
        let employee_id = args.performance_assessment.employee_id;

        return Employee.findById(employee_id).then(employee =>{
            if(!employee) no_employee_validation;

            let new_assessment = new Performance_Assessment({
                employee_id: employee_id,
                remarks: args.performance_assessment.remarks,
                assessed_by: args.performance_assessment.assessed_by
            })

            return new_assessment.save().then(result =>{
                return employee.updateOne({
                    $push: {performance_assessment: new_assessment}
                }).then(result =>{
                    return {
                        message: `Added new assessment to ${employee.person.first}!`,
                        success: true,
                        data: new_assessment
                    }
                })
            })
        })
    },

    deletePerformanceAssessmentOfEmployee: (_, args) => {
        let employee_id = args.employee_id;
        return Employee.findById(employee_id).then(employee =>{
            if(!employee) no_employee_validation;

            let index = employee.performance_assessment.findIndex(performance_assessment => performance_assessment == args.performance_assessment_id);
           
            if(index == -1){
                return {
                    message: "Employee doesn't have said assessment",
                    success: false,
                    data: null,
                }
            }

            return employee.updateOne({
                $pull: {performance_assessment: args.performance_assessment_id}
            }).then(result =>{
                return Performance_Assessment.findByIdAndDelete(args.performance_assessment_id).then(async result =>{
                    return {
                        message: `Successfully deleted ${employee.person.last}'s assessment`,
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