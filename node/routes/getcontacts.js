exports.view = function(req, res){
    if(!req.session.user) {
        res.redirect('landing');
    } else {
        var dbUtils = require('dbUtils');
        var alt = req.query.alt === undefined ? '0' : req.query.alt;                      

        dbUtils.getGoal(req.session.user, function(goal) {
            res.render('getcontacts', {'user': req.session.user, 'goal': goal, 'alt0': alt == 0, 'alt1': alt==1, 'alt2': alt==2, 'statTotalTime': 'statTotalTime'+alt,
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
        res.redirect('share');
    // }
}

exports.removeContact = function(req, res) {
    // if(!req.session.user) {
    //     res.redirect('landing');
    // } else {        
        var dbUtils = require('dbUtils');
        dbUtils.deleteContact(req.session.user,req.query.email);
        res.redirect('share');
    // }
}