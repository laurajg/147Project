exports.delete = function(req, res){
	var dbUtils = require('dbUtils');
	dbUtils.deletePhoto(req.session.user, req['body']['photoURL']);
	res.send();
};