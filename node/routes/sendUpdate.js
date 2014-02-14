exports.sendUpdate = function(req, res){
	var dbUtils = require('dbUtils');
	dbUtils.getEmail(req.session.user, function(emailaddr) {
		var mailUtils = require('mailUtils');
		mailUtils.initialize();	
		var subject_text = 'GoalGlance: New update from ' + req.session.user + '!';
		var message = '<p>'+ req.session.user + ' has a new update about their goal!</p><p><b>'+req.query.message+'</b></p>'
		message += '<p>Click <a href="http://goalglance.herokuapp.com/">here</a> to send ' + req.session.user + ' some encouragement![TODO]</p>';
		mailUtils.sendMail(emailaddr,subject_text,message);
	});	
	//console.log(req.query);
	res.redirect('/gallery');
};