exports.view = function(req, res){
	if(!req.session.user) {
		res.redirect('landing');
	} else {
		var dbUtils = require('dbUtils');
		dbUtils.getPhotos(req.session.user, function(photos) {
			res.render('gallery', {'user': req.session.user, 'photos': photos});
		})
		
	}
};