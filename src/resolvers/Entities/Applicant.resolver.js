const Applicant = require("../../models/Entities/Applicant.model");
const Employee = require("../../models/Entities/Employee.model");
const Character_Reference = require("../../models/Attributes/Character_Reference.model");
const Incentive = require("../../models/Attributes/Incentive.model");
const Deduction = require("../../models/Attributes/Deduction.model");


const Person = require("../../models/Attributes/Person.model");
const Contact = require("../../models/Attributes/Contact.model");
const Address = require("../../models/Attributes/Address.model");
const Position = require("../../models/Attributes/Position.model");
const Transcript = require("../../models/Attributes/Transcript.model");
const Work_History = require("../../models/Attributes/Work_History.model");
const Attendance = require("../../models/Attributes/Attendance.model");

//Logs
const Logs = require("../../models/Attributes/Logs.model");

//Validation
const {no_applicant_validation} = require("../../Utilities/Configs");

const queries = {
    getAllApplicants: () => {
        return Applicant.find().then(applicant =>{
            return applicant.map(applicant =>{
                return applicant;
            });
        });
    },

    getAllPendingApplicants: () => {  
        return Applicant.find({is_archived:false}).then(applicant =>{
            return applicant.map(applicant=>{
                return applicant;
            });
        });
    },

    getAllArchivedApplicants:  () => {
        return Applicant.find({is_archived: true}).then(applicant =>{
            return applicant.map(applicant =>{
                return applicant;
            });
        });
    },

    getApplicant: (_, args) => {
        return Applicant.findById(args._id).then(applicant => {
            if(!applicant) return no_applicant_validation;
            return {
                message: "Applicant found!",
                success: true,
                data: applicant
            };
        })
    }
}

const mutations = {

    addApplicant: (_, args) => {

        let contact_array = [];
        let address_array = [];

        //Get Contact
        if(args.person.contact){
            args.person.contact.map(contacts =>{
                contact_array.push(new Contact({
                    type: contacts.type,
                    number: contacts.number,
                }));
            })
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
            title: args.requested_position.title,
            description: args.requested_position.description,
            salary: args.requested_position.salary
        });

        const new_person = new Person({
			first: args.person.first,
			middle: args.person.middle,
            last: args.person.last,
            date_of_birth: args.person.date_of_birth,
            contact: contact_array,
            address: address_array
		});

		const new_applicant = new Applicant({
            person: new_person,
            sss: args.sss,
            tin: args.tin,
            philhealth: args.philhealth,
            hdmf: args.hdmf,
            requested_position: new_position,
        });
        
		return new_applicant.save().then(applicant =>{
            return {
                message: `Succesfully added applicant!`,
                success: true,
                data: new_applicant
            }
		})
    },

    editApplicant: (_,args) => {
        let applicant_id = args.applicant_id;
        return Applicant.findByIdAndUpdate(applicant_id).them(applicant =>{
            if(!applicant) return no_applicant_validation;            
        })
    },
    
	archiveApplicant: (_,args) => {
        let applicant_id = args.applicant_id;
        //Applicant Validation
        return Applicant.findByIdAndUpdate(applicant_id).then(applicant => {
            if(!applicant) return no_applicant_validation;

            if(applicant.is_archived) return {message: "Applicant is already archived", success: false, data: null}
                
            return applicant.updateOne({is_archived: true}).then(result =>{
                return {
                    message: "Applicant succesfully archived!",
                    success: true,
					data: applicant
				}
            })
        })
    },

    hireApplicant: (_, args) => {
        let applicant_id = args.applicant_id;

        return Applicant.findOne({"_id": applicant_id, "is_archived": false}).then(applicant =>{
            if(!applicant) return no_applicant_validation;
            //console.log(applicant);
            const {person, sss, tin, philhealth} = applicant;
            const {description, title, salary} = args.hired_position;
            //Instantiate position with aggreed salary and position
            const position = new Position({description, title, salary});
            const new_employee = new Employee({person, sss, tin, philhealth, position})
            const attendance = new Attendance({
                employee_id: new_employee._id
            });
            const incentive = new Incentive({
                employee_id: new_employee._id
            })
            const deduction = new Deduction({
                employee_id: new_employee._id
            })

            return applicant.updateOne({is_archived: true}).then(result =>{
                return new_employee.save().then(employee =>{
                    return attendance.save().then(result =>{
                        return incentive.save().then(result =>{
                            return deduction.save().then(result =>{
                                return new_employee.updateOne({attendance: attendance._id, incentive: incentive._id, deduction: deduction._id}).then(result =>{
                                    return {
                                        message: "Succesfully hired applicant!",
                                        success: true,
                                        data: applicant
                                    }
                                })
                            })
                        })
                    })
                })
            })
        })
    }
}

exports.queries = queries;
exports.mutations = mutations;