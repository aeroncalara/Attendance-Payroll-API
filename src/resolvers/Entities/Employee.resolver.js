const Employee = require("../../models/Entities/Employee.model");
const Employee_Number = require("../../models/Entities/Employee_Number.model");
const Character_Reference = require("../../models/Attributes/Character_Reference.model");
const Performance_Assessment = require("../../models/Attributes/Performance_Assessment.model");
const Attendance = require("../../models/Attributes/Attendance.model");
const Incentive = require("../../models/Attributes/Incentive.model");
const Deduction = require("../../models/Attributes/Deduction.model");

const Person = require("../../models/Attributes/Person.model");
const Contact = require("../../models/Attributes/Contact.model");
const Address = require("../../models/Attributes/Address.model");
const Position = require("../../models/Attributes/Position.model");
const Transcript = require("../../models/Attributes/Transcript.model");
const Work_History = require("../../models/Attributes/Work_History.model");

const User = require("../../models/Entities/User.model");

//Logs
const Logs = require("../../models/Attributes/Logs.model");

//Validation
const {no_employee_validation} = require("../../Utilities/Configs");
const {transformEmployee} = require("../Utilities/resolver_transformations");

const queries = {
    getAllEmployees: async () => {
        
        return Employee.find({is_terminated: false}).then(employees =>{
            return employees.map(employee =>{
                return employee;
            })
        })
    },
    getAllActivatedEmployees: () => { //aeron
        return Employee.find({
            is_activated: true
        }).then(employees =>{
                return employees.map(employee=>{
                    return employee;
                })
            })
        },
    getArchivedEmployees:  () => {
        return Employee.find({
            is_archived: true
        }).then(employees =>{
            return employees.map(employee =>{
                return employee;
            })
        })
    },
    getEmployee: (_, args) => {
        return Employee.findById(args.employee_id).then(employee =>{
            return transformEmployee(employee);
        })
    },
}

const mutations = {

    addEmployee: async (_, args) => {

        let employee_number = generateEmployeeNumber(await Employee.find().countDocuments() + 1);
        let address_array = [];
        let new_contact;

        //Get Contact
        if(args.person.contact){
            new_contact = new Contact({
                mobile_number: args.person.contact.mobile_number,
                telephone_number: args.person.contact.telephone_number,
                email_address: args.person.contact.email_address,
            })
            
            console.log(new_contact);
        }
        
        //Unwind address
        if(args.person.address){
            args.person.address.map(addresses =>{
                address_array.push(new Address({
                    number: addresses.number,
                    street: addresses.street,
                    city: addresses.city,
                    province: addresses.province,
                    country: addresses.country,
                }));
            });
        }
        const new_position = new Position({
            title: args.position.title,
            description: args.position.description,
            salary: args.position.salary
        });

        const new_person = new Person({
			first: args.person.first,
			middle: args.person.middle,
            last: args.person.last,
            date_of_birth: args.person.date_of_birth,
            contact: new_contact,
            address: address_array
		});

		const new_employee = new Employee({
            person: new_person,
            employee_number,
            sss: args.sss,
            tin: args.tin,
            philhealth: args.philhealth,
            hdmf: args.hdmf,
            position: new_position,
        });

        const new_user = new User({ 
            username: employee_number,
            password: 'password',
            role: args.role
        });


        const attendance = new Attendance({
            employee_id: new_employee._id
        });

        const incentive = new Incentive({
            employee_id: new_employee.id
        })

        const deduction = new Deduction({
            employee_id: new_employee._id,
        })
        
		return new_employee.save().then(employee =>{
            //Save attendance
            return incentive.save().then(result =>{
                return deduction.save().then(result => {
                    return attendance.save().then(result =>{
                        return new_employee.updateOne({attendance: attendance._id, incentive: incentive._id, deduction: deduction._id}).then(result=>{
                            return new_user.save().then(user => {
                                return transformEmployee(employee);
                            })
                        });
                    })
                })
            })
		})
    },

    editEmployee: (_,args)=>{
        let {employee_id, person, position, sss, tin, hdmf, philhealth} = args;
        return Employee.findByIdAndUpdate(
            employee_id, 
            {
                "person.first": person.first,
                "person.middle": person.middle,
                "person.last": person.last,
                "person.date_of_birth": new Date(person.date_of_birth),
                "person.contact": person.contact,
                "person.address": person.address,
                position: position,
                sss, tin, hdmf, philhealth
            },
            {new: true}
        ).then(employee =>{
            return transformEmployee(employee);
        })
    },
    
	archiveEmployee: (_,args)=>{
        let employee_id = args.employee_id;
        return Employee.findByIdAndUpdate(employee_id).then(employee => {
            if(!employee) return no_employee_validation;

            if(employee.is_archived) return {message: "Employee is already archived", success: false, data: null}
                
            return employee.updateOne({is_archived: true}).then(result =>{
                return {
                    message: "Employee succesfully archived!",
                    success: true,
					data: employee
				}
            })
        })
    },    
}

const generateEmployeeNumber = (number) => {

    let month_utility = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];

    let current_year = new Date().getFullYear();
    let current_month = new Date().getMonth();
    
    let s = "0000" + number;
    let employee_number = [current_year.toString(), "-", month_utility[current_month], s.substring(s.length - 4)].join("");

    return employee_number;
}

exports.queries = queries;
exports.mutations = mutations;