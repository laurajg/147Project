exports.add = function(req, res){
	var dbUtils = require('dbUtils');
	req.session.numNew++;
	req.session.save();
	dbUtils.addPhoto(req.session.user, req['body']['data']);
	res.send();
};