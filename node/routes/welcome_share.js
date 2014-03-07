exports.view = function(req, res){

	if(!req.session.user) {
		res.redirect('landing');
	} else {
		var dbUtils = require('dbUtils');
		dbUtils.getGoal(req.session.user, function(goal) {
			res.render('share', {'user': req.session.user, 'goal': goal, 'welcome': true, 'numNew': (req.session.numNew? req.session.numNew: 0)});
		});
	}
};