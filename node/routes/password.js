exports.view = function(req, res){
	if(req.session.user) {
		res.redirect('/');
	} else {
		res.render('password', {'search': false, 'success': false});
	}
};


exports.getPassword = function(req, res){
	var dbUtils = require('dbUtils');
	var user = req.query.username;
	var emailaddr = req.query.useremail;
	//console.log(user);
	//console.log(emailaddr);
	dbUtils.retrievePassword(user, emailaddr,
		success = function(password){
				var mailUtils = require('mailUtils');
				mailUtils.initialize();	
				var subject_text = 'GoalGlance: Your Password Request ';
				var message = '<p>'+ user + ' has asked for their password to be sent to this email address</p><p><b>'+password+'</b></p>';
				message += '<p>Click <a href="http://goalglance.herokuapp.com">here</a> to login </p>';
				mailUtils.sendMail(emailaddr,subject_text,message);
				res.render('password', {'search': true, 'success': true});
		},
		failure = function() {
			res.render('password', {'search': true, 'success': false});
		}  );
}