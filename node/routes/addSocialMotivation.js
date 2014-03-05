exports.view = function(req,res) {
    var dbUtils = require('dbUtils');
    dbUtils.getGoal(req.query.user, function(goal) {
        var username = req.query.user.charAt(0).toUpperCase() + req.query.user.slice(1);
        res.render('addSocialMotivation',{'user': username, 'sender': req.query.email, 'goal': goal, 'userid': req.query.user});    
    });    
}

exports.doAdd = function(req,res) {
    var dbUtils = require('dbUtils');
    var mailUtils = require('mailUtils');
    mailUtils.initialize(); 
    dbUtils.getEmail(req.query.username, function(email) {
        var subject_text = 'GoalGlance: New message from ' + req.query.sendername + '!';
        var message = '<p>' + req.query.sendername + ' ('+ req.query.senderemail +') has a new motivational message for you!</p>';
        message += '<p>Click <a href="http://goalglance.herokuapp.com/gallery?id=' + Math.random().toString(36).substring(7) + '">here</a> to go to your gallery and see it!</p>';    
        var gallery_message = "<p>From: " + req.query.sendername + "</p><p>" + req.query.message + '</p>';
        dbUtils.addPhoto(req.query.username, 'text://' + gallery_message);
        mailUtils.sendMail(email,subject_text,message);
        res.render('addSocialMessageConfirm');
    });
    
}