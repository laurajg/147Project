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
							dbUtils.getGoal(req.session.user, function(goal) {
								dbUtils.getPhotos(req.session.user, function(photos) {


									var numNew = 0;
									for(var i=0; i<photos.length; i++) {
										if (photos[i].new) {
											numNew++;
										}
									}

									req.session.numNew = numNew;
									res.render('index', {'user': req.session.user, 'goal': goal, 'photos': photos, 'numNew': req.session.numNew});
								});
							});
					},
					failure = function() {
						res.redirect('landing');
					}
				);
		}
	} else {
		var dbUtils = require('dbUtils');
		dbUtils.getGoal(req.session.user, function(goal) {
			dbUtils.getPhotos(req.session.user, function(photos) {
				res.render('index', {'user': req.session.user, 'goal': goal, 'photos': photos, 'numNew': req.session.numNew});
			});
		});
	}
}