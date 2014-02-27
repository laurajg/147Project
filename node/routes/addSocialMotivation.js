exports.view = function(req,res) {
    var dbUtils = require('dbUtils');
    dbUtils.getGoal(req.query.user, function(goal) {
        res.render('addSocialMotivation',{'user': req.query.user, 'sender': req.query.email, 'goal': goal});    
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
        dbUtils.addPhoto(req.session.user, 'text://' + gallery_message);
        mailUtils.sendMail(email,subject_text,message);
        res.render('addSocialMessageConfirm');
    });
    
}