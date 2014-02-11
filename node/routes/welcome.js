exports.view = function(req, res){
	var dbUtils = require('dbUtils');
	dbUtils.createUser(req.query.username, req.query.email, req.query.password);
	req.session.user = req.query.username;
	res.render('welcome');
};