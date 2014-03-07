exports.view = function(req, res){
	if(!req.session.user) {
		res.redirect('landing');
	} else {
		var dbUtils = require('dbUtils');
		dbUtils.getGoal(req.session.user, function(goal) {
			dbUtils.getPhotos(req.session.user, function(photos) {
				res.render('gallery', {'user': req.session.user, 'goal': goal, 'photos': photos, 'numNew': (req.session.numNew? req.session.numNew: 0)});
				req.session.numNew = 0;
			});
		});

		
	}
};