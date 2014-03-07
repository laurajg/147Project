exports.view = function(req, res){
    if(!req.session.user) {
        res.redirect('landing');
    } else {
        var dbUtils = require('dbUtils');
        var alt = req.query.alt === undefined ? '0' : req.query.alt;                      

        dbUtils.getGoal(req.session.user, function(goal) {
            alt = 1;
            res.render('getcontacts', {'user': req.session.user, 'goal': goal, 'numNew': (req.session.numNew? req.session.numNew: 0), 'alt0': alt == 0, 'alt1': alt==1, 'alt2': alt==2, 'statTotalTime': 'statTotalTime'+alt,
                                    'statPageLoad':'statPageLoad'+alt, 'statAddClicked':'statAddClicked'+alt, 'statTypeToAddTime': 'statTypeToAddTime'+alt});
        });
    }
//    if(!req.session.user) {
//        res.redirect('landing');
//    } else {
       // var alt = req.query.alt === undefined ? '0' : req.query.alt;                      
     //   res.render('getcontacts',{'alt0': alt == 0, 'alt1': alt==1, 'alt2': alt==2, 'statTotalTime': 'statTotalTime'+alt,
       //                             'statPageLoad':'statPageLoad'+alt, 'statAddClicked':'statAddClicked'+alt, 'statTypeToAddTime': 'statTypeToAddTime'+alt});        
//    }
};
exports.addContact = function(req, res) {
    // if(!req.session.user) {
    //     res.redirect('landing');
    // } else {
        console.log(req.query);
        var dbUtils = require('dbUtils');
        dbUtils.addNewContact(req.session.user,req.query.contactemail);
        var mailUtils = require('mailUtils');
        mailUtils.initialize();         
        var gmailsux = '<p><h6>['+Math.random().toString(36).substring(7)+'] End of message.</h6></p>';
        var username = req.session.user.charAt(0).toUpperCase() + req.session.user.slice(1);
        var emailaddr = req.query.contactemail;
        var subject_text = 'GoalGlance: ' + username + ' wants to share their goal with you!';
        var message = '<p>'+ username + ' wants you to help support them in achieving their goal!</p>';
        message += '<p>Click <a href="http://goalglance.herokuapp.com/addSocialMotivation?user='+escape(req.session.user)+'&email='+escape(emailaddr)
                    +'&id=' + Math.random().toString(36).substring(7) + '">here</a> to send ' + username + ' some encouragement!</p>'+gmailsux;
        mailUtils.sendMail(emailaddr,subject_text,message);
        //console.log(emailaddr);
            //console.log(message);
        
        res.redirect('share');
    // }
}

exports.removeContact = function(req, res) {
    // if(!req.session.user) {
    //     res.redirect('landing');
    // } else {        
        var dbUtils = require('dbUtils');
        dbUtils.deleteContact(req.session.user,req.query.email);
        res.redirect('/share');
    // }
}