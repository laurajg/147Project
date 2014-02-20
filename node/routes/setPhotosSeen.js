exports.setSeen = function(req, res){
		var dbUtils = require('dbUtils');
		dbUtils.setPhotosSeen(req.session.user, req['body']['image_urls']);
};