const Employee = require("../../models/Entities/Employee.model");
const Contact = require("../../models/Attributes/Contact.model");

const queries = {
    
}

const mutations = {
    addContactInformationToEmployee: (_, args) => {
        let employee_id = args.employee_id;

        return Employee.findById(employee_id).then(employee =>{
            if(!employee) return no_employee_validation;

            let new_contact = new Contact({
                type: args.contact.type,
                number: args.contact.number,
            })

            return employee.updateOne({
                $push: {"person.contact": new_contact}
            }).then(result =>{
                return {
                    message: `Succesfully added ${employee.person.last}'s contact`,
                    success: true,
                    data: new_contact
                }
            })
        })
    },
}

exports.queries = queries;
exports.mutations = mutations;