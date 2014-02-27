exports.view = function(req, res){
	if(!req.query.username && !req.query.email && !req.query.password && !req.session.user) {
		res.redirect('login');
	} else {
		//var dbUtils = require('dbUtils');
		//dbUtils.createUser(req.query.username, req.query.email, req.query.password);
		if (!req.session.user) {
			req.session.user = req.query.username;
		}
		res.render('welcome', {'user': req.session.user});
	}
};