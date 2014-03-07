exports.add = function(req, res){
	var dbUtils = require('dbUtils');
	req.session.numNew++;
	dbUtils.addPhoto(req.session.user, req['body']['data']);
	if(!req.session.photoAdded) {
		req.session.photoAdded = req['body']['data'];
	}
	req.session.save();
	res.send();
};