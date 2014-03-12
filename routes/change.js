exports.view = function(req, res){
	if(!req.session.user) {
		res.redirect('landing');
	} else {
		var dbUtils = require('dbUtils');
		dbUtils.getGoal(req.session.user, function(goal) {
			res.render('change', {'user': req.session.user, 'goal': goal, 'numNew': (req.session.numNew? req.session.numNew: 0)});
		});
	}
};