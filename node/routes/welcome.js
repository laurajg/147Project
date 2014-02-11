exports.view = function(req, res){
	var dbUtils = require('dbUtils');
	dbUtils.createUser(req.query.username, req.query.email, req.query.password);
	res.render('welcome');
};