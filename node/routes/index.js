exports.view = function(req, res){

	if(!req.session.user) {
		if(!req.query.username || !req.query.password) {
			res.redirect('landing');
		} else {
			var dbUtils = require('dbUtils');
			var userExists = dbUtils.checkUser(req.query.username, req.query.password, 
					success = function() { 
						req.session.user = req.query.username;
							var dbUtils = require('dbUtils');
							dbUtils.getPhotos(req.session.user, function(photos) {
								res.render('index', {'user': req.session.user, 'photos': photos});
							});
					},
					failure = function() {
						res.redirect('landing');
					}
				);
		}
	} else {
		var dbUtils = require('dbUtils');
		dbUtils.getPhotos(req.session.user, function(photos) {
			res.render('index', {'user': req.session.user, 'photos': photos});
		});
	}
}