exports.add = function(req, res){
	var dbUtils = require('dbUtils');
	console.log(req['body']['data']);
	dbUtils.addPhoto(req.session.user, req['body']['data']);
};