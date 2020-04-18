const moment = require('moment');

exports.dateToString = (date) => { // day month year
	if(!date) return "";
	return moment(date,['YYYY-MM-DD HH:mm:SSS ZZ',"MM/DD/YYYY hh:mm:ss a", ]).format("DD/MM/YYYY hh:mm:ss a");
}

exports.dateToStringNoTime = (date) => {
	if(!date) return "";
	return  moment(date,['YYYY-MM-DD HH:mm:SSS ZZ',"MM/DD/YYYY hh:mm:ss a", ]).format("LL");
}

exports.dateToTimeOnly = (date) => {
	if(!date) return "";
	return moment(date).format("hh:mm:ss a")
}