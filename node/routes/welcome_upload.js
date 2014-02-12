exports.view = function(req, res){
	if(!req.session.user) {
		res.redirect('landing');
	} else {

		if (req.query.goal) {
			var dbUtils = require('dbUtils');
			dbUtils.setGoal(req.session.user, req.query.goal);
		}
		res.render('upload_photos', {'user': req.session.user, 'welcome': true});
	}
};