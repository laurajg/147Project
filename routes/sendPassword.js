exports.sendPassword = function(req, res){
	var dbUtils = require('dbUtils');
	dbUtils.getEmail(req.session.user, function(emailaddr) {
		var mailUtils = require('mailUtils');
		mailUtils.initialize();	
		var subject_text = 'GoalGlance: Your Password Request ';
		var message = '<p>'+ req.session.user + ' has asked for their password to be sent to this email address</p><p><b>'+password+'</b></p>';
		message += '<p>Click <a href="http://goalglance.herokuapp.com/">here</a> to login </p>';
		mailUtils.sendMail(emailaddr,subject_text,message);
	});	
	//console.log(req.query);
	res.redirect('/landing');
};

