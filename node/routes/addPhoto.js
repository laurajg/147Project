exports.add = function(req, res){
	var dbUtils = require('dbUtils');
	req.session.numNew++;
	dbUtils.addPhoto(req.session.user, req['body']['data']);
	if(!req.session.photoAdded) {
		req.session.photoAdded = req['body']['data'];
	}
	req.session.save();
    console.log(req['body']['share'])
    if(req['body']['share'] == 'friends') {
        var username = req.session.user.charAt(0).toUpperCase() + req.session.user.slice(1);
        console.log('sharing photo');
        dbUtils.getContacts(req.session.user, function(contacts) {
        contacts = typeof contacts !== 'undefined' ? contacts : [];          
        var mailUtils = require('mailUtils');
        mailUtils.initialize();         
        for (i = 0; i < contacts.length; i++) {
            var emailaddr = contacts[i];
            console.log('sharing photo with ' + emailaddr);
            var gmailsux = '<p><h6>['+Math.random().toString(36).substring(7)+'] End of message.</h6></p>';
            var subject_text = 'GoalGlance: New update from ' + username + '!';
            var message = '<p>'+ username + ' has posted a new inspirational photo about their goal!</p>';
            message += '<p>Click <a href="http://goalglance.herokuapp.com/addSocialMotivation?user='+escape(req.session.user)+'&email='+escape(emailaddr)
                        +'&id=' + Math.random().toString(36).substring(7) + '">here</a> to send ' + username + ' some encouragement!</p><p><img src="cid:image" width=500/></p>'+gmailsux;
            mailUtils.sendMailWithImage(emailaddr,subject_text,message,"image.jpg",req['body']['data']);
        }
    }); 
    }

	res.send();
};