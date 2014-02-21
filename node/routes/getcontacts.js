exports.view = function(req, res){
//    if(!req.session.user) {
//        res.redirect('landing');
//    } else {
        res.render('getcontacts');        
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