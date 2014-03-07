exports.view = function(req, res){
	if(!req.session.user) {
		res.render('terms', {'loggedin': false});
	} else {
		var dbUtils = require('dbUtils');
		dbUtils.getGoal(req.session.user, function(goal) {
			res.render('terms', {'loggedin': true, 'user': req.session.user, 'goal': goal, 'numNew': (req.session.numNew? req.session.numNew: 0)});
		});
	}
};
