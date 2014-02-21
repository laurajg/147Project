exports.sendUpdate = function(req, res){
	var dbUtils = require('dbUtils');
	console.log(req.query);

	if(req.query.share != 'friends') {
		dbUtils.getContacts(req.session.user, function(contacts) {
        contacts = typeof contacts !== 'undefined' ? contacts : [];          
    	var mailUtils = require('mailUtils');
		mailUtils.initialize();			
        for (i = 0; i < contacts.length; i++) {
	        var emailaddr = contacts[i];
			var subject_text = 'GoalGlance: New update from ' + req.session.user + '!';
			var message = '<p>'+ req.session.user + ' has a new update about their goal!</p><p><b>'+req.query.message+'</b></p>'
			message += '<p>Click <a href="http://goalglance.herokuapp.com/addSocialMotivation?user='+escape(req.session.user)+'">here</a> to send ' + req.session.user + ' some encouragement!</p>';
			mailUtils.sendMail(emailaddr,subject_text,message);
			console.log(emailaddr);
			console.log(message);
		}
	});	
	}
	dbUtils.addPhoto(req.session.user, 'text://' + req.query.message);
	res.redirect('/gallery');
};