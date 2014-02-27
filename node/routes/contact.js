exports.view = function(req, res){
	if(!req.session.user) {
		res.render('contact', {'loggedin': false});
	} else {
		var dbUtils = require('dbUtils');
		dbUtils.getGoal(req.session.user, function(goal) {
			res.render('contact', {'loggedin': true, 'user': req.session.user, 'goal': goal, 'numNew': req.session.numNew});
		});
	}
};