exports.view = function(req, res){

	if(!req.session.user) {
		if(!req.query.username || !req.query.password) {
			res.redirect('login');
		} else {
			var dbUtils = require('dbUtils');
			var userExists = dbUtils.checkUser(req.query.username, req.query.password, 
					success = function() { 
						res.render('index');
						req.session.user = req.query.username;
					},
					failure = function() {
						res.redirect('login');
					}
				);
		}
	} else {
		res.render('index');
	}
}