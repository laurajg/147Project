exports.sendUpdate = function(req, res){
	var dbUtils = require('dbUtils');

	if(req['body']['share'] != 'friends') {
		dbUtils.getContacts(req.session.user, function(contacts) {
        contacts = typeof contacts !== 'undefined' ? contacts : [];          
    	var mailUtils = require('mailUtils');
		mailUtils.initialize();			
        for (i = 0; i < contacts.length; i++) {
	        var emailaddr = contacts[i];
	        var gmailsux = '<p><h6>['+Math.random().toString(36).substring(7)+'] End of message.</h6></p>';
			var subject_text = 'GoalGlance: New update from ' + req.session.user + '!';
			var message = '<p>'+ req.session.user + ' has a new update about their goal!</p><p><b>'+req['body']['message']+'</b></p>';
			message += '<p>Click <a href="http://goalglance.herokuapp.com/addSocialMotivation?user='+escape(req.session.user)+'&email='+escape(emailaddr)
						+'&id=' + Math.random().toString(36).substring(7) + '">here</a> to send ' + req.session.user + ' some encouragement!</p>'+gmailsux;
			mailUtils.sendMail(emailaddr,subject_text,message);
		}
	});	
	}
	dbUtils.addPhoto(req.session.user, 'text://' + req['body']['message']);
	req.session.numNew++;
	req.session.save();
	res.send();
};