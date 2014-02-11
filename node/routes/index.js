exports.view = function(req, res){

	if(!req.session.user) {
		if(!req.query.username || !req.query.password) {
			res.redirect('landing');
		} else {
			var dbUtils = require('dbUtils');
			var userExists = dbUtils.checkUser(req.query.username, req.query.password, 
					success = function() { 
						req.session.user = req.query.username;
						res.render('index', {'user' : req.query.username});
					},
					failure = function() {
						res.redirect('landing');
					}
				);
		}
	} else {
		res.render('index', {'user': req.session.user});
	}
}