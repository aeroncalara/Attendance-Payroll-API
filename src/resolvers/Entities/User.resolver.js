const User = require("../../models/Entities/User.model");

const queries = {

    getAllUsers: () => {
        return User.find().then(users => {
            return users.map(user => {
                return user;
            })
        })
	},

	verifyUser: (_, args) =>{
		let {hash} = args;
		let credentials = decryptfa7al15(hash);
		let username = credentials.username.join("");
		let password = credentials.password.join("");

		console.log(username, password);

		return User.findOne({$and: [{username:username}, {password: password}]}).then(user =>{
			if(!user) return {is_verified: false};
			else return {is_verified: true};
		})
	}
}

const mutations = {
    addUser: (_, args) => {
		const {username, password, email_address} = args;

		return User.findOne({username}).then(user => {
			if(user) return {message: `Username already taken!`, success: false, data: null}
			if(password.length < 6) return {message: "Password too short!", success: false, data: null}

			const new_user = new User({
				username, password, email_address
			});

			return new_user.save().then(result =>{
				return {message: "Succesfully added user!", success: true, data: null}
			})
		})
	},

	signIn: (_, args) => {
		const {username, password} = args;

		return User.findOne({username}).then(user =>{
			if(!user) return {message: `User not found!`, success: false, data: null}
			if(user.password != password) return {message: `Wrong password! Please try again!`, success: false, data: null};


			return user.updateOne({is_logged_in: true}).then(result => {
				return {message: `User logged in!`, success: true, data: {hash: user.username, logged_in: true}}
			})
		})
	},

	signOut: (_, args) => {
		const {username} = args;
		return User.findOneAndUpdate({username}, {is_logged_in: false}).then(user =>{

			if(user) return { message: `User signed out`, success: true}
			else return {message: `Something went wrong`, success: false}
			
		})
	}
}


//ENCRYPTION TYPE: FA7AL15 STRING
const encrpytUser = ({username, password}) => {
	let user_hash = fa7al15(username);
	let password_hash = fa7al15(password);

	//console.log(user_hash.length);
	let hash = [user_hash, password_hash].join("//-//");
	return hash;
}

const fa7al15 = (base_string) => {
	let hash = [base_string, base_string].join("").trim();
	let length = base_string.length;
	for(i=0; i<length; i++){
		index = 2*i;

		hash = replace(hash, index, String.fromCharCode(base_string.charCodeAt(i) + 7));
		hash = replace(hash, index+1, String.fromCharCode(base_string.charCodeAt(i) - 15));
	}
	return hash;
}

const decryptfa7al15 = (hash) => {
	let divided = hash.split("//-//");
	let username = [];
	let password = [];

	for(let i=0; i<divided[0].length; i += 2){
		username.push(String.fromCharCode(divided[0].charCodeAt(i) - 7));
	}

	for(let i=0; i<divided[1].length; i+=2){
		password.push(String.fromCharCode(divided[1].charCodeAt(i) - 7))
	}

	username.pop();
	password.pop();
	
	return {username, password};
}

const replace = (string, index, replacement) => {
	return string.substr(0, index) + replacement + string.substr(index, replacement.length);
}


exports.queries = queries;
exports.mutations = mutations;