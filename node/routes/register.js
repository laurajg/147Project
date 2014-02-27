exports.view = function(req, res){
	if(req.session.user) {
		res.redirect('/');
	} else {
		res.render('register', {'emailExist': false, 'usernameExist': false});
	}
};


exports.checkExistence = function(req, res){
	var dbUtils = require('dbUtils');
	var emailaddr = req.query.email;
	var username = req.query.username;
	//console.log(user);
	//console.log(emailaddr);
	dbUtils.checkEmail(emailaddr,
		success = function(){
				dbUtils.checkUsername(username, 
					success = function(){
						dbUtils.createUser(username, emailaddr, req.query.password);
						if (!req.session.user) {
							req.session.user = req.query.username;
						}
						res.render('welcome', {'user': req.session.user});
						res.render('welcome');
					}, 
					failure = function() {
						res.render('register', {'emailExist': false, 'usernameExist': true});
					});
		},
		failure = function() {
			res.render('register', {'emailExist': true, 'usernameExist': false});
		}  );
}