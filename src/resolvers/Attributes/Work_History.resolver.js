const Employee = require("../../models/Entities/Employee.model");
const Position = require("../../models/Attributes/Position.model");
const Character_Reference = require("../../models/Attributes/Character_Reference.model");
const Work_History = require("../../models/Attributes/Work_History.model");
const Company = require("../../models/Attributes/Company.model");

const queries = {

}

const mutations = {
    addWorkHistoryToEmployee: (_, args) => {

        let employee_id = args.employee_id;

        return Employee.findByIdAndUpdate(employee_id).then(employee =>{
            if(!employee) return no_employee_validation;

            console.log(args.work_history.company.name);

            let new_company = new Company({
                name: args.work_history.company.name,
                address: args.work_history.company.address,
                contact_number: args.work_history.company.contact_number,
                contact_person: args.work_history.company.contact_person
            })

            console.log(new_company);
        
            let new_position = new Position({
                title: args.work_history.position.title,
                description: args.work_history.position.description,
                salary: args.work_history.position.salary
            })

            let new_character_reference = new Character_Reference({
                name: args.work_history.character_reference.name,
                contact_number: args.work_history.character_reference.contact_number
            })
            
            let new_work = new Work_History({
                company: new_company,
                date_start: args.work_history.date_start,
                date_end: args.work_history.date_end,
                position: new_position,
                character_reference: new_character_reference
            })

            return employee.updateOne({
                $push: {work_history: new_work},
            }).then(result =>{
                return {
                    message: `Succesfully updated ${employee.person.last}'s work history`,
                    success: true,
                    data: new_work
                }
            }).catch(err =>{
                throw(err);
            })
        })
    },
}

exports.queries = queries;
exports.mutations = mutations;