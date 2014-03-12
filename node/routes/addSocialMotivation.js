exports.view = function(req,res) {
    var dbUtils = require('dbUtils');
    dbUtils.getGoal(req.query.user, function(goal) {
        if (goal == null) {
            res.render('addSocialMessageError');
            return;            
        }
        var username = req.query.user.charAt(0).toUpperCase() + req.query.user.slice(1);
        res.render('addSocialMotivation',{'user': username, 'sender': req.query.email, 'goal': goal, 'userid': req.query.user, 'numNew': (req.session.numNew? req.session.numNew: 0)});    
    });    
}

exports.doAdd = function(req,res) {
    var dbUtils = require('dbUtils');
    var mailUtils = require('mailUtils');
    mailUtils.initialize(); 
    dbUtils.getEmail(req.query.username, function(email) {
        if (email == null) {
            res.render('addSocialMessageError');
            return;
        }
        var gmailsux = '<p><h6>['+Math.random().toString(36).substring(7)+'] End of message.</h6></p>';
        var message_escaped = req.query.message.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;') ;
        var subject_text = 'GoalGlance: New message from ' + req.query.sendername + '!';
        var message = '<p>' + req.query.sendername + ' ('+ req.query.senderemail +') has a new motivational message for you!</p>';
        message += '<p>Click <a href="http://goalglance.herokuapp.com/gallery?id=' + Math.random().toString(36).substring(7) + '">here</a> to go to your gallery and see it!</p>'+gmailsux;    
        var gallery_message = "<p>" + message_escaped + '</p>';
        dbUtils.addPhotoFrom(req.query.username, 'text://' + gallery_message, req.query.sendername);
        mailUtils.sendMail(email,subject_text,message);
        res.render('addSocialMessageConfirm');
    });
    
}